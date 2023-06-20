"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../routes/auth"));
const Log_1 = __importDefault(require("../middlewares/Log"));
class Routes {
    mount(_app) {
        Log_1.default.info('Initializing routes');
        _app.get('/', (req, res) => {
            res.send(`<h3>Up and Running</h3>`);
        });
        _app.use('/api', auth_1.default);
        return _app;
    }
}
exports.default = new Routes;
//# sourceMappingURL=Routes.js.map