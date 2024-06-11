"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.addUser = exports.users = void 0;
exports.users = [];
var addUser = function (socketId) {
    var checkUser = exports.users.find(function (user) { return user.socketId === socketId; });
    if (!checkUser) {
        exports.users.push({ socketId: socketId });
    }
    console.log('users -> ', exports.users);
};
exports.addUser = addUser;
var getUser = function (socketId) {
    return exports.users.find(function (user) { return user.socketId === socketId; });
};
exports.getUser = getUser;
