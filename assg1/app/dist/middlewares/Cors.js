"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const Log_1 = __importDefault(require("./Log"));
class Cors {
    static init(_app) {
        Log_1.default.info("Initializing CORS middleware");
        const corsOptions = {
            origin: "*",
            optionsSuccessStatus: 200,
        };
        _app.use((0, cors_1.default)(corsOptions));
        return _app;
    }
}
exports.default = Cors;
//# sourceMappingURL=Cors.js.map