import http from 'http';
import app from './app.js';
import db from './services/db.service.js';

const port = process.env.PORT || 8000;

const server = http.createServer(app);

db.on('error', (err) => {
  console.log('something wrong ', err);
});

db.on('open', () => {
  server.listen(port);
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
