"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitterHandle = exports.SPLITTER_HANDLE_SIZE = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SplitterContext_1 = require("./SplitterContext");
exports.SPLITTER_HANDLE_SIZE = 3;
const containerRow = {
    height: exports.SPLITTER_HANDLE_SIZE,
    cursor: 'row-resize',
};
const containerColumn = {
    width: exports.SPLITTER_HANDLE_SIZE,
    cursor: 'col-resize',
};
const SplitterHandle = () => {
    const context = (0, react_1.useContext)(SplitterContext_1.SplitterContext);
    if (!context) {
        throw new Error('Cannot find splitter context');
    }
    const [lastPointerUp, setLastPointerUp] = (0, react_1.useState)(() => Date.now());
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (context.isDragging.current) {
            return;
        }
        if (!context.domRect) {
            return;
        }
        const { current } = ref;
        if (!current) {
            return;
        }
        const getNewValue = (e) => {
            if (!context.isDragging.current) {
                throw new Error('cannot get value if not dragging');
            }
            if (!context.domRect) {
                throw new Error('domRect is not mounted');
            }
            const { width, height } = context.domRect;
            const change = (() => {
                if (context.orientation === 'vertical') {
                    return ((e.clientX - context.isDragging.current.x) /
                        (width - exports.SPLITTER_HANDLE_SIZE));
                }
                return ((e.clientY - context.isDragging.current.y) /
                    (height - exports.SPLITTER_HANDLE_SIZE));
            })();
            const newFlex = context.flexValue + change;
            return Math.min(context.maxFlex, Math.max(context.minFlex, newFlex));
        };
        const onPointerDown = (e) => {
            var _a;
            context.isDragging.current = {
                x: e.clientX,
                y: e.clientY,
            };
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.classList.add('remotion-splitter-active');
            window.addEventListener('pointerup', (ev) => {
                context.persistFlex(getNewValue(ev));
                cleanup();
                setLastPointerUp(Date.now());
            }, { once: true });
            window.addEventListener('pointermove', onPointerMove);
        };
        const onPointerMove = (e) => {
            if (context.isDragging.current) {
                const val = getNewValue(e);
                context.setFlexValue(val);
            }
        };
        const cleanup = () => {
            var _a;
            context.isDragging.current = false;
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.classList.remove('remotion-splitter-active');
            current.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
        };
        current.addEventListener('pointerdown', onPointerDown);
        return () => {
            if (!context.isDragging.current) {
                cleanup();
            }
        };
    }, [context, context.domRect, context.flexValue, lastPointerUp]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: "remotion-splitter", style: context.orientation === 'horizontal' ? containerRow : containerColumn }, void 0));
};
exports.SplitterHandle = SplitterHandle;
//# sourceMappingURL=SplitterHandle.js.map