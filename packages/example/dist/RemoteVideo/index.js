"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const RemoteVideo = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const ref = (0, react_1.useRef)(null);
    return ((0, jsx_runtime_1.jsx)(remotion_1.Video, { ref: ref, volume: (0, remotion_1.interpolate)(frame, [0, 500], [1, 0], { extrapolateRight: 'clamp' }), src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }, void 0));
};
exports.default = RemoteVideo;
//# sourceMappingURL=index.js.map