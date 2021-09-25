"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediaPlayback = void 0;
const react_1 = require("react");
const use_audio_frame_1 = require("./audio/use-audio-frame");
const timeline_position_state_1 = require("./timeline-position-state");
const use_frame_1 = require("./use-frame");
const use_video_config_1 = require("./use-video-config");
const get_current_time_1 = require("./video/get-current-time");
const warn_about_non_seekable_media_1 = require("./warn-about-non-seekable-media");
const playAndHandleNotAllowedError = (mediaRef, mediaType) => {
    const { current } = mediaRef;
    const prom = current === null || current === void 0 ? void 0 : current.play();
    if (prom === null || prom === void 0 ? void 0 : prom.catch) {
        prom === null || prom === void 0 ? void 0 : prom.catch((err) => {
            if (!current) {
                return;
            }
            console.log(`Could not play ${mediaType} due to following error: `, err);
            if (!current.muted) {
                console.log(`The video will be muted and we'll retry playing it.`, err);
                current.muted = true;
                current.play();
            }
        });
    }
};
const useMediaPlayback = ({ mediaRef, src, mediaType, playbackRate, }) => {
    const frame = (0, use_frame_1.useCurrentFrame)();
    const absoluteFrame = (0, use_frame_1.useAbsoluteCurrentFrame)();
    const [playing] = (0, timeline_position_state_1.usePlayingState)();
    const { fps } = (0, use_video_config_1.useVideoConfig)();
    const mediaStartsAt = (0, use_audio_frame_1.useMediaStartsAt)();
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (playing && !((_a = mediaRef.current) === null || _a === void 0 ? void 0 : _a.ended)) {
            playAndHandleNotAllowedError(mediaRef, mediaType);
        }
        else {
            (_b = mediaRef.current) === null || _b === void 0 ? void 0 : _b.pause();
        }
    }, [mediaRef, mediaType, playing]);
    (0, react_1.useEffect)(() => {
        const tagName = mediaType === 'audio' ? '<Audio>' : '<Video>';
        if (!mediaRef.current) {
            throw new Error(`No ${mediaType} ref found`);
        }
        if (!src) {
            throw new Error(`No 'src' attribute was passed to the ${tagName} element.`);
        }
        mediaRef.current.playbackRate = playbackRate;
        const shouldBeTime = (0, get_current_time_1.getMediaTime)({
            fps,
            frame,
            src,
            playbackRate,
            startFrom: -mediaStartsAt,
        });
        const isTime = mediaRef.current.currentTime;
        const timeShift = Math.abs(shouldBeTime - isTime);
        if (timeShift > 0.45 && !mediaRef.current.ended) {
            console.log('Time has shifted by', timeShift, 'sec. Fixing...');
            // If scrubbing around, adjust timing
            // or if time shift is bigger than 0.2sec
            mediaRef.current.currentTime = shouldBeTime;
            (0, warn_about_non_seekable_media_1.warnAboutNonSeekableMedia)(mediaRef.current);
        }
        if (!playing || absoluteFrame === 0) {
            mediaRef.current.currentTime = shouldBeTime;
        }
        if (mediaRef.current.paused && !mediaRef.current.ended && playing) {
            const { current } = mediaRef;
            current.currentTime = shouldBeTime;
            playAndHandleNotAllowedError(mediaRef, mediaType);
        }
    }, [
        absoluteFrame,
        fps,
        playbackRate,
        frame,
        mediaRef,
        mediaType,
        playing,
        src,
        mediaStartsAt,
    ]);
};
exports.useMediaPlayback = useMediaPlayback;
//# sourceMappingURL=use-media-playback.js.map