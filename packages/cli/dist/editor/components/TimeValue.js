"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeValue = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const is_current_selected_still_1 = require("../helpers/is-current-selected-still");
const render_frame_1 = require("../state/render-frame");
const Text = styled_components_1.default.div `
	color: white;
	font-size: 16px;
	font-family: Helvetica, Arial, sans-serif;
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-variant-numeric: tabular-nums;
	line-height: 1;
`;
const Time = styled_components_1.default.div `
	display: inline-block;
`;
const Frame = styled_components_1.default.span `
	color: #ccc;
	font-size: 10px;
	font-weight: 500;
`;
const TimeValue = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const config = remotion_1.Internals.useUnsafeVideoConfig();
    const isStill = (0, is_current_selected_still_1.useIsStill)();
    if (!config) {
        return null;
    }
    if (isStill) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(Text, { children: [(0, jsx_runtime_1.jsx)(Time, { children: (0, render_frame_1.renderFrame)(frame, config.fps) }, void 0), ' ', (0, jsx_runtime_1.jsxs)(Frame, { children: [frame, " ", (0, jsx_runtime_1.jsxs)("span", { children: ["(", config.fps, " fps)"] }, void 0)] }, void 0)] }, void 0));
};
exports.TimeValue = TimeValue;
//# sourceMappingURL=TimeValue.js.map