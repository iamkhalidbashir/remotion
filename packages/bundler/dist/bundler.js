"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundle = void 0;
const execa_1 = __importDefault(require("execa"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const util_1 = require("util");
const webpack_1 = __importDefault(require("webpack"));
const webpack_config_1 = require("./webpack-config");
const entry = require.resolve('./renderEntry');
const promisified = (0, util_1.promisify)(webpack_1.default);
const prepareOutDir = async (specified) => {
    if (specified) {
        await fs_1.default.promises.mkdir(specified, { recursive: true });
        return specified;
    }
    return fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'react-motion-graphics'));
};
const bundle = async (entryPoint, onProgressUpdate, options) => {
    var _a, _b, _c;
    const outDir = await prepareOutDir((_a = options === null || options === void 0 ? void 0 : options.outDir) !== null && _a !== void 0 ? _a : null);
    const output = await promisified([
        (0, webpack_config_1.webpackConfig)({
            entry,
            userDefinedComponent: entryPoint,
            outDir,
            environment: 'production',
            webpackOverride: (_b = options === null || options === void 0 ? void 0 : options.webpackOverride) !== null && _b !== void 0 ? _b : remotion_1.Internals.getWebpackOverrideFn(),
            onProgressUpdate,
            enableCaching: (_c = options === null || options === void 0 ? void 0 : options.enableCaching) !== null && _c !== void 0 ? _c : remotion_1.Internals.DEFAULT_WEBPACK_CACHE_ENABLED,
            maxTimelineTracks: 15,
        }),
    ]);
    if (!output) {
        throw new Error('Expected webpack output');
    }
    const { errors } = output.toJson();
    if (errors !== undefined && errors.length > 0) {
        throw new Error(errors[0].message + '\n' + errors[0].details);
    }
    const indexHtmlDir = path_1.default.join(__dirname, '..', 'web', 'index.html');
    if (process.platform === 'win32') {
        await (0, execa_1.default)('copy', [indexHtmlDir, outDir]);
    }
    else {
        await (0, execa_1.default)('cp', [indexHtmlDir, outDir]);
    }
    return outDir;
};
exports.bundle = bundle;
//# sourceMappingURL=bundler.js.map