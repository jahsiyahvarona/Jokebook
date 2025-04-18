/**
 * Name: Jahsiyah Varona
 * Date: 04.18.2025
 * CSC 372-01
 *
 * Jokebook client‑side JS with:
 * - random joke
 * - category buttons & exact search
 * - spinner overlay
 * - dark‑mode toggle
 * - back‑to‑top button
 * - add‑joke dropdown
 */
document.addEventListener('DOMContentLoaded', () => {
    const randomBody = document.querySelector('#random-joke .card-body');
    const newBtn = document.getElementById('new-random-button');
    const loadCatsBtn = document.getElementById('load-categories');
    const catList = document.getElementById('categories-list');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const currentCat = document.getElementById('current-category');
    const jokesList = document.getElementById('jokes-list');
    const addForm = document.getElementById('add-joke-form');
    const addCategorySelect = document.getElementById('add-category');
    const spinner = document.getElementById('loading-spinner');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');
  
    // Utility: show/hide spinner
    const showSpinner = () => (spinner.style.display = 'block');
    const hideSpinner = () => (spinner.style.display = 'none');
  
    // 1) Populate category dropdown
    function populateCategoryDropdown() {
      showSpinner();
      fetch('/jokebook/categories')
        .then(r => r.json())
        .then(data => {
          data.categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            addCategorySelect.append(opt);
          });
        })
        .finally(hideSpinner);
    }
    populateCategoryDropdown();
  
    // 2) Load random joke
    function loadRandom() {
      showSpinner();
      fetch('/jokebook/random')
        .then(r => r.json())
        .then(joke => {
          randomBody.innerHTML = '';
          const s = document.createElement('p');
          s.textContent = joke.setup;
          const d = document.createElement('p');
          d.className = 'fst-italic text-muted';
          d.textContent = joke.delivery;
          randomBody.append(s, d);
        })
        .finally(hideSpinner);
    }
    newBtn.addEventListener('click', loadRandom);
    loadRandom();
  
    // 3) Load category buttons
    loadCatsBtn.addEventListener('click', () => {
      showSpinner();
      fetch('/jokebook/categories')
        .then(r => r.json())
        .then(data => {
          catList.innerHTML = '';
          data.categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-primary me-2 mb-2';
            btn.textContent = cat;
            btn.onclick = () => {
              currentCat.textContent = cat;
              loadJokes(cat);
            };
            catList.append(btn);
          });
        })
        .catch(() =>
          (jokesList.innerHTML = `<div class="alert alert-danger">Error loading categories</div>`)
        )
        .finally(hideSpinner);
    });
  
    // 4) Exact‑match search
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const cat = searchInput.value.trim();
      if (!cat) return;
      currentCat.textContent = cat;
      loadJokes(cat);
    });
  
    // 5) Load jokes for a category
    function loadJokes(cat) {
      showSpinner();
      fetch(`/jokebook/joke/${cat}`)
        .then(r => {
          if (!r.ok) throw new Error('Category not found');
          return r.json();
        })
        .then(data => {
          jokesList.innerHTML = '';
          data.jokes.forEach(j => {
            const col = document.createElement('div');
            col.className = 'col';
            const card = document.createElement('div');
            card.className = 'card joke-card shadow-sm';
            const body = document.createElement('div');
            body.className = 'card-body';
            const s = document.createElement('p');
            s.className = 'card-text';
            s.textContent = j.setup;
            const d = document.createElement('p');
            d.className = 'card-text fst-italic text-muted';
            d.textContent = j.delivery;
            body.append(s, d);
            card.append(body);
            col.append(card);
            jokesList.append(col);
          });
        })
        .catch(err => {
          jokesList.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        })
        .finally(hideSpinner);
    }
  
    // 6) Add a new joke
    addForm.addEventListener('submit', e => {
      e.preventDefault();
      const payload = {
        category: addCategorySelect.value,
        setup: addForm.setup.value.trim(),
        delivery: addForm.delivery.value.trim()
      };
      showSpinner();
      fetch('/jokebook/joke/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(r => {
          if (!r.ok) throw new Error('Failed to add joke');
          return r.json();
        })
        .then(() => {
          currentCat.textContent = payload.category;
          loadJokes(payload.category);
          addForm.reset();
        })
        .catch(err => {
          jokesList.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        })
        .finally(hideSpinner);
    });
  
    // 7) Dark‑mode toggle
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = themeToggle.querySelector('i');
      icon.classList.toggle('bi-moon-fill');
      icon.classList.toggle('bi-sun-fill');
    });
  
    // 8) Back‑to‑top button
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  