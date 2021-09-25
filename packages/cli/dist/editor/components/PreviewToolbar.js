"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const timeline_layout_1 = require("../helpers/timeline-layout");
const CheckboardToggle_1 = require("./CheckboardToggle");
const FpsCounter_1 = require("./FpsCounter");
const PlayPause_1 = require("./PlayPause");
const RichTimelineToggle_1 = require("./RichTimelineToggle");
const SizeSelector_1 = require("./SizeSelector");
const TimeValue_1 = require("./TimeValue");
const Container = styled_components_1.default.div `
	display: flex;
	justify-content: center;
	border-top: 1px solid rgba(0, 0, 0, 0.5);
	padding-top: 2px;
	padding-bottom: 2px;
	align-items: center;
	flex-direction: row;
`;
const SideContainer = styled_components_1.default.div `
	width: 300px;
	height: 38px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const Flex = styled_components_1.default.div `
	flex: 1;
`;
const Padding = styled_components_1.default.div `
	width: ${timeline_layout_1.TIMELINE_PADDING}px;
`;
const PreviewToolbar = () => {
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsxs)(SideContainer, { children: [(0, jsx_runtime_1.jsx)(Padding, {}, void 0), (0, jsx_runtime_1.jsx)(TimeValue_1.TimeValue, {}, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Flex, {}, void 0), (0, jsx_runtime_1.jsx)(SizeSelector_1.SizeSelector, {}, void 0), (0, jsx_runtime_1.jsx)(PlayPause_1.PlayPause, {}, void 0), (0, jsx_runtime_1.jsx)(CheckboardToggle_1.CheckboardToggle, {}, void 0), (0, jsx_runtime_1.jsx)(RichTimelineToggle_1.RichTimelineToggle, {}, void 0), (0, jsx_runtime_1.jsx)(Flex, {}, void 0), (0, jsx_runtime_1.jsxs)(SideContainer, { children: [(0, jsx_runtime_1.jsx)(Flex, {}, void 0), (0, jsx_runtime_1.jsx)(FpsCounter_1.FpsCounter, {}, void 0), (0, jsx_runtime_1.jsx)(Padding, {}, void 0)] }, void 0)] }, void 0));
};
exports.PreviewToolbar = PreviewToolbar;
//# sourceMappingURL=PreviewToolbar.js.map