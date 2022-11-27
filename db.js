// var mysql = require('mysql2/promise');
var config = require('./config');
const { Sequelize, DataTypes } = require("sequelize");

// var db;

// async function GetDatabase() {
//     if (!db) {
//         db = await mysql.createConnection(config.azure).catch((err) => { throw err });
//         await db.connect();

//         console.log(`DB connected : ${config.azure.host}:${config.azure.port}`);
//     }
//     return db;
// }

var seq;

async function GetSequelizer() {
    if (!seq) {
        seq = new Sequelize(
            config.azure.database,
            config.azure.user,
            config.azure.password,
            {
        
                host: config.azure.host,
                dialect: 'mysql',
                port: config.azure.port,
                dialectOptions: {
                    ssl: config.azure.ssl
                },
                charset: 'utf8',
                collate: 'utf8_czech_ci',
                logging: false,
            }
        );
        
        await seq.authenticate().catch((err) => { throw err });

        console.log(`Sequelizer   : ${config.azure.host}:${config.azure.port}`);
    }
    return seq;
}

//module.exports.GetDatabase = GetDatabase;
module.exports.GetSequelizer = GetSequelizer;