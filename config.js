const fs = require('fs');
const path = require('path');

class Config {
    constructor() {
        this.security = {
            saltRounds: 11,
            jwtoptions: {
                issuer: "xkrizv03",
                audience: "http://www.roadmap.cz/",
                algorithm: "HS256",
                expiresIn: "24h"
            }
        };

        this.file_upload = {
            avatar_dir: "public/images/avatars/",
            avatar_max_size: 1000000,
            eventphoto_dir: "public/images/eventphotos/",
            eventphoto_max_size: 4000000
        };


        this.app = {
            port: process.env.APP_PORT || 3333
        };

        this.token_options = {
            httpOnly: true,
            secure: false,
            sameSite: true,
            maxAge: 1000 * 60 * 60 * 4
        }

        this.azure = {
            host: 'roadmapvut.mysql.database.azure.com',
            user: 'xkrizv03',
            password: 'Prtousek4!',
            database: 'xkrizv03',
            port: 3306,
            ssl: {ca: fs.readFileSync(path.join(__dirname, "DigiCertGlobalRootCA.crt.pem"))}
        };

        this.sanitizer_options = {
            allowedTags:  [  'b',  'i',  'em',  'strong',  'a'  ],
            allowedAttributes:  {'a':  [  'href'  ] }
        };

        this.fs = {
            public: "dist",
            img: "assets/img"
        }
    }
}

var config = new Config;

module.exports = config;