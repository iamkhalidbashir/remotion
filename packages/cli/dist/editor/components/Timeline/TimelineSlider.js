"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineSlider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const timeline_layout_1 = require("../../helpers/timeline-layout");
const timeline_refs_1 = require("./timeline-refs");
const TimelineSliderHandle_1 = require("./TimelineSliderHandle");
const Container = styled_components_1.default.div `
	position: absolute;
	bottom: 0;
	top: 0;
`;
const Line = styled_components_1.default.div `
	height: 100%;
	width: 1px;
	position: fixed;
	background-color: #f02c00;
`;
const TimelineSlider = () => {
    var _a;
    const timelinePosition = remotion_1.Internals.Timeline.useTimelinePosition();
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const size = player_1.PlayerInternals.useElementSize(timeline_refs_1.sliderAreaRef, {
        triggerOnWindowResize: false,
    });
    const width = (_a = size === null || size === void 0 ? void 0 : size.width) !== null && _a !== void 0 ? _a : 0;
    if (!videoConfig) {
        return null;
    }
    const left = (timelinePosition / (videoConfig.durationInFrames - 1)) *
        (width - timeline_layout_1.TIMELINE_PADDING * 2) +
        timeline_layout_1.TIMELINE_PADDING;
    return ((0, jsx_runtime_1.jsx)(Container, Object.assign({ style: { transform: `translateX(${left}px)` } }, { children: (0, jsx_runtime_1.jsx)(Line, { children: (0, jsx_runtime_1.jsx)(TimelineSliderHandle_1.TimelineSliderHandle, {}, void 0) }, void 0) }), void 0));
};
exports.TimelineSlider = TimelineSlider;
//# sourceMappingURL=TimelineSlider.js.map