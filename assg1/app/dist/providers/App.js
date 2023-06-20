"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = __importDefault(require("./Express"));
const Log_1 = __importDefault(require("../middlewares/Log"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class App {
    loadServer() {
        Log_1.default.info('Server :: Loading...');
        Express_1.default.init();
    }
}
exports.default = new App;
//# sourceMappingURL=App.js.map