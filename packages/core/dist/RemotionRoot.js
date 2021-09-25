"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemotionRoot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const shared_audio_tags_1 = require("./audio/shared-audio-tags");
const CompositionManager_1 = require("./CompositionManager");
const nonce_1 = require("./nonce");
const random_1 = require("./random");
const ready_manager_1 = require("./ready-manager");
const timeline_position_state_1 = require("./timeline-position-state");
const RemotionRoot = ({ children }) => {
    var _a;
    // Wontfix, expected to have
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [compositions, setCompositions] = (0, react_1.useState)([]);
    const [currentComposition, setCurrentComposition] = (0, react_1.useState)(null);
    const [remotionRootId] = (0, react_1.useState)(() => String((0, random_1.random)(null)));
    const [sequences, setSequences] = (0, react_1.useState)([]);
    const [assets, setAssets] = (0, react_1.useState)([]);
    const [frame, setFrame] = (0, react_1.useState)((_a = window.remotion_initialFrame) !== null && _a !== void 0 ? _a : 0);
    const [playing, setPlaying] = (0, react_1.useState)(false);
    const [fastRefreshes, setFastRefreshes] = (0, react_1.useState)(0);
    (0, react_1.useLayoutEffect)(() => {
        if (typeof window !== 'undefined') {
            window.remotion_setFrame = (f) => {
                const id = (0, ready_manager_1.delayRender)();
                setFrame(f);
                requestAnimationFrame(() => (0, ready_manager_1.continueRender)(id));
            };
            window.remotion_isPlayer = false;
        }
    }, []);
    (0, react_1.useLayoutEffect)(() => {
        if (typeof window !== 'undefined') {
            window.remotion_collectAssets = () => {
                setAssets([]); // clear assets at next render
                return assets;
            };
        }
    }, [assets]);
    const registerComposition = (0, react_1.useCallback)((comp) => {
        setCompositions((comps) => {
            if (comps.find((c) => c.id === comp.id)) {
                throw new Error(`Multiple composition with id ${comp.id} are registered.`);
            }
            return [...comps, comp].slice().sort((a, b) => a.nonce - b.nonce);
        });
    }, []);
    const registerSequence = (0, react_1.useCallback)((seq) => {
        setSequences((seqs) => {
            return [...seqs, seq];
        });
    }, []);
    const unregisterComposition = (0, react_1.useCallback)((id) => {
        setCompositions((comps) => {
            return comps.filter((c) => c.id !== id);
        });
    }, []);
    const unregisterSequence = (0, react_1.useCallback)((seq) => {
        setSequences((seqs) => seqs.filter((s) => s.id !== seq));
    }, []);
    const registerAsset = (0, react_1.useCallback)((asset) => {
        setAssets((assts) => {
            return [...assts, asset];
        });
    }, []);
    const unregisterAsset = (0, react_1.useCallback)((id) => {
        setAssets((assts) => {
            return assts.filter((a) => a.id !== id);
        });
    }, []);
    const contextValue = (0, react_1.useMemo)(() => {
        return {
            compositions,
            registerComposition,
            unregisterComposition,
            currentComposition,
            setCurrentComposition,
            registerSequence,
            unregisterSequence,
            registerAsset,
            unregisterAsset,
            sequences,
            assets,
        };
    }, [
        compositions,
        currentComposition,
        registerComposition,
        registerSequence,
        unregisterComposition,
        unregisterSequence,
        registerAsset,
        unregisterAsset,
        sequences,
        assets,
    ]);
    const timelineContextValue = (0, react_1.useMemo)(() => {
        return {
            frame,
            playing,
            rootId: remotionRootId,
        };
    }, [frame, playing, remotionRootId]);
    const setTimelineContextValue = (0, react_1.useMemo)(() => {
        return {
            setFrame,
            setPlaying,
        };
    }, []);
    const nonceContext = (0, react_1.useMemo)(() => {
        let counter = 0;
        return {
            getNonce: () => counter++,
            fastRefreshes,
        };
    }, [fastRefreshes]);
    (0, react_1.useEffect)(() => {
        if (module.hot) {
            module.hot.addStatusHandler((status) => {
                if (status === 'idle') {
                    setFastRefreshes((i) => i + 1);
                }
            });
        }
    }, []);
    return ((0, jsx_runtime_1.jsx)(nonce_1.NonceContext.Provider, Object.assign({ value: nonceContext }, { children: (0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, Object.assign({ value: timelineContextValue }, { children: (0, jsx_runtime_1.jsx)(timeline_position_state_1.SetTimelineContext.Provider, Object.assign({ value: setTimelineContextValue }, { children: (0, jsx_runtime_1.jsx)(CompositionManager_1.CompositionManager.Provider, Object.assign({ value: contextValue }, { children: (0, jsx_runtime_1.jsx)(shared_audio_tags_1.SharedAudioContextProvider
                    // In the preview, which is mostly played on Desktop, we opt out of the autoplay policy fix as described in https://github.com/remotion-dev/remotion/pull/554, as it mostly applies to mobile.
                    , Object.assign({ 
                        // In the preview, which is mostly played on Desktop, we opt out of the autoplay policy fix as described in https://github.com/remotion-dev/remotion/pull/554, as it mostly applies to mobile.
                        numberOfAudioTags: 0 }, { children: children }), void 0) }), void 0) }), void 0) }), void 0) }), void 0));
};
exports.RemotionRoot = RemotionRoot;
//# sourceMappingURL=RemotionRoot.js.map