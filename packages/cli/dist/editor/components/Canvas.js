"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const Preview_1 = require("./Preview");
exports.Container = styled_components_1.default.div `
	flex: 1;
	display: flex;
	overflow: hidden;
	position: relative;
`;
const Canvas = () => {
    const ref = (0, react_1.useRef)(null);
    const size = player_1.PlayerInternals.useElementSize(ref, {
        triggerOnWindowResize: false,
    });
    return ((0, jsx_runtime_1.jsx)(exports.Container, Object.assign({ ref: ref }, { children: size ? (0, jsx_runtime_1.jsx)(Preview_1.VideoPreview, { canvasSize: size }, void 0) : null }), void 0));
};
exports.Canvas = Canvas;
//# sourceMappingURL=Canvas.js.map