"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const BetaText_1 = __importDefault(require("./BetaText"));
const ColorInterpolation_1 = require("./ColorInterpolation");
const Framer_1 = require("./Framer");
const MissingImg_1 = require("./MissingImg");
const RemoteVideo_1 = __importDefault(require("./RemoteVideo"));
const SkipZeroFrame_1 = require("./SkipZeroFrame");
const StaggerTesting_1 = require("./StaggerTesting");
const TenFrameTester_1 = require("./TenFrameTester");
const ThreeBasic_1 = __importDefault(require("./ThreeBasic"));
const VideoSpeed_1 = require("./VideoSpeed");
const VideoTesting_1 = require("./VideoTesting");
const HelloWorld_1 = require("./HelloWorld/HelloWorld");
const Index = () => {
    var _a;
    const inputProps = (0, remotion_1.getInputProps)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "HelloWorld", component: HelloWorld_1.HelloWorld, width: 1920, height: 1080, fps: 60, durationInFrames: 60 * 30 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "dynamic-duration", component: VideoTesting_1.VideoTesting, width: 1080, height: 1080, fps: 30, 
                // Change the duration of the video dynamically by passing `--props='{"duration": 100}'`
                durationInFrames: (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps.duration) !== null && _a !== void 0 ? _a : 20 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "nested", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./NestedSequences'))), durationInFrames: 200, fps: 60, height: 1080, width: 1080 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "beta-text", component: BetaText_1.default, width: 1080, height: 1080, fps: 30, durationInFrames: 3 * 30, defaultProps: {
                    word1: (0, remotion_1.getInputProps)().word1,
                } }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "black-gradients", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./BlackGradients'))), width: 1080, height: 1080, fps: 30, durationInFrames: 30 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "features", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./Features'))), width: 1080, height: 1080, fps: 30, durationInFrames: 4 * 30 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "hacker-logo", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./HackerLogo'))), width: 1024, height: 1024, fps: 1, durationInFrames: 1 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "rating", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./NewPackAnnouncement'))), width: 1080, height: 1920, fps: 30, durationInFrames: 7 * 30 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "react-svg", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./ReactSvg'))), width: 1920, height: 1080, fps: 60, durationInFrames: 300, defaultProps: {
                    transparent: true,
                } }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "shadow-circles", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./ShadowCircles'))), width: 1080, height: 1920, fps: 30, durationInFrames: 60 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "stagger-type", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./StaggerType'))), width: 1080, height: 1080, fps: 30, durationInFrames: 45 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "tiles", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./Tiles'))), width: 1080, height: 1920, fps: 30, durationInFrames: 90 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "title", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./Title'))), width: 1080, height: 1920, fps: 30, durationInFrames: 90 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "mdx-test", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./MdxTest'))), width: 1080, height: 1080, fps: 30, durationInFrames: 30 * 30 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "iframe", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./IframeTest'))), width: 1080, height: 1080, fps: 30, durationInFrames: 10 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "gif", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./GifTest'))), width: 1080, height: 1080, fps: 30, durationInFrames: 150 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "missing-img", component: MissingImg_1.MissingImg, width: 1080, height: 1080, fps: 30, durationInFrames: 10 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "audio-testing", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./AudioTesting'))), width: 1080, height: 1080, fps: 30, durationInFrames: 300 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "audio-visualization", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./AudioVisualization'))), width: 1080, height: 1080, fps: 30, durationInFrames: 180 * 30 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "drop-dots", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./DropDots/DropDots'))), width: 1080, height: 1080, fps: 30, durationInFrames: 180 * 30 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "audio-testing-mute", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./AudioTestingMute'))), width: 1080, height: 1080, fps: 30, durationInFrames: 300 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "ten-frame-tester", component: TenFrameTester_1.TenFrameTester, width: 1080, height: 1080, fps: 30, durationInFrames: 10 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "video-testing-mp4", component: VideoTesting_1.VideoTesting, width: 1080, height: 1080, fps: 30, durationInFrames: 100, defaultProps: {
                    codec: 'mp4',
                } }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "video-testing-webm", component: VideoTesting_1.VideoTesting, width: 1080, height: 1080, fps: 30, durationInFrames: 100, defaultProps: {
                    codec: 'webm',
                } }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "framer", component: Framer_1.Framer, width: 1080, height: 1080, fps: 30, durationInFrames: 100 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "remote-video", component: RemoteVideo_1.default, width: 1280, height: 720, fps: 30, durationInFrames: 600 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "three-basic", component: ThreeBasic_1.default, width: 1280, height: 720, fps: 30, durationInFrames: 600 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "color-interpolation", component: ColorInterpolation_1.ColorInterpolation, width: 1280, height: 720, fps: 30, durationInFrames: 100 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "video-speed", component: VideoSpeed_1.VideoSpeed, width: 1280, height: 720, fps: 30, durationInFrames: 100 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "skip-zero-frame", component: SkipZeroFrame_1.SkipZeroFrame, width: 1280, height: 720, fps: 30, durationInFrames: 100 }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "stagger-test", component: StaggerTesting_1.SeriesTesting, width: 1280, height: 720, fps: 30, durationInFrames: 100 }, void 0)] }, void 0));
};
exports.Index = Index;
//# sourceMappingURL=Video.js.map