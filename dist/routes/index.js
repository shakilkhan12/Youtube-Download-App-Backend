"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_routes_1 = require("./auth.routes");
var video_routes_1 = require("./video.routes");
var mainRouter = (0, express_1.Router)();
mainRouter.use('/auth', auth_routes_1.authRouter);
mainRouter.use('/video', video_routes_1.videoRouter);
exports.default = mainRouter;
