"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxTimelineTracksReached = exports.MAX_TIMELINE_TRACKS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const timeline_layout_1 = require("../../helpers/timeline-layout");
exports.MAX_TIMELINE_TRACKS = typeof process.env.MAX_TIMELINE_TRACKS === 'undefined'
    ? 15
    : Number(process.env.MAX_TIMELINE_TRACKS);
const Container = styled_components_1.default.div `
	padding-top: 6px;
	padding-bottom: 6px;
	color: rgba(255, 255, 255, 0.6);
	font-family: sans-serif;
	font-size: 12px;
	background-color: rgba(255, 255, 255, 0.1);
	padding-left: ${timeline_layout_1.TIMELINE_PADDING + 5}px;
`;
const MaxTimelineTracksReached = () => {
    return ((0, jsx_runtime_1.jsxs)(Container, { children: ["Limited display to ", exports.MAX_TIMELINE_TRACKS, " tracks to sustain performance.", '', "You can change this by setting Config.Preview.setMaxTimelineTracks() in your remotion.config.ts file."] }, void 0));
};
exports.MaxTimelineTracksReached = MaxTimelineTracksReached;
//# sourceMappingURL=MaxTimelineTracks.js.map