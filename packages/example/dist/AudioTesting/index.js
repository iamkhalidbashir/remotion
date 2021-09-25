"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const music_mp3_1 = __importDefault(require("./music.mp3"));
const AudioTesting = () => {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(remotion_1.Sequence, Object.assign({ from: 100, durationInFrames: 100 }, { children: (0, jsx_runtime_1.jsx)(remotion_1.Audio, { startFrom: 100, endAt: 200, src: music_mp3_1.default, volume: (f) => (0, remotion_1.interpolate)(f, [0, 50, 100], [0, 1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                }) }, void 0) }), void 0) }, void 0));
};
exports.default = AudioTesting;
//# sourceMappingURL=index.js.map