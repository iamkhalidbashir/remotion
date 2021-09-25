"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderInternals = exports.stitchFramesToVideo = exports.renderStill = exports.renderFrames = exports.getCompositions = void 0;
const ffmpeg_flags_1 = require("./ffmpeg-flags");
const get_concurrency_1 = require("./get-concurrency");
const get_local_browser_executable_1 = require("./get-local-browser-executable");
const open_browser_1 = require("./open-browser");
const validate_even_dimensions_with_codec_1 = require("./validate-even-dimensions-with-codec");
const validate_ffmpeg_1 = require("./validate-ffmpeg");
var get_compositions_1 = require("./get-compositions");
Object.defineProperty(exports, "getCompositions", { enumerable: true, get: function () { return get_compositions_1.getCompositions; } });
var render_1 = require("./render");
Object.defineProperty(exports, "renderFrames", { enumerable: true, get: function () { return render_1.renderFrames; } });
var render_still_1 = require("./render-still");
Object.defineProperty(exports, "renderStill", { enumerable: true, get: function () { return render_still_1.renderStill; } });
var stitcher_1 = require("./stitcher");
Object.defineProperty(exports, "stitchFramesToVideo", { enumerable: true, get: function () { return stitcher_1.stitchFramesToVideo; } });
exports.RenderInternals = {
    ensureLocalBrowser: get_local_browser_executable_1.ensureLocalBrowser,
    ffmpegHasFeature: ffmpeg_flags_1.ffmpegHasFeature,
    getActualConcurrency: get_concurrency_1.getActualConcurrency,
    getFfmpegVersion: ffmpeg_flags_1.getFfmpegVersion,
    openBrowser: open_browser_1.openBrowser,
    validateFfmpeg: validate_ffmpeg_1.validateFfmpeg,
    binaryExists: validate_ffmpeg_1.binaryExists,
    getFfmpegBuildInfo: ffmpeg_flags_1.getFfmpegBuildInfo,
    validateEvenDimensionsWithCodec: validate_even_dimensions_with_codec_1.validateEvenDimensionsWithCodec,
};
//# sourceMappingURL=index.js.map