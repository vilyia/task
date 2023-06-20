"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cors_1 = __importDefault(require("./Cors"));
const Http_1 = __importDefault(require("./Http"));
const morgan_1 = __importDefault(require("morgan"));
const Log_1 = __importDefault(require("./Log"));
class Kernel {
    static init(_app) {
        _app = Cors_1.default.init(_app);
        _app = Http_1.default.init(_app);
        const StreamOptions = {
            write: (message) => {
                Log_1.default.info(`HTTP: ${message}`);
            },
        };
        _app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', { stream: StreamOptions }));
        return _app;
    }
}
exports.default = Kernel;
//# sourceMappingURL=Kernel.js.map