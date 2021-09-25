"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineDragHandler = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const timeline_layout_1 = require("../../helpers/timeline-layout");
const FramePersistor_1 = require("../FramePersistor");
const timeline_refs_1 = require("./timeline-refs");
const Container = styled_components_1.default.div `
	user-select: none;
	overflow: hidden;
	position: absolute;
	width: 100%;
	height: 100%;
`;
const Inner = styled_components_1.default.div `
	overflow-y: auto;
	overflow-x: hidden;
`;
const getFrameFromX = (clientX, durationInFrames, width) => {
    var _a;
    const pos = clientX - timeline_layout_1.TIMELINE_PADDING;
    const frame = Math.round((0, remotion_1.interpolate)(pos, [0, width - timeline_layout_1.TIMELINE_PADDING * 2], [0, (_a = durationInFrames - 1) !== null && _a !== void 0 ? _a : 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    }));
    return frame;
};
const TimelineDragHandler = ({ children }) => {
    var _a, _b;
    const size = player_1.PlayerInternals.useElementSize(timeline_refs_1.sliderAreaRef, {
        triggerOnWindowResize: true,
    });
    const width = (_a = size === null || size === void 0 ? void 0 : size.width) !== null && _a !== void 0 ? _a : 0;
    const left = (_b = size === null || size === void 0 ? void 0 : size.left) !== null && _b !== void 0 ? _b : 0;
    const [dragging, setDragging] = (0, react_1.useState)({
        dragging: false,
    });
    const { playing, play, pause, seek } = player_1.PlayerInternals.usePlayer();
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const onPointerDown = (0, react_1.useCallback)((e) => {
        if (!videoConfig) {
            return;
        }
        const frame = getFrameFromX(e.clientX - left, videoConfig.durationInFrames, width);
        seek(frame);
        setDragging({
            dragging: true,
            wasPlaying: playing,
        });
        pause();
    }, [pause, playing, seek, left, videoConfig, width]);
    const onPointerMove = (0, react_1.useCallback)((e) => {
        if (!dragging.dragging) {
            return;
        }
        if (!videoConfig) {
            return;
        }
        const frame = getFrameFromX(e.clientX - left, videoConfig.durationInFrames, width);
        seek(frame);
    }, [dragging.dragging, seek, left, videoConfig, width]);
    const onPointerUp = (0, react_1.useCallback)((e) => {
        setDragging({
            dragging: false,
        });
        if (!dragging.dragging) {
            return;
        }
        if (!videoConfig) {
            return;
        }
        const frame = getFrameFromX(e.clientX - left, videoConfig.durationInFrames, width);
        (0, FramePersistor_1.persistCurrentFrame)(frame);
        if (dragging.wasPlaying) {
            play();
        }
    }, [dragging, left, play, videoConfig, width]);
    (0, react_1.useEffect)(() => {
        if (!dragging.dragging) {
            return;
        }
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, [dragging.dragging, onPointerMove, onPointerUp]);
    return ((0, jsx_runtime_1.jsx)(Container, Object.assign({ ref: timeline_refs_1.sliderAreaRef, onPointerDown: onPointerDown }, { children: (0, jsx_runtime_1.jsx)(Inner, { children: children }, void 0) }), void 0));
};
exports.TimelineDragHandler = TimelineDragHandler;
//# sourceMappingURL=TimelineDragHandler.js.map