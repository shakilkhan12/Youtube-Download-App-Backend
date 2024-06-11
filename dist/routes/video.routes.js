"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
var controllers_1 = require("@/controllers");
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.videoRouter = router;
router.get('/video-details', controllers_1.VideoController.videoDetails);
router.get('/download', controllers_1.VideoController.downloadVideo);
