const express = require('express');
const router = express.Router();
const dbc = require('./../db');
const config = require('./../config');
const bcrypt = require('bcrypt');
const tokens = require('./../auth/tokens');
const auth = require('../auth/auth');
const checkErrors = require('./../misc/responses');
const { body, query, param } = require('express-validator');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

var seq = null;
var models = null;

async function getDB() {
    seq = await dbc.GetSequelizer();
    models = await require('./../models/associate')(seq);
}

/** SEQUELIZED
 * POST /register
 * 
 * This route is used to register a new user.
 * It requires a username, password, email, first name and last name.
*/
router.post('/register',
    [
        body('username').isString().isLength({ min: 1, max: 20 }),
        body('passhash').isString().isLength({ min: 8, max: 26 }),
        body('email').isEmail().isLength({ min: 1, max: 255 }),
        body('firstname').isString().isLength({ min: 1, max: 255 }),
        body('lastname').isString().isLength({ min: 1, max: 255 })
    ],
    checkErrors,
    async function (req, res) {
        var hash;
        try {
            hash = await bcrypt.hash(req.body.passhash, config.security.saltRounds); //hashed
        }
        catch (error) {
            return res.status(500).json({ msg: "Hashing error" });
        }

        // add the user to the database
        var newUser;
        try {
            newUser = await models.User.create({
                username: req.body.username,
                passhash: hash,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            });
        }
        catch (error) {
            return res.status(409).json({ msg: "User already exists" });
        }

        // If the user was added successfully, send a success message and log them in
        const token = tokens.generateJWT(newUser.role_id, newUser.username, newUser.user_id);
        res.cookie('x-access-token', token, config.token_options); // 4 hours

        return res.status(200).json({ msg: "User added", user_id: newUser.user_id, role_id: newUser.role_id, username: newUser.username });
    });

/** SEQUELIZED
 * DELETE /delete/:user_id
 * 
 * This route is used to delete a user - either by themselves or by an admin.
 * It requires a user_id in the URL
 */
router.delete('/delete/:user_id',
    auth,
    [
        param('user_id').isInt()
    ],
    checkErrors,
    async function (req, res) {
        const myself = req.auth.user_id == req.params.user_id;
        const admin = req.auth.role_id == 3;

        // if the user is not an admin, they can only delete themselves
        if (!myself && !admin) {
            return res.status(403).json({ msg: "You don't have the priveleges to do this." });
        }

        // if the user is an admin, they cannot delete themselves
        if (myself && admin) {
            return res.status(403).json({ msg: "You cannot delete yourself, you're an admin!" });
        }

        // Delete the user from the database
        var deletedUser;
        try {
            deletedUser = await models.User.findByPk(req.params.user_id);
            if (deletedUser == null) {
                return res.status(404).json({ msg: "User not found" });
            }

            await deletedUser.destroy();
        }
        catch (error) {
            return res.status(500).json({ msg: "Internal error" });
        }

        if (myself) {
            res.clearCookie("x-access-token");
        }
        return res.status(200).json({ msg: "User deleted" });
    }
);

/** SEQUELIZED
 * POST /login
 * 
 * This route is used to log a user in.
 * It requires a username and password.
 */
router.post('/login',
    [
        body('username').isString().isLength({ min: 1, max: 20 }),
        body('passhash').isString().isLength({ min: 8, max: 26 })
    ],
    checkErrors,
    async function (req, res) {
        // get the user from the database
        const loggingUser = await models.User.findOne({ where: { username: req.body.username } });
        if (loggingUser == null) {
            return res.status(404).json({ msg: "User not found" });
        }

        // check the password
        const match = await bcrypt.compare(req.body.passhash, loggingUser.passhash);
        if (!match) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        // if the password is correct, send a success message and log them in
        const token = tokens.generateJWT(loggingUser.role_id, loggingUser.username, loggingUser.user_id);
        res.cookie('x-access-token', token, config.token_options);

        return res.status(200).json({ msg: "Logged in", user_id: loggingUser.user_id, role_id: loggingUser.role_id, username: loggingUser.username });
    }
);

/** SEQUELIZED
 * POST /update
 * 
 * This route is used to update a user's details.
 * note: email does not need to be unique, but it is required upon registration
 */
router.post('/update',
    auth,
    [
        body('email').optional().isEmail().isLength({ min: 1, max: 256 }),
        body('firstname').optional().isString().isLength({ min: 1, max: 256 }),
        body('lastname').optional().isString().isLength({ min: 1, max: 256 }),
        body('brief').optional().trim().isLength({ min: 0, max: 1000 })
    ],
    checkErrors,
    async function (req, res) {
        const chengedUser = await models.User.findByPk(req.auth.user_id);
        if (chengedUser == null) {
            return res.status(404).json({ msg: "User not found" });
        }

        // update the user's details
        chengedUser.email = req.body.email ? req.body.email : chengedUser.email;
        chengedUser.firstname = req.body.firstname ? req.body.firstname : chengedUser.firstname;
        chengedUser.lastname = req.body.lastname ? req.body.lastname : chengedUser.lastname;
        chengedUser.brief = req.body.brief ? req.body.brief : chengedUser.brief;

        // save the changes
        try {
            await chengedUser.save();
        }
        catch (error) {
            return res.status(409).json({ msg: "Email already exists" });
        }

        return res.status(200).json({ msg: "User updated" });
    }
);

/** SEQUELIZED
 * GET /details
 * 
 * This route is used to get all the details of a user.
 */
router.get('/details',
    auth,
    [
        query('user_id').isInt(),
    ],
    checkErrors,
    async function (req, res) {
        // the user can only get their own details, unless they are an admin
        const myself = req.auth.user_id == req.query.user_id;
        const admin = req.auth.role_id == 3;
        if (!myself && !admin) {
            return res.status(403).json({ msg: "You don't have the priveleges to do this." });
        }

        // get the user from the database
        const user = await models.User.findByPk(req.query.user_id, { attributes: { exclude: ['passhash'] } });
        if (user == null) {
            return res.status(404).json({ msg: "User not found" });
        }

        // return the user's details
        return res.status(200).json(user);
    }
);


/** SEQUELIZED
 * GET /view?user_id=123
 * 
 * This route is used to get the public view of a user.
*/
router.get('/view',
    [
        query('user_id').isInt()
    ],
    checkErrors,
    async function (req, res) {
        // get the user from the database
        const user = await models.User.findByPk(req.query.user_id,
            {attributes: {exclude: ['passhash']}},
        );
        if (user == null) {
            return res.status(404).json({ msg: "User not found" });
        }

        // return the user's details
        return res.status(200).json(user);
    }
);

/** SEQUELIZED
 * POST /logout
 * 
 * This route is used to remove the JWT from the user's cookies.
 * TODO: redirect to login page
 */
router.post('/logout', function (req, res) {
    return res
        .clearCookie("x-access-token")
        .status(200)
        .json({ msg: "Successfully logged out" });
});

/** SEQUELIZED
 * POST /change-role
 * 
 * This route is used to change the role of a user.
 */
router.post('/change-role',
    auth,
    [
        body('role_id').isInt({ min: 1, max: 3 }),
        body('user_id').isInt()
    ],
    checkErrors,
    async function (req, res) {
        // only admins can change roles and they can't change their own role
        const admin = req.auth.role_id == 3;
        const myself = req.auth.user_id == req.body.user_id;
        if (!admin || myself) {
            return res.status(403).json({ msg: "You don't have the priveleges to do this." });
        }

        // Update the user in the database
        const user = await models.User.findByPk(req.body.user_id);
        if (user == null) {
            return res.status(404).json({ msg: "User not found" });
        }

        user.role_id = req.body.role_id;
        await user.save();

        return res.status(200).json({ msg: "User updated" });
    }
);

/** SEQUELIZED
 * POST /change-password
 * 
 * This route is used to change the password of a user.
 */

router.post('/change-password',
    auth,
    [
        body('new_password').isString(),
        body('old_password').isString(),
    ],
    checkErrors,
    async function (req, res) {
        // Get the user from the database by user_id
        const changedUser = await models.User.findByPk(req.auth.user_id);

        // Check if the old password is correct
        const validPassword = await bcrypt.compare(req.body.old_password, changedUser.passhash);
        if (!validPassword) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        // Hash the new password
        var newPasshash;
        try {
            newPasshash = await bcrypt.hash(req.body.new_password, config.security.saltRounds);
        }
        catch (err) {
            return res.status(500).json({ msg: "Password hashing error" });
        }

        changedUser.update({ passhash: newPasshash });

        return res.status(200).json({ msg: "Password updated" });
    }
);

/** SEQUELIZED
 * GET /list
 * 
 * This route is used to get a list of users.
 */
router.get('/list',
    auth,
    [
        query('page').isInt({ min: 1 }),
        query('limit').isInt({ min: 1, max: 100 }),
    ],
    checkErrors,
    async function (req, res) {

        // only admins can get a list of users
        const admin = req.auth.role_id == 3;
        if (!admin) {
            return res.status(403).json({ msg: "You don't have the priveleges to do this." });
        }

        // get the users from the database
        const users = await models.User.findAll({
            attributes: {exclude: ['passhash']},
            offset: Number((req.query.page - 1) * req.query.limit),
            limit: Number(req.query.limit),
            order: [
                ['id', 'ASC']
            ]
        });

        // if there are no users, return an empty array
        if (users.length == 0) {
            return res.status(200).json({ msg: "No users found", users: [] });
        }

        return res.status(200).json(users);
    }
);

/** SEQUELIZED
 * GET /count
 * 
 * This route is used to get the number of users.
*/
router.get('/count',
    async function (req, res) {
        const count = await models.User.count();

        return res.status(200).json({count : count});
    }
);

/** SEQUELIZED
 * POST /upload-avatar
 * 
 * This route is used to upload an avatar for a user.
 */
router.post('/upload-avatar',
    auth,
    async function (req, res) {

        // save the file to the disk
        var form = new formidable.IncomingForm({ multiples: true, maxFileSize: config.file_upload.avatar_max_size, uploadDir: path.join(__basedir, config.file_upload.avatar_dir) });
        var filename;

        form.parse(req, async function (err, fields, files) {
            // check if there is an error
            if (err) {
                return res.status(500).json({ msg: "File upload error" });
            }

            // get list of filenames
            var filenames = [];
            for (var key in files) {
                // if it is array, get all the files
                if (Array.isArray(files[key])) {
                    for (var i = 0; i < files[key].length; i++) {
                        filenames.push(files[key][i].newFilename);
                    }
                }
                // if it is not array, get the file
                else {
                    filenames.push(files[key].newFilename);
                }
            }

            // test if there is a avatar file
            if (!files.avatar) {
                // unlink all the files
                for (var i = 0; i < filenames.length; i++) {
                    fs.unlink(path.join(__basedir, config.file_upload.avatar_dir, filenames[i]), function () { });
                }
                return res.status(400).json({ msg: "No avatar file" });
            }

            // test if the file is an image
            if (!files.avatar.mimetype.startsWith('image/')) {
                // unlink all the files
                for (var i = 0; i < filenames.length; i++) {
                    fs.unlink(path.join(__basedir, config.file_upload.avatar_dir, filenames[i]), function () { });
                }
                return res.status(400).json({ msg: "File is not an image" });
            }

            // remove avatar file from the list
            filenames.splice(filenames.indexOf(files.avatar.newFilename), 1);

            // unlink all the files that are not avatar
            for (var i = 0; i < filenames.length; i++) {
                fs.unlink(path.join(__basedir, config.file_upload.avatar_dir, filenames[i]), function () { });
            }

            // append extension
            filename = files.avatar.newFilename + path.extname(files.avatar.originalFilename);

            // rename the file
            fs.rename(path.join(__basedir, config.file_upload.avatar_dir, files.avatar.newFilename), path.join(__basedir, config.file_upload.avatar_dir, filename), function (err) {
                if (err) {
                    return res.status(500).json({ msg: "File upload error" });
                }
            });

            // update the user in the database
            const user = await models.User.findByPk(req.auth.user_id);

            // if the user doesn't exist, return an error
            if (!user) {
                fs.unlink(path.join(__basedir, config.file_upload.avatar_dir, old_img), function () { });
                return res.status(404).json({ msg: "User not found" });
            }

            // if the user has an avatar, delete it
            const old_img = user.img_path;
            if (old_img) {
                fs.unlink(path.join(__basedir, config.file_upload.avatar_dir, old_img), function () { });
            }

            user.update({ img_path: filename });

            return res.status(200).json({ msg: "Avatar updated", filename: filename });
        });
    }
);

getDB();
module.exports = router;