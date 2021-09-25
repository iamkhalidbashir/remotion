"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const hmm_mdx_1 = __importDefault(require("./hmm.mdx"));
const MdxTest = () => {
    return ((0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, Object.assign({ style: {
            backgroundColor: 'white',
            fontSize: 40,
            fontFamily: 'Helvetica',
            padding: 30,
        } }, { children: (0, jsx_runtime_1.jsx)(hmm_mdx_1.default, {}, void 0) }), void 0));
};
exports.default = MdxTest;
//# sourceMappingURL=index.js.map