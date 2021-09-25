"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const NestedSequences = () => {
    return ((0, jsx_runtime_1.jsx)(remotion_1.Sequence, Object.assign({ from: 20, durationInFrames: 40 }, { children: (0, jsx_runtime_1.jsx)(NestedTwo, {}, void 0) }), void 0));
};
const NestedTwo = () => {
    return ((0, jsx_runtime_1.jsx)(remotion_1.Sequence, Object.assign({ from: 20, durationInFrames: 60 }, { children: (0, jsx_runtime_1.jsx)(Child, {}, void 0) }), void 0));
};
const Child = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            fontSize: 50,
        } }, { children: frame }), void 0));
};
exports.default = NestedSequences;
//# sourceMappingURL=index.js.map