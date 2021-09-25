"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopPanel = exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const Canvas_1 = require("./Canvas");
const CompositionSelector_1 = require("./CompositionSelector");
const PreviewToolbar_1 = require("./PreviewToolbar");
const SplitterContainer_1 = require("./Splitter/SplitterContainer");
const SplitterElement_1 = require("./Splitter/SplitterElement");
const SplitterHandle_1 = require("./Splitter/SplitterHandle");
exports.Container = styled_components_1.default.div `
	height: 100%;
	display: flex;
	flex-direction: column;
	flex: 1;
`;
const Row = styled_components_1.default.div `
	display: flex;
	flex-direction: row;
	flex: 1;
`;
const CanvasContainer = styled_components_1.default.div `
	flex: 1;
	display: flex;
`;
const LeftContainer = styled_components_1.default.div `
	display: flex;
`;
const TopPanel = () => {
    return ((0, jsx_runtime_1.jsxs)(exports.Container, { children: [(0, jsx_runtime_1.jsx)(Row, { children: (0, jsx_runtime_1.jsxs)(SplitterContainer_1.SplitterContainer, Object.assign({ minFlex: 0.15, maxFlex: 0.4, defaultFlex: 0.2, id: "sidebar-to-preview", orientation: "vertical" }, { children: [(0, jsx_runtime_1.jsx)(SplitterElement_1.SplitterElement, Object.assign({ type: "flexer" }, { children: (0, jsx_runtime_1.jsx)(LeftContainer, { children: (0, jsx_runtime_1.jsx)(CompositionSelector_1.CompositionSelector, {}, void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(SplitterHandle_1.SplitterHandle, {}, void 0), (0, jsx_runtime_1.jsx)(SplitterElement_1.SplitterElement, Object.assign({ type: "anti-flexer" }, { children: (0, jsx_runtime_1.jsx)(CanvasContainer, { children: (0, jsx_runtime_1.jsx)(Canvas_1.Canvas, {}, void 0) }, void 0) }), void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsx)(PreviewToolbar_1.PreviewToolbar, {}, void 0)] }, void 0));
};
exports.TopPanel = TopPanel;
//# sourceMappingURL=TopPanel.js.map