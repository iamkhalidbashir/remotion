"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPreview = exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const checkerboard_background_1 = require("../helpers/checkerboard-background");
const checkerboard_1 = require("../state/checkerboard");
const preview_size_1 = require("../state/preview-size");
const checkerboardSize = 49;
exports.Container = styled_components_1.default.div `
	transform: scale(${(props) => props.scale});
	margin-left: ${(props) => props.xCorrection}px;
	margin-top: ${(props) => props.yCorrection}px;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	display: flex;
	position: absolute;
	background-color: ${(props) => (0, checkerboard_background_1.checkerboardBackgroundColor)(props.checkerboard)};
	background-image: ${(props) => (0, checkerboard_background_1.checkerboardBackgroundImage)(props.checkerboard)};
	background-size: ${(0, checkerboard_background_1.getCheckerboardBackgroundSize)(checkerboardSize)}; /* Must be a square */
	background-position: ${(0, checkerboard_background_1.getCheckerboardBackgroundPos)(checkerboardSize)}; /* Must be half of one side of the square */
`;
const Inner = ({ canvasSize }) => {
    var _a;
    const { size: previewSize } = (0, react_1.useContext)(preview_size_1.PreviewSizeContext);
    const video = remotion_1.Internals.useVideo();
    const config = (0, remotion_1.useVideoConfig)();
    const { checkerboard } = (0, react_1.useContext)(checkerboard_1.CheckerboardContext);
    const { centerX, centerY, yCorrection, xCorrection, scale, } = player_1.PlayerInternals.calculateScale({
        canvasSize,
        compositionHeight: config.height,
        compositionWidth: config.width,
        previewSize,
    });
    const outer = (0, react_1.useMemo)(() => {
        return {
            width: config.width * scale,
            height: config.height * scale,
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: centerX,
            top: centerY,
            overflow: 'hidden',
        };
    }, [centerX, centerY, config.height, config.width, scale]);
    const Component = video ? video.component : null;
    const inputProps = (0, remotion_1.getInputProps)();
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, Object.assign({ fallback: (0, jsx_runtime_1.jsx)("div", { children: "loading..." }, void 0) }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ style: outer }, { children: (0, jsx_runtime_1.jsx)(exports.Container, Object.assign({}, {
                checkerboard,
                scale,
                xCorrection,
                yCorrection,
                width: config.width,
                height: config.height,
            }, { children: Component ? ((0, jsx_runtime_1.jsx)(Component, Object.assign({}, ((_a = video === null || video === void 0 ? void 0 : video.props) !== null && _a !== void 0 ? _a : {}), inputProps), void 0)) : null }), void 0) }), void 0) }), void 0));
};
const VideoPreview = ({ canvasSize }) => {
    const config = remotion_1.Internals.useUnsafeVideoConfig();
    if (!config) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(Inner, { canvasSize: canvasSize }, void 0);
};
exports.VideoPreview = VideoPreview;
//# sourceMappingURL=Preview.js.map