"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayer = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const emitter_context_1 = require("./emitter-context");
const usePlayer = () => {
    var _a;
    const [playing, setPlaying] = remotion_1.Internals.Timeline.usePlayingState();
    const frame = remotion_1.Internals.Timeline.useTimelinePosition();
    const setFrame = remotion_1.Internals.Timeline.useTimelineSetFrame();
    const setTimelinePosition = remotion_1.Internals.Timeline.useTimelineSetFrame();
    const audioContext = (0, react_1.useContext)(remotion_1.Internals.SharedAudioContext);
    const frameRef = (0, react_1.useRef)();
    frameRef.current = frame;
    const video = remotion_1.Internals.useVideo();
    const config = remotion_1.Internals.useUnsafeVideoConfig();
    const emitter = (0, react_1.useContext)(emitter_context_1.PlayerEventEmitterContext);
    const lastFrame = ((_a = config === null || config === void 0 ? void 0 : config.durationInFrames) !== null && _a !== void 0 ? _a : 1) - 1;
    const isLastFrame = frame === lastFrame;
    if (!emitter) {
        throw new TypeError('Expected Player event emitter context');
    }
    const seek = (0, react_1.useCallback)((newFrame) => {
        setTimelinePosition(newFrame);
        emitter.dispatchSeek(newFrame);
    }, [emitter, setTimelinePosition]);
    const play = (0, react_1.useCallback)((e) => {
        if (playing) {
            return;
        }
        if (isLastFrame) {
            seek(0);
        }
        if (audioContext && audioContext.numberOfAudioTags > 0 && e) {
            audioContext.playAllAudios();
        }
        setPlaying(true);
        emitter.dispatchPlay();
    }, [playing, isLastFrame, audioContext, setPlaying, emitter, seek]);
    const pause = (0, react_1.useCallback)(() => {
        if (playing) {
            setPlaying(false);
            emitter.dispatchPause();
        }
    }, [emitter, playing, setPlaying]);
    const frameBack = (0, react_1.useCallback)((frames) => {
        if (!video) {
            return null;
        }
        if (playing) {
            return;
        }
        if (frame === 0) {
            return;
        }
        setFrame((f) => Math.max(0, f - frames));
    }, [frame, playing, setFrame, video]);
    const frameForward = (0, react_1.useCallback)((frames) => {
        if (!video) {
            return null;
        }
        if (playing) {
            return;
        }
        if (isLastFrame) {
            return;
        }
        setFrame((f) => Math.min(lastFrame, f + frames));
    }, [isLastFrame, lastFrame, playing, setFrame, video]);
    const returnValue = (0, react_1.useMemo)(() => {
        return {
            frameBack,
            frameForward,
            isLastFrame,
            emitter,
            playing,
            play,
            pause,
            seek,
            getCurrentFrame: () => frameRef.current,
        };
    }, [
        emitter,
        frameBack,
        frameForward,
        isLastFrame,
        pause,
        play,
        playing,
        seek,
    ]);
    return returnValue;
};
exports.usePlayer = usePlayer;
//# sourceMappingURL=use-player.js.map