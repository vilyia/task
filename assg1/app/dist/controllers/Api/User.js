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
const Log_1 = __importDefault(require("../../middlewares/Log"));
const User_1 = __importDefault(require("../../models/User"));
class User {
    static getMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.email;
                const foundItem = User_1.default.find((item) => item.email === email);
                const name = foundItem.name;
                return res.status(200).json({
                    status: "true",
                    name: name,
                    email: email
                });
            }
            catch (error) {
                Log_1.default.error(error);
                return res.status(500).send("Internal server error");
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json({
                    status: "true",
                    data: User_1.default
                });
            }
            catch (error) {
                Log_1.default.error(error);
                return res.status(500).send("Internal server error");
            }
        });
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map