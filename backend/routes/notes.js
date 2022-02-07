const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser.js');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');


//Route 1 :: Get all the notes : GET "/api/auth/getuser". Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
        // res.json([]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server 500 error");
    }


})



//Route 2 :: Add a new Note : POST "/api/auth/addnote". Login required

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be of 5 characters minimum').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);

        // Checking Validation
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id,
        })


        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server 500 error");
    }

})


//Route 3 :: Update Note : PUT "/api/auth/updatenote". Login required

router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // create new Note
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Find Note to be updated

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server 500 error");
    }

})



//Route 4 :: Delete an existing Note : DELETE "/api/auth/deletenote". Login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;


        // Find Note to be deleted

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // All delete only if user owns the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server 500 error");
    }

})

module.exports = router;