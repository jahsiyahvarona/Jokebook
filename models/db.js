/**
 * Name: jahsiyah varona
 * Date: 04.18.2025
 * CSC 372-01
 *
 * Sets up the SQLite database and initializes tables and seed data for Jokebook.
 */

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('jokebook.db');

db.serialize(() => {
  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS jokes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    setup TEXT NOT NULL,
    delivery TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );`);

  // Seed data if empty
  db.get('SELECT COUNT(*) AS count FROM categories', (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row.count === 0) {
      const insertCategory = db.prepare('INSERT INTO categories (name) VALUES (?)');
      const categories = ['funnyjoke', 'lamejoke'];
      categories.forEach(cat => insertCategory.run(cat));
      insertCategory.finalize();

      // Insert jokes per category
      db.each('SELECT id, name FROM categories', (err2, cat) => {
        if (err2) {
          console.error(err2);
          return;
        }
        const jokes =
          cat.name === 'funnyjoke'
            ? [
                {
                  setup: 'Why did the student eat his homework?',
                  delivery: 'Because the teacher told him it was a piece of cake!'
                },
                { setup: 'What kind of tree fits in your hand?', delivery: 'A palm tree' },
                { setup: 'What is worse than raining cats and dogs?', delivery: 'Hailing taxis' }
              ]
            : [
                { setup: 'Which bear is the most condescending?', delivery: 'Pan-DUH' },
                {
                  setup: 'What would the Terminator be called in his retirement?',
                  delivery: 'The Exterminator'
                }
              ];

        const insertJoke = db.prepare(
          'INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)'
        );
        jokes.forEach(j => insertJoke.run(cat.id, j.setup, j.delivery));
        insertJoke.finalize();
      });
    }
  });
});

module.exports = db;