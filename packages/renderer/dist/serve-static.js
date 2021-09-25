"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const http_1 = __importDefault(require("http"));
const remotion_1 = require("remotion");
const serve_handler_1 = __importDefault(require("serve-handler"));
const get_port_1 = require("./get-port");
const serveStatic = async (path, options) => {
    var _a, _b;
    const port = await (0, get_port_1.getDesiredPort)((_b = (_a = options === null || options === void 0 ? void 0 : options.port) !== null && _a !== void 0 ? _a : remotion_1.Internals.getServerPort()) !== null && _b !== void 0 ? _b : undefined, 3000, 3100);
    const server = http_1.default
        .createServer((request, response) => {
        (0, serve_handler_1.default)(request, response, {
            public: path,
            directoryListing: false,
            cleanUrls: false,
        }).catch(() => {
            response.statusCode = 500;
            response.end('Error serving file');
        });
    })
        .listen(port);
    const close = () => {
        return new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    return { port, close };
};
exports.serveStatic = serveStatic;
//# sourceMappingURL=serve-static.js.map