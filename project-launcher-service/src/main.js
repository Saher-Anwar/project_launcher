const http = require('http');

const PORT = 5001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Temporary message so you can test edits
  res.end('Hello from Docker! Timestamp: ' + new Date().toISOString());
});

server.listen(PORT, () => {
  console.log(`Project Launcher Service running at http://localhost:${PORT}`);
});