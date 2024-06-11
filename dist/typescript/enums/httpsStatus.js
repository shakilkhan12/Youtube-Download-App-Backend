"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS = void 0;
var STATUS;
(function (STATUS) {
    STATUS[STATUS["SUCCESS"] = 200] = "SUCCESS";
    STATUS[STATUS["CREATED"] = 201] = "CREATED";
    STATUS[STATUS["ACCEPTED"] = 202] = "ACCEPTED";
    STATUS[STATUS["CONFLICT"] = 409] = "CONFLICT";
    STATUS[STATUS["FORBIDDEN"] = 403] = "FORBIDDEN";
    STATUS[STATUS["NOT_FOUND"] = 404] = "NOT_FOUND";
    STATUS[STATUS["NO_CONTENT"] = 204] = "NO_CONTENT";
    STATUS[STATUS["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    STATUS[STATUS["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    STATUS[STATUS["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    STATUS[STATUS["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(STATUS || (exports.STATUS = STATUS = {}));
