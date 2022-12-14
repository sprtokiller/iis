const { Sequelize, DataTypes } = require("sequelize");
const db = require('./../db');
const bcrypt = require('bcrypt');
const config = require('./../config');

var seq, models;
async function setupModels() {
    seq = await db.GetSequelizer();
    models = await require('./associate')(seq);
    
    await seq.query('SET FOREIGN_KEY_CHECKS = 0');
    await seq.drop();
    await seq.sync({ force: true });
    await seq.query('SET FOREIGN_KEY_CHECKS = 1');

    await mockUsers();
    await mockEvents();
    await mockLikes();
    await mockURLs();
    await mockImages();
    await mockTerms();
    await mockComments();
};

async function mockUsers() {
    const domains = ['google.com', 'seznam.cz', 'centrum.cz', 'vutbr.cz', 'email.cz'];

    models.User.bulkCreate(
        [
            {
                username: 'admin',
                passhash: await bcrypt.hash('adminadmin', config.security.saltRounds),
                email: 'admin@roadmapvut.azurewebsites.net',
                role_id: 3,
                firstname: 'Admin',
                lastname: 'Admin',
                img_path: null,
                karma: 0,
                brief: 'I am the admin of this website. Bow down to me.'
            },
            {
                username: 'editor_1',
                passhash: await bcrypt.hash('editor_1editor_1', config.security.saltRounds),
                email: 'editor_1@' + domains[Math.floor(Math.random() * domains.length)],
                role_id: 2,
                firstname: 'First',
                lastname: 'Editor',
                img_path: null,
                karma: 0,
                brief: 'I make events happen.'
            },
            {
                username: 'editor_2',
                passhash: await bcrypt.hash('editor_2editor_2', config.security.saltRounds),
                email: 'editor_2@' + domains[Math.floor(Math.random() * domains.length)],
                role_id: 2,
                firstname: 'Second',
                lastname: 'Editor',
                img_path: null,
                karma: 0,
                brief: 'I also make events happen, but they are <b>better</b>.'
            },
            {
                username: 'user_1',
                passhash: await bcrypt.hash('user_1user_1', config.security.saltRounds),
                email: 'user_1@' + domains[Math.floor(Math.random() * domains.length)],
                role_id: 1,
                firstname: 'User',
                lastname: 'Uno',
                img_path: null,
                karma: 0,
                brief: 'Hello, I am user UNO.'
            },
            {
                username: 'user_2',
                passhash: await bcrypt.hash('user_2user_2', config.security.saltRounds),
                email: 'user_2@' + domains[Math.floor(Math.random() * domains.length)],
                role_id: 1,
                firstname: 'User',
                lastname: 'Dos',
                img_path: null,
                karma: 0,
                brief: 'Hello, I am user DOS.'
            },
            {
                username: 'user_3',
                passhash: await bcrypt.hash('user_3user_3', config.security.saltRounds),
                email: 'user_3@' + domains[Math.floor(Math.random() * domains.length)],
                role_id: 1,
                firstname: 'User',
                lastname: 'Tres',
                img_path: null,
                karma: 0,
                brief: 'Hello, I am user TRES.'
            }
        ]).catch((err) => { throw err });
}

async function mockEvents() {
    // create two events for each editor
    var editor_1 = await models.User.findOne({ where: { username: 'editor_1' } });
    var editor_2 = await models.User.findOne({ where: { username: 'editor_2' } });

    models.Event.bulkCreate([
        {
            author_id: editor_1.user_id,
            title: 'PraSe - Matematick?? koresponden??n?? semin????',
            description: 'Matematick?? koresponden??n?? semin???? <b>PraSe</b> (PRA??sk?? SEmin????) je celoro??n?? sout???? pro st??edo??kol??ky a v??bec pro ka??d??ho, kdo se zaj??m?? o matematiku.',
            duration_btag: 4,
            type_btag: 9,
            topic_btag: 1,
            location: 'Praha',
            img_path: '07cfa607125ac8175933b4b04.jpg',
            views: 431,
            state: 'published',
            org_name: 'MFF UK'
        },
        {
            author_id: editor_1.user_id,
            title: 'Mensovn?? semin???? pro nadan?? studenty',
            description: 'Zveme nadan?? studenty ve v??ku 11-20 let na p??tidenn?? program zam????en?? na rozvoj znalost?? v oblasti p????rodn??ch v??d a technick??ch obor??, na podporu logick??ho my??len??, samostatn?? tvo??ivosti a motivace k dal????mu studiu t??chto obor??. Pro ????astn??ky jsou p??ipraveny p??edn????ky odborn??k??, n??kolik sout?????? pro t??my i jednotlivce, exkurze a v neposledn?? ??ad?? se sezn??m?? s podobn?? orientovan??mi studenty z cel?? republiky. Na semin???? se mohou p??ihla??ovat v??ichni nadan?? studenti, kte???? o n??j projev?? z??jem (tzn. nemus?? b??t ??leny Mensy).',
            duration_btag: 2,
            type_btag: 4,
            topic_btag: 6349087,
            location: 'Brno',
            img_path: '07cfa607125ac8175933b4b04.jpg',
            views: 217,
            price: 3250,
            state: 'published',
            org_name: 'Mensa ??R'
        },
        {
            author_id: editor_2.user_id,
            title: 'V??????v programovac?? krou??ek',
            description: 'Chcete se nau??it programovat? Pak je toto pr??v?? pro v??s! V??????v programovac?? krou??ek je krou??ek pro v??echny, kte???? se cht??j?? nau??it programovat webov?? aplikace v Node.js a Angularu.',
            duration_btag: 4,
            type_btag: 8,
            topic_btag: 12582913,
            location: 'Brno',
            img_path: '07cfa607125ac8175933b4b04.jpg',
            views: 420,
            price: 500,
            state: 'draft',
            org_name: 'V????a z Brna'
        },
        {
            author_id: editor_2.user_id,
            title: 'Plze??sk?? p??edn????kov?? noc',
            description: 'PLNOC je prvn?? p??edn????kov?? noc v Plzni, kde studenti p??edn?????? student??m. M????e?? se nechat inspirovat ostatn??mi, nebo si s??m vyzkou??et p??edn????en?? a p??edat sv?? znalosti d??l. Na PLNOC pat???? ka??d?? t??ma, kter?? t?? zaj??m??. Najde?? tu prezentace v??deck??ch prac??, t??mata od soft skills po programov??n??, ale i pov??d??n?? o kon????c??ch nebo d??le??it??ch ot??zk??ch ??ivota, vesm??ru a v??bec. Krom?? p??edn????ek se m????e?? t????it i na workshopy, j??dlo a doprovodn?? program. ',
            duration_btag: 1,
            type_btag: 2,
            topic_btag: 33554431,
            location: 'Plze??',
            img_path: '07cfa607125ac8175933b4b04.jpg',
            views: 369,
            price: 200,
            state: 'review',
            org_name: 'PLNOC'
        },
    ]).catch((err) => { throw err });
}

async function mockLikes() {
    // create some likes

    var user_1 = await models.User.findOne({ where: { username: 'user_1' } });
    var user_2 = await models.User.findOne({ where: { username: 'user_2' } });

    var event_1 = await models.Event.findByPk(1);
    var event_2 = await models.Event.findByPk(2);

    models.UserLikesEvent.bulkCreate([
        {
            user_id: user_1.user_id,
            event_id: event_1.event_id
        },
        {
            user_id: user_2.user_id,
            event_id: event_1.event_id
        },
        {
            user_id: user_1.user_id,
            event_id: event_2.event_id
        }
    ]).catch((err) => { throw err });
}

async function mockURLs() {
    // create some URLs for the events

    var event_1 = await models.Event.findByPk(1);
    var event_2 = await models.Event.findByPk(2);
    var event_3 = await models.Event.findByPk(3);
    var event_4 = await models.Event.findByPk(4);

    models.EventURL.bulkCreate([
        {
            event_id: event_1.event_id,
            url: 'https://prase.cz/'
        },
        {
            event_id: event_2.event_id,
            url: 'https://mensa.cz/'
        },
        {
            event_id: event_2.event_id,
            url: 'https://deti.mensa.cz/index.php?pg=udalosti&aid=2005'
        },
        {
            event_id: event_3.event_id,
            url: 'https://www.linkedin.com/in/vitezslav-kriz/'
        },
        {
            event_id: event_4.event_id,
            url: 'https://www.plnoc.cz/'
        },
        {
            event_id: event_4.event_id,
            url: 'https://www.facebook.com/PLNOC/'
        }
    ]).catch((err) => { throw err });
}

async function mockImages() {
    // create some images for the events

    var event_1 = await models.Event.findByPk(1);
    var event_2 = await models.Event.findByPk(2);
    var event_4 = await models.Event.findByPk(4);

    models.EventImage.bulkCreate([
        {
            event_id: event_1.event_id,
            img_path: '07cfa607125ac8175933b4b05.png'
        },
        {
            event_id: event_2.event_id,
            img_path: '07cfa607125ac8175933b4b05.png'
        },
        {
            event_id: event_4.event_id,
            img_path: '07cfa607125ac8175933b4b05.png'
        }
    ]).catch((err) => { throw err });
}

async function mockTerms() {
    // create some terms for the events

    var event_1 = await models.Event.findByPk(1);
    var event_2 = await models.Event.findByPk(2);
    var event_4 = await models.Event.findByPk(4);
    
    models.EventTerm.bulkCreate([
        {
            event_id: event_1.event_id,
            description: 'Term??n odesl??n?? 3. podzimn?? a 1. seri??lov?? s??rie',
            start_date: new Date(2022, 12, 5),
            end_date: new Date(2022, 12, 5)
        },
        {
            event_id: event_1.event_id,
            description: 'Term??n odesl??n?? 4. podzimn?? s??rie',
            start_date: new Date(2023, 1, 9),
            end_date: new Date(2023, 1, 9)
        },
        {
            event_id: event_2.event_id,
            description: 'Mensovn?? semin???? pro nadan?? - podzim 2022',
            start_date: new Date(2022, 10, 13),
            end_date: new Date(2022, 10, 17)
        },
        {
            event_id: event_2.event_id,
            description: 'Mensovn?? semin???? pro nadan?? - jaro 2023',
            start_date: new Date(2022, 3, 5),
            end_date: new Date(2022, 3, 12)
        },
        {
            event_id: event_4.event_id,
            description: 'PLNOC 2022',
            start_date: new Date(2022, 10, 7),
            end_date: new Date(2022, 10, 8)
        }
    ]).catch((err) => { throw err });
}

async function mockComments() {
    // create some comments for the events

    var user_1 = await models.User.findOne({ where: { username: 'user_1' } });
    var user_2 = await models.User.findOne({ where: { username: 'user_2' } });

    var event_1 = await models.Event.findByPk(1);
    var event_2 = await models.Event.findByPk(2);

    models.EventComment.bulkCreate([
        {
            user_id: user_1.user_id,
            event_id: event_1.event_id,
            text: 'Toto je koment???? k ud??losti 1 od u??ivatele 1'
        },
        {
            user_id: user_2.user_id,
            event_id: event_1.event_id,
            text: 'Toto je koment???? k ud??losti 1 od u??ivatele 2'
        },
        {
            user_id: user_1.user_id,
            event_id: event_2.event_id,
            text: 'Toto je koment???? k ud??losti 2 od u??ivatele 1'
        }
    ]).catch((err) => { throw err });
}

setupModels();

