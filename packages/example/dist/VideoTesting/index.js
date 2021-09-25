"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoTesting = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const framer_mp4_1 = __importDefault(require("./framer.mp4"));
const framer_webm_1 = __importDefault(require("./framer.webm"));
const VideoTesting = ({ codec }) => {
    const { durationInFrames } = (0, remotion_1.useVideoConfig)();
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(remotion_1.Sequence, Object.assign({ from: 0, durationInFrames: durationInFrames }, { children: (0, jsx_runtime_1.jsx)(remotion_1.Video, { src: codec === 'mp4' ? framer_mp4_1.default : framer_webm_1.default }, void 0) }), void 0) }, void 0));
};
exports.VideoTesting = VideoTesting;
//# sourceMappingURL=index.js.map