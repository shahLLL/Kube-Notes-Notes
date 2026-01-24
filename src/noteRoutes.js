const express = require('express');
const router = express.Router();
const { getNotes, createNote } = require('./noteController');
const auth = require('./authMiddleware');

router.get('/', auth, getNotes);
router.post('/', auth, createNote);

module.exports = router;