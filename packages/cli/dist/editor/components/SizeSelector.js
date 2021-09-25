"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const preview_size_1 = require("../state/preview-size");
const ControlButton_1 = require("./ControlButton");
const SizeSelector = () => {
    const { size, setSize } = (0, react_1.useContext)(preview_size_1.PreviewSizeContext);
    const onChange = (0, react_1.useCallback)((e) => {
        setSize(() => {
            (0, preview_size_1.persistPreviewSizeOption)(e.target.value);
            return e.target.value;
        });
    }, [setSize]);
    const style = (0, react_1.useMemo)(() => {
        return {
            padding: ControlButton_1.CONTROL_BUTTON_PADDING,
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: style }, { children: (0, jsx_runtime_1.jsxs)("select", Object.assign({ "aria-label": "Select the size of the preview", onChange: onChange, value: size }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "auto" }, { children: "Fit" }), void 0), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "0.25" }, { children: "25%" }), void 0), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "0.5" }, { children: "50%" }), void 0), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "1" }, { children: "100%" }), void 0)] }), void 0) }), void 0));
};
exports.SizeSelector = SizeSelector;
//# sourceMappingURL=SizeSelector.js.map