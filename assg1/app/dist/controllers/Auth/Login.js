"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("../../middlewares/Log"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otp_1 = require("../../helpers/otp");
const sendEmail_1 = require("../../services/sendEmail");
const User_1 = __importStar(require("../../models/User"));
const index_1 = __importDefault(require("../../config/index"));
class Login {
    static otpLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name } = req.body;
                const gen = (0, otp_1.generateKey)();
                const otp = parseInt(gen);
                console.log(otp);
                const subject = 'otp login';
                yield (0, sendEmail_1.sendEmail)(email, subject, gen);
                (0, User_1.addUser)({
                    email: email, name: name,
                    google: "", otpNum: otp
                });
                console.log(User_1.default);
                return res.status(200).json({
                    message: "check otp"
                });
            }
            catch (error) {
                Log_1.default.error(error);
                return res.status(500).send("Internal server error");
            }
        });
    }
    static otpVerify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                const otpNum = parseInt(otp);
                console.log(User_1.default);
                const user = User_1.default.find(user => user.email === email);
                if (!user) {
                    throw new Error('User not found');
                }
                if (user.otpNum !== otpNum) {
                    throw new Error('Invalid OTP');
                }
                const token = jsonwebtoken_1.default.sign({ email }, index_1.default.jwtSecret, { expiresIn: '1h' });
                console.log(token);
                res.cookie('jwt', token, { httpOnly: true });
                return res.status(200).send("Logged in succesfully");
            }
            catch (error) {
                Log_1.default.error(error);
                return res.status(500).send("Internal server error");
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.cookies.jwt) {
                    return res.status(200).send('Already logged out');
                }
                res.clearCookie('jwt');
                return res.status(200).send("Logged Out succesfully");
            }
            catch (error) {
                Log_1.default.error(error);
                return res.status(500).send("Internal server error");
            }
        });
    }
}
exports.default = Login;
//# sourceMappingURL=Login.js.map