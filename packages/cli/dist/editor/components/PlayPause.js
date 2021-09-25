"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayPause = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const is_current_selected_still_1 = require("../helpers/is-current-selected-still");
const pause_1 = require("../icons/pause");
const play_1 = require("../icons/play");
const step_back_1 = require("../icons/step-back");
const step_forward_1 = require("../icons/step-forward");
const ControlButton_1 = require("./ControlButton");
const PlayPause = () => {
    const frame = remotion_1.Internals.Timeline.useTimelinePosition();
    const video = remotion_1.Internals.useVideo();
    player_1.PlayerInternals.usePlayback({ loop: true });
    const { playing, play, pause, frameBack, frameForward, isLastFrame, } = player_1.PlayerInternals.usePlayer();
    const isStill = (0, is_current_selected_still_1.useIsStill)();
    (0, react_1.useEffect)(() => {
        if (isStill) {
            pause();
        }
    }, [isStill, pause]);
    const onKeyPress = (0, react_1.useCallback)((e) => {
        if (!video) {
            return;
        }
        if (e.code === 'Space') {
            if (playing) {
                pause();
            }
            else {
                play();
            }
            e.preventDefault();
        }
        if (e.code === 'ArrowLeft') {
            frameBack(e.shiftKey ? video.fps : 1);
            e.preventDefault();
        }
        if (e.code === 'ArrowRight') {
            frameForward(e.shiftKey ? video.fps : 1);
            e.preventDefault();
        }
    }, [frameBack, frameForward, pause, play, playing, video]);
    const oneFrameBack = (0, react_1.useCallback)(() => {
        frameBack(1);
    }, [frameBack]);
    const oneFrameForward = (0, react_1.useCallback)(() => {
        frameForward(1);
    }, [frameForward]);
    (0, react_1.useEffect)(() => {
        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [onKeyPress]);
    if (isStill) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, Object.assign({ "aria-label": "Step back one frame", disabled: frame === 0, onClick: oneFrameBack }, { children: (0, jsx_runtime_1.jsx)(step_back_1.StepBack, { style: {
                        height: 16,
                        width: 16,
                        color: 'white',
                    } }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, Object.assign({ "aria-label": playing ? 'Pause' : 'Play', disabled: !video, onClick: playing ? pause : play }, { children: playing ? ((0, jsx_runtime_1.jsx)(pause_1.Pause, { style: {
                        height: 14,
                        width: 14,
                        color: 'white',
                    } }, void 0)) : ((0, jsx_runtime_1.jsx)(play_1.Play, { style: {
                        height: 14,
                        width: 14,
                        color: 'white',
                    } }, void 0)) }), void 0), (0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, Object.assign({ "aria-label": "Step forward one frame", disabled: isLastFrame, onClick: oneFrameForward }, { children: (0, jsx_runtime_1.jsx)(step_forward_1.StepForward, { style: {
                        height: 16,
                        width: 16,
                        color: 'white',
                    } }, void 0) }), void 0)] }, void 0));
};
exports.PlayPause = PlayPause;
//# sourceMappingURL=PlayPause.js.map