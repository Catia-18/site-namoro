// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
var host = "0.0.0.0";
var distPath = path.join(__dirname, "dist");
app.use(express.json());
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString(), app: "Conecta" });
});
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: "1d",
    etag: true
  }));
}
app.get("*", (_req, res) => {
  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send("<html><body><h1>Conecta</h1><p>Construindo a aplica\xE7\xE3o...</p></body></html>");
  }
});
var server = app.listen(port, host, () => {
  console.log(`[Conecta] Servidor em produ\xE7\xE3o rodando em http://${host}:${port}`);
});
process.on("SIGTERM", () => {
  console.log("[Conecta] Sinal SIGTERM recebido, encerrando servidor...");
  server.close(() => {
    process.exit(0);
  });
});
process.on("SIGINT", () => {
  console.log("[Conecta] Sinal SIGINT recebido, encerrando servidor...");
  server.close(() => {
    process.exit(0);
  });
});
