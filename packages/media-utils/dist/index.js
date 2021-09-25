"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizeAudio = exports.useAudioData = exports.getWaveformPortion = exports.getVideoMetadata = exports.getAudioDuration = exports.getAudioData = void 0;
var get_audio_data_1 = require("./get-audio-data");
Object.defineProperty(exports, "getAudioData", { enumerable: true, get: function () { return get_audio_data_1.getAudioData; } });
var get_audio_duration_1 = require("./get-audio-duration");
Object.defineProperty(exports, "getAudioDuration", { enumerable: true, get: function () { return get_audio_duration_1.getAudioDuration; } });
var get_video_metadata_1 = require("./get-video-metadata");
Object.defineProperty(exports, "getVideoMetadata", { enumerable: true, get: function () { return get_video_metadata_1.getVideoMetadata; } });
var get_waveform_portion_1 = require("./get-waveform-portion");
Object.defineProperty(exports, "getWaveformPortion", { enumerable: true, get: function () { return get_waveform_portion_1.getWaveformPortion; } });
__exportStar(require("./types"), exports);
var use_audio_metadata_1 = require("./use-audio-metadata");
Object.defineProperty(exports, "useAudioData", { enumerable: true, get: function () { return use_audio_metadata_1.useAudioData; } });
var visualize_audio_1 = require("./visualize-audio");
Object.defineProperty(exports, "visualizeAudio", { enumerable: true, get: function () { return visualize_audio_1.visualizeAudio; } });
//# sourceMappingURL=index.js.map