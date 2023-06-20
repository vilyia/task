import { Application } from "express";
import passport from "passport";
import User from "../models/User";
import IUser from "../interfaces/User";
import Google from "../services/google";

const findById = (email: string, callback: (err: Error | null, user: IUser | undefined) => void) => {
    const user = User.find((user) => user.email === email);
    if (user) {
        callback(null, user);
    } else {
        const err = new Error('User not found');
        callback(err, undefined);
    }
};

class Passport {
    public static mount(_app: Application): Application {
        _app.use(passport.initialize());
        _app.use(passport.session());

        passport.serializeUser((user, done) => {
            const currentUser = user as IUser;
            done(null, currentUser.email);
        });
        passport.deserializeUser<any, any>((email, done) => {
            console.log(email);
            findById(email, (err: Error, user: IUser) => {
                done(err, user);
            });
        });

        Google.init(passport);

        return _app;
    }
}

export default Passport;
