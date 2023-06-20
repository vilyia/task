import dotenv from 'dotenv';

dotenv.config();

const config = {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,

    user: process.env.user,
    pass: process.env.pass,
    from: process.env.from,

    frontendUrl: process.env.frontendUrl,

    jwtSecret: process.env.jwtSecret

};

export default config;