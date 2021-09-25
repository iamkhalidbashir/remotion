"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayback = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const use_player_1 = require("./use-player");
const usePlayback = ({ loop }) => {
    const frame = remotion_1.Internals.Timeline.useTimelinePosition();
    const config = remotion_1.Internals.useUnsafeVideoConfig();
    const { playing, pause, emitter } = (0, use_player_1.usePlayer)();
    const setFrame = remotion_1.Internals.Timeline.useTimelineSetFrame();
    const frameRef = (0, react_1.useRef)(frame);
    frameRef.current = frame;
    const lastTimeUpdateEvent = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!config) {
            return;
        }
        if (!playing) {
            return;
        }
        let hasBeenStopped = false;
        let reqAnimFrameCall = null;
        const startedTime = performance.now();
        const startedFrame = frameRef.current;
        const stop = () => {
            hasBeenStopped = true;
            if (reqAnimFrameCall !== null) {
                cancelAnimationFrame(reqAnimFrameCall);
            }
        };
        const callback = () => {
            const time = performance.now() - startedTime;
            const nextFrame = Math.round(time / (1000 / config.fps)) + startedFrame;
            if (nextFrame === config.durationInFrames && !loop) {
                stop();
                pause();
                emitter.dispatchEnded();
                return;
            }
            const actualNextFrame = nextFrame % config.durationInFrames;
            if (actualNextFrame !== frameRef.current) {
                setFrame(actualNextFrame);
            }
            if (!hasBeenStopped) {
                reqAnimFrameCall = requestAnimationFrame(callback);
            }
        };
        reqAnimFrameCall = requestAnimationFrame(callback);
        return () => {
            stop();
        };
    }, [config, loop, pause, playing, setFrame, emitter]);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            if (lastTimeUpdateEvent.current === frameRef.current) {
                return;
            }
            emitter.dispatchTimeUpdate({ frame: frameRef.current });
            lastTimeUpdateEvent.current = frameRef.current;
        }, 250);
        return () => clearInterval(interval);
    }, [emitter]);
};
exports.usePlayback = usePlayback;
//# sourceMappingURL=use-playback.js.map