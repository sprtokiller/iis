const express = require('express');
const router = express.Router();
const dbc = require('../db');
const config = require('../config');
const auth = require('../auth/auth');
const authOptional = require('../auth/authOptional');
const { body, query, validationResult } = require('express-validator');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

router.post('/add', [
    auth,
    body('event_id').isInt(),
    body('text').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const db = await dbc.GetDatabase();
    
    const sql = `INSERT INTO event_reviews (fk_event_id, user_id, review_text) VALUES (?, ?, ?)`;
    const values = [req.body.event_id, req.auth.user_id, req.body.text];
    const [result, fields] = await db.execute(sql, values);

    if (result.affectedRows === 1) {
        return res.status(200).json({ msg: "Comment added" });
    } else {
        return res.status(500).json({ msg: "Internal error" });
    }
});

router.post('/delete', [
    auth,
    body('review_id').isInt()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const db = await dbc.GetDatabase();
    // if the user is admin, he can delete any comment
    var sql;
    var values;
    if (req.auth.role_id == 3) {
        sql = `DELETE FROM event_reviews WHERE review_id = ?`;
        values = [req.body.review_id];
    }
    else
    {
        sql = `DELETE FROM event_reviews WHERE review_id = ? AND user_id = ?`;
        values = [req.body.review_id, req.auth.user_id];
    }

    const [result, fields] = await db.execute(sql, values);

    if (result.affectedRows === 1) {
        return res.status(200).json({ msg: "Comment deleted" });
    } else {
        return res.status(500).json({ msg: "Internal error" });
    }
});


module.exports = router;