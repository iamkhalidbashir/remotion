"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printHelp = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log_1 = require("./log");
const packagejson = require('../package.json');
const printFlags = (flags) => {
    flags.forEach(([flag, description]) => {
        log_1.Log.info(chalk_1.default.blue(`${flag.padEnd(22, ' ')} ${description}`));
    });
};
const printHelp = () => {
    log_1.Log.info(`@remotion/cli ${packagejson.version} © ${new Date().getFullYear()} Jonny Burger`);
    log_1.Log.info();
    log_1.Log.info('Available commands:');
    log_1.Log.info('');
    log_1.Log.info('remotion preview <index-file.ts>');
    log_1.Log.info(chalk_1.default.gray('Start the preview server.'));
    printFlags([['--props', 'Pass input props as filename or as JSON']]);
    log_1.Log.info();
    log_1.Log.info('remotion render <index-file.ts> <comp-name> <output-file.mp4>');
    log_1.Log.info(chalk_1.default.gray('Render video, audio or an image sequence.'));
    printFlags([
        ['--props', 'Pass input props as filename or as JSON'],
        ['--concurrency', 'How many frames to render in parallel'],
        ['--image-format', 'Format to render the frames in, "jpeg" or "png"'],
        ['--pixel-format', 'Custom pixel format, see docs for available values'],
        ['--config', 'Custom location for a Remotion config file'],
        ['--quality', 'Quality for rendered frames, JPEG only, 0-100'],
        ['--overwrite', 'Overwrite if file exists, default true'],
        ['--sequence', 'Output as an image sequence'],
        ['--codec', 'Video of audio codec'],
        ['--crf', 'FFMPEG CRF value, controls quality, see docs for info'],
        ['--browser-executable', 'Custom path for browser executable'],
        ['--frames', 'Render a portion or a still of a video'],
        ['--bundle-cache', 'Cache webpack bundle, boolean, default true'],
        ['--log', 'Log level, "error", "warning", "verbose", "info" (default)'],
        ['--port', 'Custom port to use for the HTTP server'],
        ['--env-file', 'Specify a location for a dotenv file'],
    ]);
    log_1.Log.info('remotion still <index-file.ts> <comp-name> <still.png>');
    log_1.Log.info(chalk_1.default.gray('Render a still frame and save it as an image.'));
    printFlags([
        ['--frame', 'Which frame to render (default 0)'],
        ['--image-format', 'Format to render the frames in, "jpeg" or "png"'],
        ['--props', 'Pass input props as filename or as JSON'],
        ['--config', 'Custom location for a Remotion config file'],
        ['--quality', 'Quality for rendered frames, JPEG only, 0-100'],
        ['--overwrite', 'Overwrite if file exists, default true'],
        ['--browser-executable', 'Custom path for browser executable'],
        ['--bundle-cache', 'Cache webpack bundle, boolean, default true'],
        ['--log', 'Log level, "error", "warning", "verbose", "info" (default)'],
        ['--port', 'Custom port to use for the HTTP server'],
        ['--env-file', 'Specify a location for a dotenv file'],
    ]);
    log_1.Log.info();
    log_1.Log.info('remotion upgrade');
    log_1.Log.info(chalk_1.default.gray('Ensure Remotion is on the newest version.'));
    log_1.Log.info();
    log_1.Log.info('Visit https://www.remotion.dev/docs/cli for browsable CLI documentation.');
};
exports.printHelp = printHelp;
//# sourceMappingURL=print-help.js.map