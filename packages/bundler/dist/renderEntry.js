"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const remotion_1 = require("remotion");
remotion_1.Internals.CSSUtils.injectCSS(remotion_1.Internals.CSSUtils.makeDefaultCSS(null));
const Root = remotion_1.Internals.getRoot();
if (!Root) {
    throw new Error('Root has not been registered.');
}
const handle = (0, remotion_1.delayRender)();
const Fallback = () => {
    (0, react_1.useEffect)(() => {
        const fallback = (0, remotion_1.delayRender)();
        return () => (0, remotion_1.continueRender)(fallback);
    }, []);
    return null;
};
const inputProps = (0, remotion_1.getInputProps)();
const GetVideo = () => {
    var _a;
    const video = remotion_1.Internals.useVideo();
    const compositions = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const [Component, setComponent] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (remotion_1.Internals.getIsEvaluation()) {
            return;
        }
        if (!video && compositions.compositions.length > 0) {
            compositions.setCurrentComposition((_b = (_a = compositions.compositions.find((c) => c.id === remotion_1.Internals.getCompositionName())) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null);
        }
    }, [compositions, compositions.compositions, video]);
    const fetchComponent = (0, react_1.useCallback)(() => {
        if (!video) {
            throw new Error('Expected to have video');
        }
        const Comp = video.component;
        setComponent(Comp);
    }, [video]);
    (0, react_1.useEffect)(() => {
        if (video) {
            fetchComponent();
        }
    }, [fetchComponent, video]);
    (0, react_1.useEffect)(() => {
        if (remotion_1.Internals.getIsEvaluation()) {
            (0, remotion_1.continueRender)(handle);
        }
        else if (Component) {
            (0, remotion_1.continueRender)(handle);
        }
    }, [Component]);
    if (!video) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, Object.assign({ fallback: (0, jsx_runtime_1.jsx)(Fallback, {}, void 0) }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "canvas", style: {
                width: video.width,
                height: video.height,
                display: 'flex',
                backgroundColor: 'transparent',
            } }, { children: Component ? ((0, jsx_runtime_1.jsx)(Component, Object.assign({}, ((_a = video === null || video === void 0 ? void 0 : video.props) !== null && _a !== void 0 ? _a : {}), inputProps), void 0)) : null }), void 0) }), void 0));
};
if (!remotion_1.Internals.isPlainIndex()) {
    (0, react_dom_1.render)((0, jsx_runtime_1.jsxs)(remotion_1.Internals.RemotionRoot, { children: [(0, jsx_runtime_1.jsx)(Root, {}, void 0), (0, jsx_runtime_1.jsx)(GetVideo, {}, void 0)] }, void 0), document.getElementById('container'));
}
//# sourceMappingURL=renderEntry.js.map