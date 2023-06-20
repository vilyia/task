"use strict";
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
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const Validate_1 = __importDefault(require("../middlewares/Validate"));
const Login_1 = __importDefault(require("../controllers/Auth/Login"));
const User_1 = __importDefault(require("../controllers/Api/User"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authorise_1 = require("../middlewares/Authorise");
const index_1 = __importDefault(require("../config/index"));
const router = (0, express_1.Router)();
const schema = {
    login: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        name: joi_1.default.string().required(),
    }),
    verify: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        otp: joi_1.default.string().required(),
    })
};
router.post("/auth/otplogin", Validate_1.default.body(schema.login), Login_1.default.otpLogin);
router.post("/auth/verify", Validate_1.default.body(schema.verify), Login_1.default.otpVerify);
router.get("/auth/logout", Login_1.default.logout);
//bug here
router.get("/me", Authorise_1.authMiddleware, User_1.default.getMe);
router.get("/all", User_1.default.getAll);
router.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: "/auth/google",
}));
router.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/auth/google" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userR = req.user;
    // const user = User.find(userF => userF.id === userR.id);
    // const frontendURL = config.frontendUrl;
    // console.log(user);
    const token = jsonwebtoken_1.default.sign({ email: userR.email }, index_1.default.jwtSecret, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    console.log(token);
    return res.json({ status: true, data: userR });
}));
exports.default = router;
//# sourceMappingURL=auth.js.map