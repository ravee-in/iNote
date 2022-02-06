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


module.exports = router;