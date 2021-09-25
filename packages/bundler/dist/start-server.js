"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
// @ts-expect-error
const webpack_dev_middleware_1 = __importDefault(require("@jonny/webpack-dev-middleware"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const webpack_1 = __importDefault(require("webpack"));
// @ts-expect-error
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
const get_port_1 = require("./get-port");
const update_available_1 = require("./update-available");
const webpack_config_1 = require("./webpack-config");
const startServer = async (entry, userDefinedComponent, options) => {
    var _a, _b, _c, _d, _e;
    const app = (0, express_1.default)();
    const tmpDir = await fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'react-motion-graphics'));
    const config = (0, webpack_config_1.webpackConfig)({
        entry,
        userDefinedComponent,
        outDir: tmpDir,
        environment: 'development',
        webpackOverride: (_a = options === null || options === void 0 ? void 0 : options.webpackOverride) !== null && _a !== void 0 ? _a : remotion_1.Internals.getWebpackOverrideFn(),
        inputProps: (_b = options === null || options === void 0 ? void 0 : options.inputProps) !== null && _b !== void 0 ? _b : {},
        envVariables: (_c = options === null || options === void 0 ? void 0 : options.envVariables) !== null && _c !== void 0 ? _c : {},
        maxTimelineTracks: (_d = options === null || options === void 0 ? void 0 : options.maxTimelineTracks) !== null && _d !== void 0 ? _d : 15,
    });
    const compiler = (0, webpack_1.default)(config);
    app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'web')));
    app.use((0, webpack_dev_middleware_1.default)(compiler));
    app.use((0, webpack_hot_middleware_1.default)(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
    app.get('/update', (req, res) => {
        (0, update_available_1.isUpdateAvailableWithTimeout)()
            .then((data) => {
            res.json(data);
        })
            .catch((err) => {
            res.status(500).json({
                err: err.message,
            });
        });
    });
    app.use('favicon.png', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '..', 'web', 'favicon.png'));
    });
    app.use('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '..', 'web', 'index.html'));
    });
    const desiredPort = (_e = options === null || options === void 0 ? void 0 : options.port) !== null && _e !== void 0 ? _e : remotion_1.Internals.getServerPort();
    const port = await (0, get_port_1.getDesiredPort)(desiredPort, 3000, 3100);
    app.listen(port);
    return port;
};
exports.startServer = startServer;
//# sourceMappingURL=start-server.js.map