/**
 * Name: jahsiyah varona
 * Date: 04.18.2025
 * CSC 372-01
 *
 * Entry point for the Jokebook Express server. Sets up middleware,
 * static file serving, and API routes.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize database (creates file, tables, and seed data)
require('./models/db');

const jokeRoutes = require('./routes/joke‑routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes at /jokebook
app.use('/jokebook', jokeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
