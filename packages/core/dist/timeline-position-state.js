"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayingState = exports.useTimelineSetFrame = exports.useTimelinePosition = exports.SetTimelineContext = exports.TimelineContext = void 0;
const react_1 = require("react");
exports.TimelineContext = (0, react_1.createContext)({
    frame: 0,
    playing: false,
    rootId: '',
});
exports.SetTimelineContext = (0, react_1.createContext)({
    setFrame: () => {
        throw new Error('default');
    },
    setPlaying: () => {
        throw new Error('default');
    },
});
const useTimelinePosition = () => {
    const state = (0, react_1.useContext)(exports.TimelineContext);
    return state.frame;
};
exports.useTimelinePosition = useTimelinePosition;
const useTimelineSetFrame = () => {
    const { setFrame } = (0, react_1.useContext)(exports.SetTimelineContext);
    return setFrame;
};
exports.useTimelineSetFrame = useTimelineSetFrame;
const usePlayingState = () => {
    const { playing } = (0, react_1.useContext)(exports.TimelineContext);
    const { setPlaying } = (0, react_1.useContext)(exports.SetTimelineContext);
    return [playing, setPlaying];
};
exports.usePlayingState = usePlayingState;
//# sourceMappingURL=timeline-position-state.js.map