"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeCanvas = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const fiber_1 = require("@react-three/fiber");
const react_1 = require("react");
const remotion_1 = require("remotion");
const Scale = ({ width, height }) => {
    const { set, setSize: threeSetSize } = (0, fiber_1.useThree)();
    const [setSize] = (0, react_1.useState)(() => threeSetSize);
    (0, react_1.useLayoutEffect)(() => {
        setSize(width, height);
        set({ setSize: () => null });
        return () => set({ setSize });
    }, [setSize, width, height, set]);
    return null;
};
const ThreeCanvas = (props) => {
    const { children, width, height, style, ...rest } = props;
    remotion_1.Internals.validateDimension(width, 'width', 'of the <ThreeCanvas /> component');
    remotion_1.Internals.validateDimension(height, 'height', 'of the <ThreeCanvas /> component');
    const contexts = remotion_1.Internals.useRemotionContexts();
    const actualStyle = {
        width: props.width,
        height: props.height,
        ...(style !== null && style !== void 0 ? style : {}),
    };
    return ((0, jsx_runtime_1.jsxs)(fiber_1.Canvas, Object.assign({ style: actualStyle }, rest, { children: [(0, jsx_runtime_1.jsx)(Scale, { width: width, height: height }, void 0), (0, jsx_runtime_1.jsx)(remotion_1.Internals.RemotionContextProvider, Object.assign({ contexts: contexts }, { children: children }), void 0)] }), void 0));
};
exports.ThreeCanvas = ThreeCanvas;
//# sourceMappingURL=ThreeCanvas.js.map