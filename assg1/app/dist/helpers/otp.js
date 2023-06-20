"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKey = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const generateKey = () => {
    const num = otp_generator_1.default.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    return num;
};
exports.generateKey = generateKey;
//# sourceMappingURL=otp.js.map