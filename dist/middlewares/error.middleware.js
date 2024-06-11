"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (error, req, res, next) {
    var status = error.status || 500;
    var message = error.message || 'Something went wrong';
    res.status(status).json({ message: message });
};
exports.errorHandler = errorHandler;
