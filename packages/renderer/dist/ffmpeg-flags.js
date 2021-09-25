"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFfmpegVersion = exports.parseFfmpegVersion = exports.ffmpegHasFeature = exports.getFfmpegBuildInfo = void 0;
const execa_1 = __importDefault(require("execa"));
const validate_ffmpeg_1 = require("./validate-ffmpeg");
let buildConfig = null;
const getFfmpegBuildInfo = async () => {
    if (buildConfig !== null) {
        return buildConfig;
    }
    const data = await (0, execa_1.default)('ffmpeg', ['-buildconf']);
    buildConfig = data.stderr;
    return buildConfig;
};
exports.getFfmpegBuildInfo = getFfmpegBuildInfo;
const ffmpegHasFeature = async (feature) => {
    if (!(0, validate_ffmpeg_1.binaryExists)('ffmpeg')) {
        return false;
    }
    const config = await (0, exports.getFfmpegBuildInfo)();
    return config.includes(feature);
};
exports.ffmpegHasFeature = ffmpegHasFeature;
const parseFfmpegVersion = (buildconf) => {
    const match = buildconf.match(/ffmpeg version ([0-9]+).([0-9]+).([0-9]+)/);
    if (!match) {
        return null;
    }
    return [Number(match[1]), Number(match[2]), Number(match[3])];
};
exports.parseFfmpegVersion = parseFfmpegVersion;
const getFfmpegVersion = async () => {
    const buildInfo = await (0, exports.getFfmpegBuildInfo)();
    return (0, exports.parseFfmpegVersion)(buildInfo);
};
exports.getFfmpegVersion = getFfmpegVersion;
//# sourceMappingURL=ffmpeg-flags.js.map