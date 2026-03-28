const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

let pool;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    });
  }
  return pool;
}

app.get('/', async (req, res) => {
  try {
    const db = await getPool();
    const [rows] = await db.query('SELECT NOW() AS now_time');

    res.status(200).send(`
      <html>
        <head><title>Chapter 8 App</title></head>
        <body>
          <h1>Hooray!! Your Node App is Running</h1>
          <p>Connected to RDS successfully. Kachow!</p>
          <p>Database time: ${rows[0].now_time}</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send(`
      <html>
        <head><title>Chapter 8 App</title></head>
        <body>
          <h1>Node App is Running</h1>
          <p>But...Database connection failed. Womp Womp</p>
          <pre>${error.message}</pre>
        </body>
      </html>
    `);
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
