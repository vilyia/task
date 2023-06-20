import express from "express";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import Log from "./Log";
import expressValidator from "express-validator";
import type { Application } from "express";
import Passport from "../providers/Passport";
import cookieSession from "cookie-session";
import cookieParser from 'cookie-parser';
import config from '../config/index';

const sessionOptions = {
    name: 'session',
    secret: config.jwtSecret,
    maxAge: 24 * 60 * 60 * 1000,
};

class Http {
    public static init(_app: Application): Application {
        Log.info("Initializing HTTP middleware");
        _app.use(expressValidator());
        _app.use(hpp());
        _app.use(helmet());
        _app.use(cookieParser());
        _app.use(cookieSession(sessionOptions));
        _app.use(express.json());
        _app.use(express.urlencoded({ extended: false }));
        _app.use(compression());
        _app = Passport.mount(_app);

        return _app;
    }
}

export default Http;
