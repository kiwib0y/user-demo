// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL configuration
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
    <h1>
      Hello World!
    </h1>
    <form action="/emails" method="post">
      <label for="email">Email:</label><br>
      <input type="text" id="email" name="email" value=""><br>
      <input type="submit" value="Submit">
    </form>
  `)
});

// Route to accept emails
app.post('/emails', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Insert email into the database
    await pool.query('INSERT INTO emails (email) VALUES ($1) RETURNING *', [email]);
    res.redirect('/');
  } catch (error) {
    console.error('Error inserting email:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.delete('/emails/:id', (req, res) => {
  res.send('Deleted {id}');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
