var fs = require('fs');
var jwt = require('jsonwebtoken');
var config = require('./../config');

// PRIVATE and PUBLIC key

var privateKEY = fs.readFileSync('./auth/private.key', 'utf8');

module.exports = {
    generateJWT: function (role_id, username, user_id) {
        // PAYLOAD
        var payload = {
            theTruth: "Pomerance>Mandarinky",
            role_id: role_id,
            username: username,
            user_id: user_id
        };

        return jwt.sign(payload, privateKEY, config.security.jwtoptions);
    },
    verifyJWT: function (token) {
        try {
            return jwt.verify(token, privateKEY, config.security.jwtoptions);
        } catch (err) {
            return false;
        }
    },
    decodeJWT: function (token) {
        return jwt.decode(token, { complete: true });
    }
};