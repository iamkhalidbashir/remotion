"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const checkerboard_1 = require("../state/checkerboard");
const preview_size_1 = require("../state/preview-size");
const rich_timeline_1 = require("../state/rich-timeline");
const EditorContent_1 = require("./EditorContent");
const FramePersistor_1 = require("./FramePersistor");
const UpdateCheck_1 = require("./UpdateCheck");
const Background = styled_components_1.default.div `
	background: #222;
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	position: absolute;
`;
const Root = remotion_1.Internals.getRoot();
const Editor = () => {
    const [emitter] = (0, react_1.useState)(() => new player_1.PlayerInternals.PlayerEmitter());
    const [size, setSize] = (0, react_1.useState)(() => (0, preview_size_1.loadPreviewSizeOption)());
    const [checkerboard, setCheckerboard] = (0, react_1.useState)(() => (0, checkerboard_1.loadCheckerboardOption)());
    const [richTimeline, setRichTimeline] = (0, react_1.useState)(() => (0, rich_timeline_1.loadRichTimelineOption)());
    const [mediaMuted, setMediaMuted] = (0, react_1.useState)(false);
    const [mediaVolume, setMediaVolume] = (0, react_1.useState)(1);
    const previewSizeCtx = (0, react_1.useMemo)(() => {
        return {
            size,
            setSize,
        };
    }, [size]);
    const checkerboardCtx = (0, react_1.useMemo)(() => {
        return {
            checkerboard,
            setCheckerboard,
        };
    }, [checkerboard]);
    const richTimelineCtx = (0, react_1.useMemo)(() => {
        return {
            richTimeline,
            setRichTimeline,
        };
    }, [richTimeline]);
    const mediaVolumeContextValue = (0, react_1.useMemo)(() => {
        return {
            mediaMuted,
            mediaVolume,
        };
    }, [mediaMuted, mediaVolume]);
    const setMediaVolumeContextValue = (0, react_1.useMemo)(() => {
        return {
            setMediaMuted,
            setMediaVolume,
        };
    }, []);
    if (!Root) {
        throw new Error('Root has not been registered. ');
    }
    return ((0, jsx_runtime_1.jsx)(rich_timeline_1.RichTimelineContext.Provider, Object.assign({ value: richTimelineCtx }, { children: (0, jsx_runtime_1.jsx)(checkerboard_1.CheckerboardContext.Provider, Object.assign({ value: checkerboardCtx }, { children: (0, jsx_runtime_1.jsx)(preview_size_1.PreviewSizeContext.Provider, Object.assign({ value: previewSizeCtx }, { children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.MediaVolumeContext.Provider, Object.assign({ value: mediaVolumeContextValue }, { children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.SetMediaVolumeContext.Provider, Object.assign({ value: setMediaVolumeContextValue }, { children: (0, jsx_runtime_1.jsx)(player_1.PlayerInternals.PlayerEventEmitterContext.Provider, Object.assign({ value: emitter }, { children: (0, jsx_runtime_1.jsxs)(Background, { children: [(0, jsx_runtime_1.jsx)(Root, {}, void 0), (0, jsx_runtime_1.jsx)(UpdateCheck_1.UpdateCheck, {}, void 0), (0, jsx_runtime_1.jsx)(FramePersistor_1.FramePersistor, {}, void 0), (0, jsx_runtime_1.jsx)(EditorContent_1.EditorContent, {}, void 0)] }, void 0) }), void 0) }), void 0) }), void 0) }), void 0) }), void 0) }), void 0));
};
exports.Editor = Editor;
//# sourceMappingURL=Editor.js.map