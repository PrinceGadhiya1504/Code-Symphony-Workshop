const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get token from cookie
    const { token } = req.cookies;

    if (!token) {
        return res.status(403).send("Please login first!");
    }

    // Decode the token and get user data
    try {
        const decoded = jwt.verify(token, "loginsecret");
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
};

module.exports = auth;
