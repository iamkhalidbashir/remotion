"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorld = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
require("./index.css");
const HelloWorld = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: 'scene', style: { flex: 1, backgroundColor: 'gray' } }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: 'hello', style: { transform: `translate(${frame % 300 - 150}px,${frame / 300}px)` } }, { children: "Hello World!" }), void 0) }), void 0));
};
exports.HelloWorld = HelloWorld;
//# sourceMappingURL=HelloWorld.js.map