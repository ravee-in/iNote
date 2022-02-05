const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/createuser". No Login required
router.post('/createuser', [

    // adding validations with custom msg
    body('email', 'Enter a valid EMail').isEmail(),
    body('password', 'Try some other').isLength({ min: 5 }),
    body('name', 'Enter valid Name').isLength({ min: 3 }),
], async (req, res) => {

    // Return Bad Request for errors and error msg

    const errors = validationResult(req);

    // Checking Validation
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    // Creating User in the DB || Check wether user exist with same email
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry! This email is already used." })
        }

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
    //   .then(user => res.json(user))  
    //   .catch(error => {console.log(error) // shows error in Console for Unique field
    //   res.json({error: "Please enter a unique Email", message: error.message})});  //show error message

    // res.send(req.body);
})



module.exports = router;