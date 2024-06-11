"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var controllers_1 = require("@/controllers");
var express_1 = require("express");
var authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post('/register', controllers_1.AuthController.userRegister);
authRouter.post('/login', controllers_1.AuthController.userLogin);
