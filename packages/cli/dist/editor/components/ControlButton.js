"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlButton = exports.CONTROL_BUTTON_PADDING = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.CONTROL_BUTTON_PADDING = 6;
exports.ControlButton = styled_components_1.default.button `
	opacity: ${(p) => (p.disabled ? 0.5 : 1)};
	display: inline-flex;
	background: none;
	border: none;
	padding: ${exports.CONTROL_BUTTON_PADDING}px;
`;
//# sourceMappingURL=ControlButton.js.map