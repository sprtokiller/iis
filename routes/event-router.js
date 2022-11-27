const express = require('express');
const router = express.Router();
const dbc = require('../db');
const config = require('../config');
const auth = require('../auth/auth');
const checkErrors = require('./../misc/responses');
const authOptional = require('../auth/authOptional');
const { body, query, param, validationResult } = require('express-validator');
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
 * POST /add
 * 
 * Add new event (only for editors and admins)
 */
router.post('/add',
    auth,
    [
        body('name').isString().isLength({ min: 1, max: 256 }),
        body('description').isString().isLength({ min: 30, max: 4000 }),
        body('type_tag_ba').isInt({ min: 0, max: 2**8 - 1 }),
        body('topic_tag_ba').isInt({ min: 0, max: 2**32 - 1 }),
        body('duration_type').isInt({ min: 0, max: 2**3 - 1 }),
        body('org_name').isString().isLength({ min: 1, max: 256 }),
        body('location').isString().isLength({ min: 1, max: 256 }),
        body('price').isInt({ min: 0 }),
        body('targetg_tag_ba').isInt({ min: 0, max: 2**3 - 1 })
    ],
    checkErrors,
    async function (req, res) {
        // Check if user is editor or admin
        const canEdit = req.auth.role_id >= 2;
        if (!canEdit) {
            return res.status(403).json({ msg: "You are not allowed to add events" });
        }

        // add event
        var event;
        try {
            event = await models.Event.create({
                author_id: req.auth.user_id,
                title: req.body.name,
                description: req.body.description,
                duration_btag: req.body.duration_type,
                type_btag: req.body.type_tag_ba,
                topic_btag: req.body.topic_tag_ba,
                location: req.body.location,
                img_path: null,
                views: 0,
                price: req.body.price,
                state: 'draft',
                org_name: req.body.org_name
            });
        } catch (err) {
            return res.status(500).json({ msg: "Failed to add event" });
        }

        return res.status(200).json({ msg: "Event created" });
    }
);

/** SEQUELIZED
 * POST /edit
 * 
 * Edit event (only for editors and admins)
 */

router.post('/edit',
    auth,
    [
        body('event_id').isInt({ min: 1 }),
        body('name').isString().isLength({ min: 1, max: 256 }),
        body('description').isString().isLength({ min: 30, max: 4000 }),
        body('type_tag_ba').isInt({ min: 0, max: 2**8 - 1 }),
        body('topic_tag_ba').isInt({ min: 0, max: 2**32 - 1 }),
        body('duration_type').isInt({ min: 0, max: 2**3 - 1 }),
        body('org_name').isString().isLength({ min: 1, max: 256 }),
        body('location').isString().isLength({ min: 1, max: 256 }),
        body('price').isInt({ min: 0 }),
        body('targetg_tag_ba').isInt({ min: 0, max: 2**3 - 1 })
    ],
    checkErrors,
    async function (req, res) {
        // Check if user is editor or admin
        const isAdmin = req.auth.role_id >= 3;

        // get event
        var event;
        try {
            event = await models.Event.findByPk(req.body.event_id);
        } catch (err) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // edit event in database if user is admin
        if (isAdmin || event.author_id == req.auth.user_id) {
            try {
                await event.update({
                    title: req.body.name,
                    description: req.body.description,
                    duration_btag: req.body.duration_type,
                    type_btag: req.body.type_tag_ba,
                    topic_btag: req.body.topic_tag_ba,
                    location: req.body.location,
                    price: req.body.price,
                    org_name: req.body.org_name
                });
            } catch (err) {
                return res.status(500).json({ msg: "Failed to edit event" });
            }

            return res.status(200).json({ msg: "Event edited" });
        } else {
            return res.status(403).json({ msg: "You are not allowed to edit this event" });
        }
    }
);

/** SEQUELIZED
 * POST /delete
 * 
 * Delete event (only for editors and admins)
 */
router.delete('/delete/:event_id',
    auth,
    [
        param('event_id').isInt()
    ],
    checkErrors,
    async function (req, res) {
        // Check if user is editor or admin
        const isAdmin = req.auth.role_id >= 3;

        // get event
        var event;
        try {
            event = await models.Event.findByPk(req.params.event_id);
        } catch (err) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // delete event in database if user is admin or author
        if (isAdmin || event.author_id == req.auth.user_id) {
            try {
                await event.destroy();
            } catch (err) {
                return res.status(500).json({ msg: "Failed to delete event" });
            }

            return res.status(200).json({ msg: "Event deleted" });
        } else {
            return res.status(403).json({ msg: "You are not allowed to delete this event" });
        }
    }
);

/** SEQUELIZED
 * GET /list-published
 * 
 * List all events
 */
router.get('/view-published',
    authOptional,
    [
        query('page').isInt({ min: 1 }),
        query('limit').isInt({ min: 1, max: 100 }),
    ],
    checkErrors,
    async function (req, res) {
        // get all events and join them with their images as an array
        var events;
        try {
            events = await models.Event.findAll({
                where: {
                    state: 'published'
                },
                include: [
                    {
                        model: models.EventImage,
                        attributes: ['img_path']
                    }
                ],
                order: [
                    ['views', 'DESC']
                ],
                offset: Number((req.query.page - 1) * req.query.limit),
                limit: Number(req.query.limit)
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Failed to get events" });
        }

        // return events
        return res.status(200).json(events);
    }
);

/** SEQUELIZED
 * POST /upload-photos
 * 
 * Upload photos for event, first photo is main photo
 */
router.post('/upload-photos',
    auth,
    async function (req, res) {
        // Check if user is editor or admin
        const canEdit = req.auth.role_id >= 2;
        if (!canEdit) {
            return res.status(403).json({ msg: "You are not allowed to upload photos" });
        }

        // save the file to the disk
        var form = new formidable.IncomingForm({ multiples: true, maxFileSize: config.file_upload.eventphoto_max_size, uploadDir: path.join(__basedir, config.file_upload.eventphoto_dir) });

        form.parse(req, async function (err, fields, files) {
            // check if there is an error
            if (err) {
                return res.status(500).json({ msg: "File upload error" });
            }

            // check if there is event_id field
            if (!fields.event_id) {
                return res.status(400).json({ msg: "Missing event_id field" });
            }

            // check if event exists and if user is allowed to edit it
            var event;
            try {
                event = await models.Event.findByPk(fields.event_id);
            } catch (err) {
                return res.status(404).json({ msg: "Unknown event." });
            }
    
            // If user is editor, check if user is owner of event
            if (req.auth.role_id == 2 && event.author_id != req.auth.user_id) {
                return res.status(403).json({ msg: "You are not allowed to upload photos for this event" });
            }

            // get list of filenames
            var photos = [];
            var blacklist = [];
            for (var key in files) {
                // if it is array, get all the files
                if (Array.isArray(files[key])) {
                    for (var i = 0; i < files[key].length; i++) {
                        if (key == "photos" && files[key][i].mimetype.startsWith('image/')) {
                            photos.push(files[key][i]);
                        } else {
                            blacklist.push(files[key][i].newFilename);
                        }
                    }
                }
                // if it is not array, get the file
                else {
                    if (key == "photos" && files[key][i].mimetype.startsWith('image/')) {
                        whitelist.push(files[key]);
                    } else {
                        blacklist.push(files[key].newFilename);
                    }
                }
            }

            // delete all the files that are not in whitelist
            for (var i = 0; i < blacklist.length; i++) {
                fs.unlink(path.join(__basedir, config.file_upload.eventphoto_dir, blacklist[i]), function () { });
            }

            // test if there are event photos
            if (!photos) {
                return res.status(400).json({ msg: "No photo files" });
            }

            // rename all the photos
            for (var i = 0; i < photos.length; i++) {
                fs.rename(path.join(__basedir, config.file_upload.eventphoto_dir, photos[i].newFilename), path.join(__basedir, config.file_upload.eventphoto_dir, photos[i].newFilename + path.extname(photos[i].originalFilename)), function (err) {
                    if (err) {
                        return res.status(500).json({ msg: "File upload error" });
                    }
                });
            };

            // update the event in the database if it doesn't have main image
            if (!event.img_path) {
                try {
                    await event.update({
                        img_path: photos[0].newFilename + path.extname(photos[0].originalFilename)
                    });
                } catch (err) {
                    return res.status(500).json({ msg: "Failed to update event" });
                }

                // remove the first photo from the list
                photos.shift();
            }

            // add the rest of the images to event images
            try {
                await models.EventImage.bulkCreate(photos.map(photo => {
                    return {
                        event_id: fields.event_id,
                        img_path: photo.newFilename + path.extname(photo.originalFilename)
                    }
                }));
            } catch (err) {
                return res.status(500).json({ msg: "Failed to add photos to event" });
            }

            return res.status(200).json({ msg: "Photos updated" });
        });
    }
);

/**
 * POST /add-url
 * 
 * Add url to event
 */
router.post('/url',
    auth,
    [
        body('event_id').isInt(),
        body('url').isURL()
    ],
    checkErrors,
    async function (req, res) {
        // Check if user is editor or admin
        const canEdit = req.auth.role_id >= 2;
        if (!canEdit) {
            return res.status(403).json({ msg: "You are not allowed to add url" });
        }

        // check if event exists and if user is allowed to edit it
        var event;
        try {
            event = await models.Event.findByPk(req.body.event_id);
        } catch (err) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // If user is editor, check if user is owner of event
        if (req.auth.role_id == 2 && event.author_id != req.auth.user_id) {
            return res.status(403).json({ msg: "You are not allowed to add url for this event" });
        }

        // add url to event
        try {
            await models.EventUrl.create({
                event_id: req.body.event_id,
                url: req.body.url
            });
        } catch (err) {
            return res.status(500).json({ msg: "Failed to add url to event" });
        }

        return res.status(200).json({ msg: "Url added" });
    }
);

/**
 * POST /delete-url
 * 
 * Delete url from event
 */
router.post('/delete-url',
    auth,
    [
        body('event_id').isInt(),
        body('url_id').isInt(),
    ],
    checkErrors,
    async function (req, res) {
        // Check if user is editor or admin
        const canEdit = req.auth.role_id >= 2;
        if (!canEdit) {
            return res.status(403).json({ msg: "You are not allowed to delete url" });
        }

        // check if event exists and if user is allowed to edit it
        var event;
        try {
            event = await models.Event.findByPk(req.body.event_id);
        }
        catch (err) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // If user is editor, check if user is owner of event
        if (req.auth.role_id == 2 && event.author_id != req.auth.user_id) {
            return res.status(403).json({ msg: "You are not allowed to delete url for this event" });
        }

        // delete url from event
        try {
            await models.EventUrl.destroy({
                where: {
                    url_id: req.body.url_id
                }
            });
        }
        catch (err) {
            return res.status(500).json({ msg: "Failed to delete url from event" });
        }

        return res.status(200).json({ msg: "Url deleted" });
    }
);

/**
 * POST /add-term
 * 
 * Add term to event
 */

router.post('/add-term',
    auth,
    [
        body('event_id').isInt(),
        body('name').isString().isLength({ min: 1, max: 256 }),
        body('start_date').isDate(),
        body('end_date').isDate().optional({ nullable: true })
    ],
    checkErrors,
    async function (req, res) {
        // if the end date is not set, set it to start date
        if (!req.body.end_date) {
            req.body.end_date = req.body.start_date;
        }

        // Check if user is editor or admin
        const canEdit = req.auth.role_id >= 2;
        if (!canEdit) {
            return res.status(403).json({ msg: "You are not allowed to add term" });
        }

        // check if event exists and if user is allowed to edit it
        var event;
        try {
            event = await models.Event.findByPk(req.body.event_id);
        } catch (err) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // If user is editor, check if user is owner of event
        if (req.auth.role_id == 2 && event.author_id != req.auth.user_id) {
            return res.status(403).json({ msg: "You are not allowed to add term for this event" });
        }

        // add term to event
        try {
            await models.EventTerm.create({
                event_id: req.body.event_id,
                name: req.body.name,
                start_date: req.body.start_date,
                end_date: req.body.end_date
            });
        } catch (err) {
            return res.status(500).json({ msg: "Failed to add term to event" });
        }

        return res.status(200).json({ msg: "Term added" });
    }
);

/**
 * POST /delete-term
 * 
 * Delete term from event
 */

router.post('/delete-term',
    auth,
    [
        body('event_id').isInt(),
        body('term_id').isInt(),
    ],
    checkErrors,
    async function (req, res) {
        // Check if user is editor or admin
        const canEdit = req.auth.role_id >= 2;
        if (!canEdit) {
            return res.status(403).json({ msg: "You are not allowed to delete term" });
        }

        // check if event exists and if user is allowed to edit it
        var event;
        try {
            event = await models.Event.findByPk(req.body.event_id);
        }
        catch (err) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // If user is editor, check if user is owner of event
        if (req.auth.role_id == 2 && event.author_id != req.auth.user_id) {
            return res.status(403).json({ msg: "You are not allowed to delete term for this event" });
        }

        // delete term from event
        try {
            await models.EventTerm.destroy({
                where: {
                    term_id: req.body.term_id
                }
            });
        }
        catch (err) {
            return res.status(500).json({ msg: "Failed to delete term from event" });
        }

        return res.status(200).json({ msg: "Term deleted" });
    }
);


/**
 * GET /view-all
 * 
 * View all events (admin sees all, editor sees only his events)
 */

router.get('/view-all',
    auth,
    async function (req, res) {
        // Check if user is editor or admin
        const isEditor = req.auth.role_id == 2;
        const isAdmin = req.auth.role_id == 3;
        if (!isEditor && !isAdmin) {
            return res.status(403).json({ msg: "You are not allowed to view all events" });
        }

        // get all events
        var events;
        try {
            if (isAdmin) {
                events = await models.Event.findAll();
            } else {
                events = await models.Event.findAll({
                    where: {
                        author_id: req.auth.user_id
                    }
                });
            }
        } catch (err) {
            return res.status(500).json({ msg: "Failed to get events" });
        }

        return res.status(200).json({ events: events });
    }
);

/**
 * GET /detail?event_id=123
 * 
 * View event detail
 */

router.get('/detail',
    authOptional,
    [
        query('event_id').isInt(),
    ],
    checkErrors,
    async function (req, res) {
        // get the event details from the database, but only if the event is public or the user is the author
        var event;
        try {
            event = await models.Event.findByPk(req.query.event_id, {
                include: [
                    {
                        model: models.EventComment,
                    },
                    {
                        model: models.EventImage,
                    },
                    {
                        model: models.EventTerm,
                    },
                    {
                        model: models.EventURL,
                    }
                ]
            });
        } catch (err) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // if there is no event, return 404
        if (!event) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // if the event is not published, check if the user is the author
        if (event.state != 'published') {
            // if the user is not logged in, return 404
            if (!req.auth) {
                return res.status(404).json({ msg: "Unknown event." });
            }

            // if the user is not the author, return 404
            if (req.auth.user_id != event.author_id) {
                return res.status(404).json({ msg: "Unknown event." });
            }
        }

        // add one view to the event
        try {
            await models.Event.increment('views', {
                by: 1,
                where: {
                    event_id: req.query.event_id
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: "Failed to add view to event" });
        }

        return res.status(200).json({ event: event });
    }
);

/**
 * POST /change-state
 * 
 * Change event state
 */

router.post('/change-state',
    auth,
    [
        body('event_id').isInt(),
        body('state').isIn(['draft', 'review', 'published']),
    ],
    checkErrors,
    async function (req, res) {
        // Check if user can edit the event
        const isEditor = req.auth.role_id == 2;
        const isAdmin = req.auth.role_id == 3;
        if (!isEditor && !isAdmin) {
            return res.status(403).json({ msg: "You are not allowed to change event state" });
        }

        // check if event exists and if user is allowed to edit it
        var event;
        try {
            event = await models.Event.findByPk(req.body.event_id);
        }
        catch (err) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // If user is editor, check if user is owner of event
        if (req.auth.role_id == 2 && event.author_id != req.auth.user_id) {
            return res.status(403).json({ msg: "You are not allowed to change event state for this event" });
        }

        // Change event state, owner can only change to draft or review
        if (isAdmin) {
            try {
                await models.Event.update({
                    state: req.body.state
                }, {
                    where: {
                        event_id: req.body.event_id
                    }
                });
            } catch (err) {
                return res.status(500).json({ msg: "Failed to change event state" });
            }
        } else {
            if (req.body.state == 'draft' || req.body.state == 'review') {
                try {
                    await models.Event.update({
                        state: req.body.state
                    }, {
                        where: {
                            event_id: req.body.event_id
                        }
                    });
                } catch (err) {
                    return res.status(500).json({ msg: "Failed to change event state" });
                }
            } else {
                return res.status(403).json({ msg: "You are not allowed to change event state" });
            }
        }

        // return success
        return res.status(200).json({ msg: "Event state changed" });
    }
);

/**
 * POST /watch
 * 
 * Watch event
*/

router.post('/watch',
    auth,
    [
        body('event_id').isInt(),
    ],
    checkErrors,
    async function (req, res) {
        // Check if event exists
        var event;
        try {
            event = await models.Event.findByPk(req.body.event_id);
        }
        catch (err) {
            return res.status(404).json({ msg: "Unknown event." });
        }

        // Check if user is already watching the event, if not, add it
        var watch;
        try {
            watch = await models.UserLikesEvent.findOne({
                where: {
                    user_id: req.auth.user_id,
                    event_id: req.body.event_id
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: "Failed to check if user is watching event" });
        }

        if (!watch) {
            try {
                await models.UserLikesEvent.create({
                    user_id: req.auth.user_id,
                    event_id: req.body.event_id
                });
            } catch (err) {
                return res.status(500).json({ msg: "Failed to add watch to event" });
            }
        }

        // return success
        return res.status(200).json({ msg: "Event watched" });
    }
);

/**
 * POST /unwatch
 * 
 * Unwatch event
 */

router.post('/unwatch',
    auth,
    [
        body('event_id').isInt(),
    ],
    checkErrors,
    async function (req, res) {
        // Try to delete watch
        try {
            await models.UserLikesEvent.destroy({
                where: {
                    user_id: req.auth.user_id,
                    event_id: req.body.event_id
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: "Failed to remove watch from event" });
        }

        // return success
        return res.status(200).json({ msg: "Event unwatched" });
    }
);

/**
 * GET /watched?user_id=xx
 * 
 * Get watched events
*/

router.get('/watched',
    [
        query('user_id').isInt(),
    ],
    checkErrors,
    async function (req, res) {
        // Get watched events through UserLikesEvent
        var events;
        try {
            events = await models.UserLikesEvent.findAll({
                where: {
                    user_id: req.query.user_id
                },
                include: [{
                    model: models.Event,
                    where: {
                        state: 'published'
                    }
                }]
            });
        } catch (err) {
            return res.status(500).json({ msg: "Failed to get watched events" });
        }

        // return success
        return res.status(200).json({ msg: "Watched events", events: events });
    }
);

/**
 * GET /categories
 * 
 * Get event categories
 */

router.get('/categories',
    async function (req, res) {
        // Get categories
        const categories = [ "Matematika", "Fyzika", "Biologie", "Chemie", "Zeměpis",  "Sport",  "Podnikání",  "Ekonomie", "Hudba", "Výtvarné umění", "Literatura", "Herectví", "Tanec", "Historie", "Společenské vědy ", "Cizí jazyky", "Prezentační dovedlnosti", "Dobrovolnictví", "Příroda", "Cestování", "Zdraví", "Robotika", "Programování", "Kyberbezpečnost", "Ostatní témata"];
        return res.status(200).json({ msg: "Event categories", categories: categories });
    }
);

getDB();
module.exports = router;