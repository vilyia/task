"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
class Log {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            level: "info",
            format: winston_1.format.combine(winston_1.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
            }), winston_1.format.errors({ stack: true }), winston_1.format.json(), winston_1.format.prettyPrint(), winston_1.format.colorize()),
            transports: [
                new winston_1.transports.File({ filename: "logs/error.log", level: "error" }),
                new winston_1.transports.File({ filename: "logs/combined.log" }),
            ],
        });
        if (process.env.NODE_ENV !== "production") {
            this.logger.add(new winston_1.transports.Console({
                format: winston_1.format.simple(),
            }));
        }
    }
    info(message) {
        this.logger.info(message);
    }
    error(message) {
        this.logger.error(message);
    }
}
exports.default = new Log();
//# sourceMappingURL=Log.js.map