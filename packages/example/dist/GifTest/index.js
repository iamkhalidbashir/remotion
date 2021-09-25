"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const gif_1 = require("@remotion/gif");
const GifTest = () => {
    const { width, height } = (0, remotion_1.useVideoConfig)();
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { flex: 1, backgroundColor: 'black' } }, { children: [(0, jsx_runtime_1.jsx)(remotion_1.Sequence, Object.assign({ from: 0, durationInFrames: 50 }, { children: (0, jsx_runtime_1.jsx)(gif_1.Gif, { src: "https://media.giphy.com/media/S9RJG5q2YnWd2nYLZ3/giphy.gif", width: width, height: height, fit: "fill" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(remotion_1.Sequence, Object.assign({ from: 50, durationInFrames: 50 }, { children: (0, jsx_runtime_1.jsx)(gif_1.Gif, { src: "https://media.giphy.com/media/xT0GqH01ZyKwd3aT3G/giphy.gif", width: width, height: height, fit: "cover" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(remotion_1.Sequence, Object.assign({ from: 100, durationInFrames: 50 }, { children: (0, jsx_runtime_1.jsx)(gif_1.Gif, { src: "https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif", width: width, height: height, fit: "contain" }, void 0) }), void 0)] }), void 0));
};
exports.default = GifTest;
//# sourceMappingURL=index.js.map