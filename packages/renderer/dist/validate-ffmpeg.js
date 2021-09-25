"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFfmpeg = exports.isHomebrewInstalled = exports.binaryExists = void 0;
const execa_1 = __importDefault(require("execa"));
const os_1 = __importDefault(require("os"));
const existsMap = {};
const binaryExists = async (name) => {
    if (typeof existsMap[name] !== 'undefined') {
        return existsMap[name];
    }
    const isWin = os_1.default.platform() === 'win32';
    const where = isWin ? 'where' : 'which';
    try {
        await (0, execa_1.default)(where, [name]);
        existsMap[name] = true;
        return true;
    }
    catch (err) {
        existsMap[name] = false;
        return false;
    }
};
exports.binaryExists = binaryExists;
const isHomebrewInstalled = async () => {
    return (0, exports.binaryExists)('brew');
};
exports.isHomebrewInstalled = isHomebrewInstalled;
const validateFfmpeg = async () => {
    const ffmpegExists = await (0, exports.binaryExists)('ffmpeg');
    if (!ffmpegExists) {
        console.error('It looks like FFMPEG is not installed');
        if (os_1.default.platform() === 'darwin' && (await (0, exports.isHomebrewInstalled)())) {
            console.error('Run `brew install ffmpeg` to install ffmpeg');
        }
        else if (os_1.default.platform() === 'win32') {
            console.error('1. Install FFMPEG for Windows here:');
            console.error('https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg#installing-ffmpeg-in-windows');
            console.error('2. Add FFMPEG to your PATH');
            console.error('  a. Go to the settings app.');
            console.error('  b. Click System.');
            console.error('  c. Click About.');
            console.error('  d. Click Advanced system settings.');
            console.error('  e. Click Environment variables.');
            console.error('  f. Search for PATH environemnt variable, click edit and the folder where you installed FFMPEG.');
            console.error('  g. Important: Restart your terminal completely to apply the new PATH.');
            console.error('3. Re-run this command.');
        }
        else {
            console.error('See https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg on how to install FFMPEG.');
        }
        process.exit(1);
    }
};
exports.validateFfmpeg = validateFfmpeg;
//# sourceMappingURL=validate-ffmpeg.js.map