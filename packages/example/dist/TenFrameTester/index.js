"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenFrameTester = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactSvg_1 = __importDefault(require("../ReactSvg"));
// Short video that is fast to render for testing
const TenFrameTester = () => (0, jsx_runtime_1.jsx)(ReactSvg_1.default, { transparent: false }, void 0);
exports.TenFrameTester = TenFrameTester;
//# sourceMappingURL=index.js.map