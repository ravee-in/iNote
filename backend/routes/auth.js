const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser.js');

const JWT_SECRET = "iNoteSAFEkey009";


//Route 1 :: Create a User using: POST "/api/auth/createuser". No Login required
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

    try {

        // Creating User in the DB || Check wether user exist with same email 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry! This email is already used." })
        }

        // Using bcryptjs to add Hashing Salt to password

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id,
            }
        }

        // adding Authentication Token using JWT

        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);

        res.json({ authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
    //   .then(user => res.json(user))  
    //   .catch(error => {console.log(error) // shows error in Console for Unique field
    //   res.json({error: "Please enter a unique Email", message: error.message})});  //show error message

    // res.send(req.body);
})


//Route 2 :: Authenticate a User using: POST "/api/auth/login". No Login required

router.post('/login', [

    body('email', 'Enter a valid EMail').isEmail(),
    body('password', 'Cannot be left blank').exists(),
], async (req, res) => {

    const errors = validationResult(req);

    // Checking Validation
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Please login with correct credentials." });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ errors: "Please login with correct credentials." });
        }

        const data = {
            user: {
                id: user.id,
            }
        }

        // adding Authentication Token using JWT

        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);

        res.json({ authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server 500 error");
    }

})


//Route 3 :: Get logged In user deatils : POST "/api/auth/getuser". Login required


router.post('/getuser',fetchUser, async (req, res) => {

    const { email, password } = req.body;
    
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server 500 error");
    }

})



module.exports = router;