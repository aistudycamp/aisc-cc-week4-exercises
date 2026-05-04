import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import 'dotenv/config';
import { ask } from './stage-1/chat.js';
import { runWorkflow } from './stage-2/workflow.js';
import { analyst, extractor, synthesizer, reflect } from './stage-3/orchestrator.js';

const app = express();
app.use(express.json({ limit: '2mb' }));

const ROOT = path.join(import.meta.dirname, '..');
const PROMPTS_DIR = path.join(import.meta.dirname, 'prompts');

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Serve static frontend assets
app.use(express.static(path.join(ROOT, 'frontend')));

// Serve the frontend
app.get('/', (req, res) => res.sendFile(path.join(ROOT, 'frontend', 'index.html')));

// Sample transcripts
app.get('/api/sample-transcript', (req, res) => {
  const p = path.join(import.meta.dirname, 'transcripts', 'sample-transcript.txt');
  res.type('text').send(fs.readFileSync(p, 'utf-8'));
});

app.get('/api/sample-transcript/:name', (req, res) => {
  const p = path.join(import.meta.dirname, 'transcripts', req.params.name);
  if (!fs.existsSync(p)) return res.status(404).json({ error: 'Not found' });
  res.type('text').send(fs.readFileSync(p, 'utf-8'));
});

// Serve prompt files (for browser inspect in Module 5/6)
app.get('/api/prompts/:name', (req, res) => {
  const p = path.join(PROMPTS_DIR, req.params.name);
  if (!fs.existsSync(p)) return res.status(404).json({ error: 'Not found' });
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
// Returns step-by-step log for frontend visualization
app.post('/api/workflow', async (req, res) => {
  try {
    const { transcript, filename = 'transcript.txt' } = req.body;
    const steps = [];

    steps.push({ step: 'Classifying...', status: 'running' });
    const result = await runWorkflow(transcript, filename);
    steps[0].status = 'done';
    steps[0].step = `Classified as: ${result.classification}`;

    steps.push({ step: `Routed → transcripts/${result.classification}/`, status: 'done' });
    steps.push({ step: 'Notified', status: 'done' });

    res.json({ steps, classification: result.classification, outputPath: result.outputPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 3 — Orchestrator step 1: Analyst + Extractor in parallel
app.post('/api/orchestrate/step1', async (req, res) => {
  try {
    const { transcript } = req.body;
    const [themes, actions] = await Promise.all([
      analyst(transcript),
      extractor(transcript),
    ]);
    res.json({ themes, actions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 3 — Orchestrator step 2: Synthesizer
app.post('/api/orchestrate/step2', async (req, res) => {
  try {
    const { themes, actions } = req.body;
    const report = await synthesizer(themes, actions);
    res.json({ report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 3 — Orchestrator step 3: Router (classify, save transcript + report, notify)
app.post('/api/orchestrate/step3', async (req, res) => {
  try {
    const { transcript, report, filename = 'transcript.txt' } = req.body;
    const { classification, outputPath } = await runWorkflow(transcript, filename, report);
    res.json({ classification, outputPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stage 3 — Orchestrator step 4: Reflect (run report + build-your-own template)
app.post('/api/orchestrate/step4', async (req, res) => {
  try {
    const { transcript, themes, actions, report, classification } = req.body;
    const runReport = await reflect(transcript, themes, actions, report, classification);
    res.json({ runReport });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
