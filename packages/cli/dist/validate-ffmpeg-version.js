"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndValidateFfmpegVersion = void 0;
const renderer_1 = require("@remotion/renderer");
const log_1 = require("./log");
const warn_about_ffmpeg_version_1 = require("./warn-about-ffmpeg-version");
const checkAndValidateFfmpegVersion = async () => {
    const ffmpegVersion = await renderer_1.RenderInternals.getFfmpegVersion();
    const buildConf = await renderer_1.RenderInternals.getFfmpegBuildInfo();
    log_1.Log.verbose('Your FFMPEG version:', ffmpegVersion ? ffmpegVersion.join('.') : 'Built from source');
    (0, warn_about_ffmpeg_version_1.warnAboutFfmpegVersion)({ ffmpegVersion, buildConf });
};
exports.checkAndValidateFfmpegVersion = checkAndValidateFfmpegVersion;
//# sourceMappingURL=validate-ffmpeg-version.js.map