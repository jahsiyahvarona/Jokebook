# Jokebook

**Author:** Jahsiyah Varona  
**Date:** 04.18.2025  
**Course:** CSC 372-01

---

## Overview

Jokebook is a full‑stack application built with Node.js, Express, and SQLite on the backend, and vanilla JavaScript with Bootstrap on the frontend. It allows users to:

- View a random joke on the landing page
- List all available joke categories
- Display jokes in a selected category (with optional limit)
- Add new jokes to existing categories
- Toggle between light and dark mode
- Enjoy modern UI enhancements (animated gradient header, loading spinner, back‑to‑top button, icons)

All data is stored in an SQLite database (`jokebook.db`), which is auto‑generated when the server runs.

## Features

1. **MVC Architecture**  
   - **Model:** `models/db.js` sets up SQLite schema and seed data  
   - **Controller:** `controllers/joke-controller.js` handles API logic  
   - **Routes:** `routes/joke-routes.js` defines RESTful endpoints

2. **SQLite Storage**  
   - Tables: `categories(id, name)`, `jokes(id, category_id, setup, delivery)`  
   - Seeded with two categories (`funnyjoke`, `lamejoke`) and sample jokes

3. **Express API**  
   - `GET /jokebook/categories` – list all categories  
   - `GET /jokebook/joke/:category` – jokes in a category (optional `?limit=`)  
   - `GET /jokebook/random` – one random joke  
   - `POST /jokebook/joke/add` – add a new joke (JSON body with `category`, `setup`, `delivery`)

4. **Client‑Side Rendering**  
   - Vanilla JavaScript (`public/js/main.js`) fetches JSON and updates the DOM
   - Bootstrap for responsive layout and styling
   - Modern UX touches: dark mode, gradient animation, icons, spinner, back‑to‑top button

## Tech Stack

- **Backend:** Node.js, Express, SQLite3
- **Frontend:** HTML, CSS (Bootstrap + custom), JavaScript (ES6+)
- **Tools:** Nodemon (dev), ThunderClient or Postman for API testing

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/<username>/jokebook.git
   cd jokebook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the server**
   ```bash
   npm start
   ```
   This will:
   - Create `jokebook.db` if it doesn’t exist
   - Create tables and seed initial data
   - Serve static files from `public/`

4. **Open your browser** at <http://localhost:3000>

## API Endpoints

Test these with ThunderClient, Postman, or your browser:

| Method | Endpoint                       | Description                                     |
| ------ | ------------------------------ | ----------------------------------------------- |
| GET    | `/jokebook/categories`         | List all categories                             |
| GET    | `/jokebook/joke/:category`     | Get jokes in `:category` (optional `?limit=N`)  |
| GET    | `/jokebook/random`             | Get one random joke                             |
| POST   | `/jokebook/joke/add`           | Add a new joke (JSON body with `category`, `setup`, `delivery`) |

Example `POST` body:
```json
{
  "category": "funnyjoke",
  "setup": "Why…",
  "delivery": "Because…"
}
```

## Frontend Usage

- **Random Joke:** Click “Surprise Me” or load the page
- **Categories:** Click “Load Categories” then click any category button
- **Search:** Enter exact category name and hit search
- **Add Joke:** Select category from dropdown, fill setup & delivery, and submit
- **Dark Mode:** Toggle the moon/sun icon in the navbar
- **Back to Top:** Click the floating arrow when scrolling down

## Code Quality

- File header comments in each `.js` and `.css` file
- Lowercase filenames with dashes
- Fully separated HTML, CSS, and JS
- No inline styles or `innerHTML` for markup
- JSDoc comments for JS functions

## Contributing

1. Create a new branch: `git checkout -b feature/YourFeature`
2. Commit your changes: `git commit -m "Add your feature"
3. Push to the branch: `git push origin feature/YourFeature`
4. Open a Pull Request


