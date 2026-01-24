const Note = require('./noteModel');
const { redisClient } = require('./redisConfig');

exports.getNotes = async (req, res) => {
  const cacheKey = `notes:${req.user.id}`;
  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const notes = await Note.find({ userId: req.user.id });
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(notes));
    res.json(notes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createNote = async (req, res) => {
  try {
    const newNote = new Note({ ...req.body, userId: req.user.id });
    const note = await newNote.save();
    await redisClient.del(`notes:${req.user.id}`);
    res.json(note);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};