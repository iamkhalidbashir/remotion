"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoForRendering = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const absolute_src_1 = require("../absolute-src");
const use_audio_frame_1 = require("../audio/use-audio-frame");
const CompositionManager_1 = require("../CompositionManager");
const is_approximately_the_same_1 = require("../is-approximately-the-same");
const is_remote_asset_1 = require("../is-remote-asset");
const random_1 = require("../random");
const ready_manager_1 = require("../ready-manager");
const sequencing_1 = require("../sequencing");
const use_frame_1 = require("../use-frame");
const use_unsafe_video_config_1 = require("../use-unsafe-video-config");
const volume_prop_1 = require("../volume-prop");
const get_current_time_1 = require("./get-current-time");
const VideoForRenderingForwardFunction = ({ onError, volume: volumeProp, playbackRate, ...props }, ref) => {
    const absoluteFrame = (0, use_frame_1.useAbsoluteCurrentFrame)();
    const frame = (0, use_frame_1.useCurrentFrame)();
    const volumePropsFrame = (0, use_audio_frame_1.useFrameForVolumeProp)();
    const videoConfig = (0, use_unsafe_video_config_1.useUnsafeVideoConfig)();
    const videoRef = (0, react_1.useRef)(null);
    const sequenceContext = (0, react_1.useContext)(sequencing_1.SequenceContext);
    const mediaStartsAt = (0, use_audio_frame_1.useMediaStartsAt)();
    const { registerAsset, unregisterAsset } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    // Generate a string that's as unique as possible for this asset
    // but at the same time the same on all threads
    const id = (0, react_1.useMemo)(() => {
        var _a;
        return `audio-${(0, random_1.random)((_a = props.src) !== null && _a !== void 0 ? _a : '')}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}-muted:${props.muted}`;
    }, [
        props.src,
        props.muted,
        sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom,
        sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom,
        sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames,
    ]);
    if (!videoConfig) {
        throw new Error('No video config found');
    }
    const volume = (0, volume_prop_1.evaluateVolume)({
        volume: volumeProp,
        frame: volumePropsFrame,
        mediaVolume: 1,
    });
    (0, react_1.useEffect)(() => {
        if (!props.src) {
            throw new Error('No src passed');
        }
        if (props.muted) {
            return;
        }
        registerAsset({
            type: 'video',
            src: (0, absolute_src_1.getAbsoluteSrc)(props.src),
            id,
            frame: absoluteFrame,
            volume,
            isRemote: (0, is_remote_asset_1.isRemoteAsset)((0, absolute_src_1.getAbsoluteSrc)(props.src)),
            mediaFrame: frame,
            playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
        });
        return () => unregisterAsset(id);
    }, [
        props.muted,
        props.src,
        registerAsset,
        id,
        unregisterAsset,
        volume,
        frame,
        absoluteFrame,
        playbackRate,
    ]);
    (0, react_1.useImperativeHandle)(ref, () => {
        return videoRef.current;
    });
    (0, react_1.useEffect)(() => {
        if (!videoRef.current) {
            return;
        }
        const currentTime = (() => {
            return (0, get_current_time_1.getMediaTime)({
                fps: videoConfig.fps,
                frame,
                src: props.src,
                playbackRate: playbackRate || 1,
                startFrom: -mediaStartsAt,
            });
        })();
        const handle = (0, ready_manager_1.delayRender)();
        if (process.env.NODE_ENV === 'test') {
            (0, ready_manager_1.continueRender)(handle);
            return;
        }
        if ((0, is_approximately_the_same_1.isApproximatelyTheSame)(videoRef.current.currentTime, currentTime)) {
            if (videoRef.current.readyState >= 2) {
                (0, ready_manager_1.continueRender)(handle);
                return;
            }
            videoRef.current.addEventListener('loadeddata', () => {
                (0, ready_manager_1.continueRender)(handle);
            }, { once: true });
            return;
        }
        videoRef.current.currentTime = currentTime;
        videoRef.current.addEventListener('seeked', () => {
            // Improve me: This is ensures frame perfectness but slows down render.
            // Please see this issue for context: https://github.com/remotion-dev/remotion/issues/200
            setTimeout(() => {
                (0, ready_manager_1.continueRender)(handle);
            }, 100);
        }, { once: true });
        videoRef.current.addEventListener('ended', () => {
            (0, ready_manager_1.continueRender)(handle);
        }, { once: true });
        videoRef.current.addEventListener('error', (err) => {
            console.error('Error occurred in video', err);
            (0, ready_manager_1.continueRender)(handle);
        }, { once: true });
    }, [
        volumePropsFrame,
        props.src,
        playbackRate,
        videoConfig.fps,
        frame,
        mediaStartsAt,
    ]);
    return (0, jsx_runtime_1.jsx)("video", Object.assign({ ref: videoRef }, props, { onError: onError }), void 0);
};
exports.VideoForRendering = (0, react_1.forwardRef)(VideoForRenderingForwardFunction);
//# sourceMappingURL=VideoForRendering.js.map