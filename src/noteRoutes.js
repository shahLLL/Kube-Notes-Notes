const express = require('express');
const router = express.Router();
const { getNotes, getNoteById, createNote, updateNote, deleteNote } = require('./noteController');
const auth = require('./authMiddleware');

router.get('/all', auth, getNotes);
router.get('/:id', auth, getNoteById)
router.post('/', auth, createNote);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote)

module.exports = router;