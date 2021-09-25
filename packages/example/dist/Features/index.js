"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const Features = () => {
    const tray = require('./tray.webm');
    const watermelon = require('./watermelon.webm');
    const textstickers = require('./textstickers.webm');
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        } }, { children: [(0, jsx_runtime_1.jsx)(remotion_1.Video, { src: tray, style: { height: 400, width: 400 } }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Video, { src: textstickers, style: { height: 700, width: 700 } }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Video, { src: watermelon, style: { height: 700, width: 700 } }, void 0)] }), void 0));
};
exports.default = Features;
//# sourceMappingURL=index.js.map