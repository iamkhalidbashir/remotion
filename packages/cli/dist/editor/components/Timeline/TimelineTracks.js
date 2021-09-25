"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineTracks = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const timeline_layout_1 = require("../../helpers/timeline-layout");
const is_collapsed_1 = require("./is-collapsed");
const MaxTimelineTracks_1 = require("./MaxTimelineTracks");
const TimelineSequence_1 = require("./TimelineSequence");
const Content = styled_components_1.default.div `
	padding-left: ${timeline_layout_1.TIMELINE_PADDING}px;
	padding-right: ${timeline_layout_1.TIMELINE_PADDING}px;
`;
const TimelineContent = styled_components_1.default.div `
	flex: 1;
	background-color: #111111;
	width: 100%;
`;
const TimelineTracks = ({ timeline, fps, viewState, hasBeenCut }) => {
    const inner = (0, react_1.useMemo)(() => {
        return {
            height: timeline_layout_1.TIMELINE_LAYER_HEIGHT + timeline_layout_1.TIMELINE_BORDER * 2,
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(TimelineContent, { children: [(0, jsx_runtime_1.jsx)(Content, { children: timeline.map((track) => {
                    if ((0, is_collapsed_1.isTrackHidden)(track, timeline, viewState)) {
                        return null;
                    }
                    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: inner }, { children: (0, jsx_runtime_1.jsx)(TimelineSequence_1.TimelineSequence, { fps: fps, s: track.sequence }, void 0) }), track.sequence.id));
                }) }, void 0), hasBeenCut ? (0, jsx_runtime_1.jsx)(MaxTimelineTracks_1.MaxTimelineTracksReached, {}, void 0) : null] }, void 0));
};
exports.TimelineTracks = TimelineTracks;
//# sourceMappingURL=TimelineTracks.js.map