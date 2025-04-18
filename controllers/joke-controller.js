/**
 * Name: jahsiyah varona
 * Date: 04.18.2025
 * CSC 372-01
 *
 * Controller functions for Jokebook API.
 */

const db = require('../models/db');

// GET /jokebook/categories
exports.getCategories = (req, res) => {
  db.all('SELECT name FROM categories', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    const categories = rows.map(r => r.name);
    res.json({ categories });
  });
};

// GET /jokebook/joke/:category?limit=N
exports.getJokesByCategory = (req, res) => {
  const { category } = req.params;
  db.get('SELECT id FROM categories WHERE name = ?', [category], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'Invalid category' });

    let sql = 'SELECT setup, delivery FROM jokes WHERE category_id = ?';
    const params = [row.id];
    if (req.query.limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(req.query.limit));
    }

    db.all(sql, params, (err2, rows2) => {
      if (err2) return res.status(500).json({ error: 'Database error' });
      res.json({ jokes: rows2 });
    });
  });
};

// GET /jokebook/random
exports.getRandomJoke = (req, res) => {
  db.all('SELECT setup, delivery FROM jokes ORDER BY RANDOM() LIMIT 1', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows[0]);
  });
};

// POST /jokebook/joke/add
// Body: { category, setup, delivery }
exports.addJoke = (req, res) => {
  const { category, setup, delivery } = req.body;
  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: 'Missing category, setup, or delivery' });
  }
  db.get('SELECT id FROM categories WHERE name = ?', [category], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'Invalid category' });

    db.run(
      'INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)',
      [row.id, setup, delivery],
      function (err2) {
        if (err2) return res.status(500).json({ error: 'Database error' });
        // Return updated list
        db.all(
          'SELECT setup, delivery FROM jokes WHERE category_id = ?',
          [row.id],
          (err3, rows3) => {
            if (err3) return res.status(500).json({ error: 'Database error' });
            res.json({ jokes: rows3 });
          }
        );
      }
    );
  });
};
