import { Request, Response } from "express";
import Log from "../../middlewares/Log";
import jwt from 'jsonwebtoken';
import { generateKey } from '../../helpers/otp';
import { sendEmail } from '../../services/sendEmail';
import User, { addUser } from '../../models/User';
import config from '../../config/index';

class Login {

    public static async otpLogin(req: Request, res: Response): Promise<Response | void> {
        try {
            const { email, name } = req.body;
            const gen = generateKey();
            const otp = parseInt(gen);
            console.log(otp);

            const subject = 'otp login';
            await sendEmail(email, subject, gen);
            addUser({
                email: email, name: name,
                google: "", otpNum: otp
            });
            console.log(User);
            return res.status(200).json({
                message: "check otp"
            });
        } catch (error) {
            Log.error(error);
            return res.status(500).send("Internal server error");
        }
    }

    public static async otpVerify(req: Request, res: Response): Promise<Response | void> {
        try {
            const { email, otp } = req.body;
            const otpNum = parseInt(otp);
            console.log(User);

            const user = User.find(user => user.email === email);

            if (!user) {
                throw new Error('User not found');
            }
            if (user.otpNum !== otpNum) {
                throw new Error('Invalid OTP');
            }

            const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: '1h' });
            console.log(token);
            res.cookie('jwt', token, { httpOnly: true });
            return res.status(200).send("Logged in succesfully");
        } catch (error) {
            Log.error(error);
            return res.status(500).send("Internal server error");
        }
    }

    public static async logout(req: Request, res: Response): Promise<Response | void> {
        try {
            if (!req.cookies.jwt) {
                return res.status(200).send('Already logged out');
            }
            res.clearCookie('jwt');

            return res.status(200).send("Logged Out succesfully");
        } catch (error) {
            Log.error(error);
            return res.status(500).send("Internal server error");
        }
    }
}

export default Login;