"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validate {
}
Validate.body = (schema, errors) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        const valid = error == null;
        if (valid) {
            next();
        }
        else {
            const { details } = error;
            let message = details.map((i) => i.message).join(",");
            if (errors) {
                message = errors;
            }
            res.status(422).json({ success: false, error: message });
        }
    };
};
Validate.params = (schema, errors) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        const valid = error == null;
        if (valid) {
            next();
        }
        else {
            const { details } = error;
            let message = details.map((i) => i.message).join(",");
            if (errors) {
                message = errors;
            }
            res.status(422).json({ success: false, error: message });
        }
    };
};
Validate.query = (schema, errors) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.query);
        const valid = error == null;
        if (valid) {
            next();
        }
        else {
            const { details } = error;
            let message = details.map((i) => i.message).join(",");
            if (errors) {
                message = errors;
            }
            res.status(422).json({ success: false, error: message });
        }
    };
};
exports.default = Validate;
//# sourceMappingURL=Validate.js.map