"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
let currentId = 0;
const users = [];
const addUser = (user) => {
    const newUser = Object.assign({ id: currentId++ }, user);
    users.push(newUser);
    return newUser;
};
exports.addUser = addUser;
exports.default = users;
//# sourceMappingURL=User.js.map