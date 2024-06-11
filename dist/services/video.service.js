"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = require("@/typescript");
var HttpException_utils_1 = require("@/utils/HttpException.utils");
var users_1 = require("@/utils/users");
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var VideoService = /** @class */ (function () {
    function VideoService() {
    }
    var _a;
    _a = VideoService;
    VideoService.download = function (_b, req_1, res_1) { return __awaiter(void 0, [_b, req_1, res_1], void 0, function (_c, req, res) {
        var socket, user, info, format, video, starttime;
        var videoURL = _c.videoURL, socketId = _c.socketId, itag = _c.itag;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    socket = req.app.get('io');
                    user = (0, users_1.getUser)(socketId);
                    if (!ytdl_core_1.default.validateURL(videoURL)) {
                        throw new HttpException_utils_1.HttpException(typescript_1.STATUS.BAD_REQUEST, "Invalid YouTube URL");
                    }
                    return [4 /*yield*/, ytdl_core_1.default.getInfo(videoURL)];
                case 1:
                    info = _d.sent();
                    format = ytdl_core_1.default.chooseFormat(info.formats, { quality: itag });
                    video = (0, ytdl_core_1.default)(videoURL, { format: format });
                    video.pipe(res);
                    video.once('response', function () {
                        starttime = Date.now();
                    });
                    video.on('progress', function (chunkLength, downloaded, total) {
                        var percent = downloaded / total;
                        var downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
                        var estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
                        if (user === null || user === void 0 ? void 0 : user.socketId) {
                            socket.to(user === null || user === void 0 ? void 0 : user.socketId).emit('progress', "".concat((percent * 100).toFixed(2), "%"));
                            socket.to(user === null || user === void 0 ? void 0 : user.socketId).emit('mb', "(".concat((downloaded / 1024 / 1024).toFixed(2), "MB of ").concat((total / 1024 / 1024).toFixed(2), "MB)\n"));
                            socket.to(user === null || user === void 0 ? void 0 : user.socketId).emit('time-left', "Estimated time left: ".concat(estimatedDownloadTime.toFixed(2), " minutes "));
                            socket.to(user === null || user === void 0 ? void 0 : user.socketId).emit('downloaded-minutes', "Running for: ".concat(downloadedMinutes.toFixed(2), " minutes"));
                        }
                    });
                    video.on('end', function () {
                        console.log('\n\n');
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    VideoService.getDetails = function (videoURL) { return __awaiter(void 0, void 0, void 0, function () {
        var videoInfo, formats, _b, title, thumbnails;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!ytdl_core_1.default.validateURL(videoURL)) {
                        throw new HttpException_utils_1.HttpException(typescript_1.STATUS.BAD_REQUEST, "Invalid YouTube URL");
                    }
                    return [4 /*yield*/, ytdl_core_1.default.getInfo(videoURL)];
                case 1:
                    videoInfo = _c.sent();
                    formats = ytdl_core_1.default.filterFormats(videoInfo.formats, 'videoandaudio');
                    _b = videoInfo.videoDetails, title = _b.title, thumbnails = _b.thumbnails;
                    return [2 /*return*/, {
                            videoInfo: videoInfo,
                            title: title,
                            thumbnail: thumbnails[thumbnails.length - 1].url,
                            formats: formats
                        }];
            }
        });
    }); };
    return VideoService;
}());
exports.default = VideoService;
