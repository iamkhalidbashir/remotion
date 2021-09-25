"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgBlob = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const SvgBlob = ({ style, gradient, d }) => {
    const [id] = (0, react_1.useState)(() => (0, remotion_1.random)(null));
    return ((0, jsx_runtime_1.jsxs)("svg", Object.assign({ viewBox: "0 0 200 200", xmlns: "http://www.w3.org/2000/svg", style: style }, { children: [(0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsxs)("linearGradient", Object.assign({ id: String(id), gradientTransform: "rotate(90)" }, { children: [(0, jsx_runtime_1.jsx)("stop", { offset: "5%", stopColor: gradient[0] }, void 0), (0, jsx_runtime_1.jsx)("stop", { offset: "95%", stopColor: gradient[1] }, void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("path", { fill: `url(#${id})`, d: d, transform: "translate(100 100)" }, void 0)] }), void 0));
};
exports.SvgBlob = SvgBlob;
//# sourceMappingURL=Blob.js.map