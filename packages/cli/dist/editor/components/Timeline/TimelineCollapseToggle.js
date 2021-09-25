"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineCollapseToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
	height: 10px;
	width: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Icon = (props) => {
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ viewBox: "0 0 8 10" }, props, { style: { height: 10, width: 8 } }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M 0 0 L 8 5 L 0 10 z", fill: "#ddd" }, void 0) }), void 0));
};
const TimelineCollapseToggle = ({ collapsed }) => {
    return ((0, jsx_runtime_1.jsx)(Container, Object.assign({ style: collapsed ? {} : { transform: 'rotate(90deg)' } }, { children: (0, jsx_runtime_1.jsx)(Icon, {}, void 0) }), void 0));
};
exports.TimelineCollapseToggle = TimelineCollapseToggle;
//# sourceMappingURL=TimelineCollapseToggle.js.map