import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const host = '0.0.0.0';
const distPath = path.join(__dirname, 'dist');

// Middleware
app.use(express.json());

// Health check endpoint for Cloud Run and container liveness probes
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString(), app: 'Conecta' });
});

// Serve static assets from dist
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true,
  }));
}

// Single-page application fallback: send index.html for all other routes
app.get('*', (_req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('<html><body><h1>Conecta</h1><p>Construindo a aplicação...</p></body></html>');
  }
});

const server = app.listen(port, host, () => {
  console.log(`[Conecta] Servidor em produção rodando em http://${host}:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Conecta] Sinal SIGTERM recebido, encerrando servidor...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[Conecta] Sinal SIGINT recebido, encerrando servidor...');
  server.close(() => {
    process.exit(0);
  });
});
