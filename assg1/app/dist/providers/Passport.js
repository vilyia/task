"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../models/User"));
const google_1 = __importDefault(require("../services/google"));
const findById = (email, callback) => {
    const user = User_1.default.find((user) => user.email === email);
    if (user) {
        callback(null, user);
    }
    else {
        const err = new Error('User not found');
        callback(err, undefined);
    }
};
class Passport {
    static mount(_app) {
        _app.use(passport_1.default.initialize());
        _app.use(passport_1.default.session());
        passport_1.default.serializeUser((user, done) => {
            const currentUser = user;
            done(null, currentUser.email);
        });
        passport_1.default.deserializeUser((email, done) => {
            console.log(email);
            findById(email, (err, user) => {
                done(err, user);
            });
        });
        google_1.default.init(passport_1.default);
        return _app;
    }
}
exports.default = Passport;
//# sourceMappingURL=Passport.js.map