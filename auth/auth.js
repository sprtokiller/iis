var tokens = require('./tokens');

/**
 * Check if user is logged in
 */
const verifyToken = (req, res, next) => {
    // get the JWT token from the head
    const token = req.cookies["x-access-token"];
    if (!token) {
        res.header()
        return res.status(403).json({ msg: "A token is required for authentication"});
    }

    var data;
    // verify the token
    try {
        if (!tokens.verifyJWT(token)) {
            return res.status(401).json({ msg: "Invalid token"});
        }

        data = tokens.decodeJWT(token);
    } catch (error) {
        return res.status(500).json({ msg: "Internal error in token verification" });
    }

    req.auth = {
        user_id: data.payload.user_id,
        role_id: data.payload.role_id,
        username: data.payload.username,
    };

    return next();
};

module.exports = verifyToken;