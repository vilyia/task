"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const Kernel_1 = __importDefault(require("../middlewares/Kernel"));
const Routes_1 = __importDefault(require("./Routes"));
const Log_1 = __importDefault(require("../middlewares/Log"));
dotenv_1.default.config();
class Express {
    constructor() {
        this.express = (0, express_1.default)();
        this.createServer();
        this.mountMiddlewares();
        this.mountRoutes();
    }
    init() {
        const port = process.env.PORT || 3000;
        this.express.use((req, res) => {
            res.status(404).json({
                status: 404,
                message: "Not Found",
            });
        });
        this.server.listen(port, () => {
            Log_1.default.info(`Server :: Running on port ${port}`);
        });
    }
    mountRoutes() {
        this.express = Routes_1.default.mount(this.express);
    }
    mountMiddlewares() {
        this.express = Kernel_1.default.init(this.express);
    }
    createServer() {
        this.server = http_1.default.createServer(this.express);
    }
}
exports.default = new Express();
//# sourceMappingURL=Express.js.map