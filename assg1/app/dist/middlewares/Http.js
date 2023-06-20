"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const Log_1 = __importDefault(require("./Log"));
const express_validator_1 = __importDefault(require("express-validator"));
const Passport_1 = __importDefault(require("../providers/Passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("../config/index"));
const sessionOptions = {
    name: 'session',
    secret: index_1.default.jwtSecret,
    maxAge: 24 * 60 * 60 * 1000,
};
class Http {
    static init(_app) {
        Log_1.default.info("Initializing HTTP middleware");
        _app.use((0, express_validator_1.default)());
        _app.use((0, hpp_1.default)());
        _app.use((0, helmet_1.default)());
        _app.use((0, cookie_parser_1.default)());
        _app.use((0, cookie_session_1.default)(sessionOptions));
        _app.use(express_1.default.json());
        _app.use(express_1.default.urlencoded({ extended: false }));
        _app.use((0, compression_1.default)());
        _app = Passport_1.default.mount(_app);
        return _app;
    }
}
exports.default = Http;
//# sourceMappingURL=Http.js.map