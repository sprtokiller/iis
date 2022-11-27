const { validationResult } = require('express-validator');

const checkErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Invalid input", errors: errors.array() });
    }
    return next();
}

module.exports = checkErrors;