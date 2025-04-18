/**
 * Name: jahsiyah varona
 * Date: 04.18.2025
 * CSC 372-01
 *
 * Routes for Jokebook API.
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/joke-controller');

router.get('/categories', controller.getCategories);
router.get('/joke/:category', controller.getJokesByCategory);
router.get('/random', controller.getRandomJoke);
router.post('/joke/add', controller.addJoke);

module.exports = router;
