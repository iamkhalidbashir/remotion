"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStitchingProgress = exports.makeRenderingProgress = exports.makeBundlingProgress = exports.makeProgressBar = exports.createProgressBar = void 0;
// @ts-expect-error
const ansi_diff_1 = __importDefault(require("ansi-diff"));
const chalk_1 = __importDefault(require("chalk"));
const remotion_1 = require("remotion");
const createProgressBar = () => {
    if (!remotion_1.Internals.Logging.isEqualOrBelowLogLevel('info')) {
        return { update: () => false };
    }
    const diff = (0, ansi_diff_1.default)();
    process.stdout.write('');
    return {
        update: (up) => process.stdout.write(diff.update(up)),
    };
};
exports.createProgressBar = createProgressBar;
const makeProgressBar = (percentage) => {
    const totalBars = 20;
    const barsToShow = Math.floor(percentage * totalBars);
    return `[${'='.repeat(barsToShow).padEnd(totalBars, ' ')}]`;
};
exports.makeProgressBar = makeProgressBar;
const makeBundlingProgress = ({ progress, steps, doneIn, }) => [
    '📦',
    `(1/${steps})`,
    (0, exports.makeProgressBar)(progress),
    `${doneIn ? 'Bundled' : 'Bundling'} code`,
    doneIn === null
        ? (progress * 100).toFixed(0) + '%'
        : chalk_1.default.gray(`${doneIn}ms`),
].join(' ');
exports.makeBundlingProgress = makeBundlingProgress;
const makeRenderingProgress = ({ frames, totalFrames, encodedFrames, steps, concurrency, doneIn, }) => {
    const progress = frames / totalFrames;
    return [
        '🖼 ',
        `(2/${steps})`,
        (0, exports.makeProgressBar)(progress),
        `${doneIn ? 'Rendered' : 'Rendering'}${encodedFrames === undefined
            ? ''
            : ` and ${doneIn ? 'Encoded' : 'Encoding'}`} frames (${concurrency}x)`,
        doneIn === null
            ? `${encodedFrames === undefined ? '' : `${encodedFrames}/`}${frames}/${totalFrames}`
            : chalk_1.default.gray(`${doneIn}ms`),
    ].join(' ');
};
exports.makeRenderingProgress = makeRenderingProgress;
const makeStitchingProgress = ({ frames, totalFrames, steps, doneIn, parallelEncoding, }) => {
    const progress = frames / totalFrames;
    return [
        '🎞 ',
        `(3/${steps})`,
        (0, exports.makeProgressBar)(progress),
        parallelEncoding
            ? `${doneIn ? 'Muxed' : 'Muxing'} audio`
            : `${doneIn ? 'Encoded' : 'Encoding'} video`,
        doneIn === null ? `${frames}/${totalFrames}` : chalk_1.default.gray(`${doneIn}ms`),
    ].join(' ');
};
exports.makeStitchingProgress = makeStitchingProgress;
//# sourceMappingURL=progress-bar.js.map