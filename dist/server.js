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
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("@/routes"));
var middlewares_1 = require("@/middlewares");
var users_1 = require("./utils/users");
var app = (0, express_1.default)();
var PORT = 5000;
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use((0, cors_1.default)({ credentials: true, origin: process.env.CLIENT }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, compression_1.default)());
// socket 
io.on('connection', function (socket) {
    console.log('connection -> ', socket.id);
    app.set('socket', socket);
    app.set('io', io);
    (0, users_1.addUser)(socket.id);
});
// routess
app.get("/", function (_req, res) { return res.send("🚀 Welcome to the API"); });
app.use('/api', routes_1.default);
app.use(middlewares_1.errorHandler);
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            server.listen(PORT, function () {
                console.log("\uD83D\uDE80  Server ready at: http://localhost:".concat(PORT, "/"));
            });
        }
        catch (err) {
            console.error(err.message);
            process.exit(1);
        }
        return [2 /*return*/];
    });
}); };
startServer();
