"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentComposition = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const is_composition_still_1 = require("../helpers/is-composition-still");
const render_frame_1 = require("../state/render-frame");
const rich_timeline_1 = require("../state/rich-timeline");
const Thumbnail_1 = require("./Thumbnail");
const Container = styled_components_1.default.div `
	min-height: 100px;
	display: block;
	border-bottom: 1px solid black;
	padding: 16px;
	color: white;
	line-height: 18px;
`;
const Title = styled_components_1.default.div `
	font-weight: bold;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
`;
const Subtitle = styled_components_1.default.div `
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	opacity: 0.8;
`;
const Row = styled_components_1.default.div `
	display: flex;
	flex-direction: row;
`;
const Space = styled_components_1.default.div `
	width: 12px;
`;
const targetHeight = 60;
const targetWidth = (targetHeight * 16) / 9;
const CurrentComposition = () => {
    const richTimelineContext = (0, react_1.useContext)(rich_timeline_1.RichTimelineContext);
    const video = remotion_1.Internals.useVideo();
    if (!video) {
        return (0, jsx_runtime_1.jsx)(Container, {}, void 0);
    }
    const frameToDisplay = Math.floor(video.durationInFrames / 2);
    return ((0, jsx_runtime_1.jsx)(Container, { children: (0, jsx_runtime_1.jsxs)(Row, { children: [richTimelineContext.richTimeline ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Thumbnail_1.Thumbnail, { composition: video, targetHeight: targetHeight, targetWidth: targetWidth, frameToDisplay: frameToDisplay }, void 0), (0, jsx_runtime_1.jsx)(Space, {}, void 0)] }, void 0)) : null, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Title, { children: video.id }, void 0), (0, jsx_runtime_1.jsxs)(Subtitle, { children: [video.width, "x", video.height, (0, is_composition_still_1.isCompositionStill)(video) ? null : `, ${video.fps} FPS`] }, void 0), (0, is_composition_still_1.isCompositionStill)(video) ? ((0, jsx_runtime_1.jsx)(Subtitle, { children: "Still" }, void 0)) : ((0, jsx_runtime_1.jsxs)(Subtitle, { children: ["Duration ", (0, render_frame_1.renderFrame)(video.durationInFrames, video.fps)] }, void 0))] }, void 0)] }, void 0) }, void 0));
};
exports.CurrentComposition = CurrentComposition;
//# sourceMappingURL=CurrentComposition.js.map