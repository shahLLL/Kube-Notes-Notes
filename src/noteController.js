const Note = require('./noteModel');
const { redisClient } = require('./redisConfig');

exports.getNotes = async (req, res) => {
    // Cache key for the USER'S list
    const listCacheKey = `notes_summary:${req.user.id}`;

    try {
        const cachedList = await redisClient.get(listCacheKey);
        if (cachedList) return res.json(JSON.parse(cachedList));

        // Fetch from DB, exclude 'content', sort by newest
        const notes = await Note.find({ userId: req.user.id })
                                .select('-content')
                                .sort({ createdAt: -1 });

        await redisClient.setEx(listCacheKey, 3600, JSON.stringify(notes));
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: "Fetch list failed" });
    }
};

exports.getNoteById = async (req, res) => {
    const { id } = req.params;
    const noteCacheKey = `note:${id}`; // Granular cache key

    try {
        const cachedNote = await redisClient.get(noteCacheKey);
        if (cachedNote) return res.json(JSON.parse(cachedNote));

        const note = await Note.findOne({ _id: id, userId: req.user.id });
        if (!note) return res.status(404).json({ error: "Note not found" });

        await redisClient.setEx(noteCacheKey, 3600, JSON.stringify(note));
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: "Fetch note failed" });
    }
};

exports.createNote = async (req, res) => {
    try {
        const newNote = new Note({ ...req.body, userId: req.user.id });
        await newNote.save();

        // Delete the list cache so the new note shows up in the list
        await redisClient.del(`notes_summary:${req.user.id}`);

        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ error: "Creation failed" });
    }
};

exports.updateNote = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedNote) return res.status(404).json({ error: "Note not found" });

        // Kill both caches
        await Promise.all([
            redisClient.del(`notes_summary:${req.user.id}`),
            redisClient.del(`note:${id}`)
        ]);

        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
};

exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!deletedNote) return res.status(404).json({ error: "Note not found" });

        // Kill both caches
        await Promise.all([
            redisClient.del(`notes_summary:${req.user.id}`),
            redisClient.del(`note:${id}`)
        ]);

        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
};