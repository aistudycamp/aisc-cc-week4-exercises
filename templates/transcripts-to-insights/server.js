import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';
import { ask } from './stage-1/chat.js';
import { runWorkflow } from './stage-2/workflow.js';

const app = express();
app.use(express.json({ limit: '2mb' }));

const ROOT = path.join(import.meta.dirname, '..');
const PROMPTS_DIR = path.join(import.meta.dirname, 'prompts');
const client = new Anthropic();
const systemPrompt = fs.readFileSync(path.join(PROMPTS_DIR, 'system.md'), 'utf-8');

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Serve static frontend assets
app.use(express.static(path.join(ROOT, 'frontend')));

// Serve the frontend
app.get('/', (req, res) => res.sendFile(path.join(ROOT, 'frontend', 'index.html')));

// Sample transcript
app.get('/api/sample-transcript', (req, res) => {
  const p = path.join(import.meta.dirname, 'transcripts', 'sample-transcript.txt');
  res.type('text').send(fs.readFileSync(p, 'utf-8'));
});

// Stage 1 — Chat assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { question, context } = req.body;
    const response = await ask(question, context);
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 2 — Workflow pipeline
app.post('/api/workflow', async (req, res) => {
  try {
    const { transcript, filename = 'transcript.txt' } = req.body;
    const result = await runWorkflow(transcript, filename);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 3 — Orchestrator step 1: executive summary
app.post('/api/orchestrate/step1', async (req, res) => {
  try {
    const { transcript } = req.body;
    const summary = await ask(
      'Give me a one-paragraph executive summary of this meeting.',
      transcript
    );
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 3 — Orchestrator step 2: action items
app.post('/api/orchestrate/step2', async (req, res) => {
  try {
    const { transcript } = req.body;
    const actions = await ask(
      'List every action item from this meeting. For each one: who owns it, what they need to do, and the deadline if mentioned.',
      transcript
    );
    res.json({ actions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 3 — Orchestrator step 3: classify and route
app.post('/api/orchestrate/step3', async (req, res) => {
  try {
    const { transcript, filename = 'transcript.txt' } = req.body;
    const { classification, outputPath } = await runWorkflow(transcript, filename);
    res.json({ classification, outputPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 3 — Orchestrator step 4: synthesize final report
app.post('/api/orchestrate/step4', async (req, res) => {
  try {
    const { summary, actions, classification } = req.body;
    const userMessage = [
      'Here are the results from each specialist:\n',
      `EXECUTIVE SUMMARY:\n${summary}\n`,
      `ACTION ITEMS:\n${actions}\n`,
      `CLASSIFICATION: ${classification}\n`,
      'Combine these into the final insights report following your system prompt format.',
    ].join('\n');
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });
    res.json({ report: response.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
