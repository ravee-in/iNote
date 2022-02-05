const jwt = require('jsonwebtoken');
const JWT_SECRET = "iNoteSAFEkey009";

const fetchUser = (req, res, next)=>{
    // Get user from the JWT Token and add its ID to req Object

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Invalid token request."})
    }

    try {
        
    const data = jwt.verify(token, JWT_SECRET);
    req.user =  data.user;

    next();
        
    } catch (error) {
        res.status(401).send({error: "Invalid token request."})
    }

}

module.exports = fetchUser;