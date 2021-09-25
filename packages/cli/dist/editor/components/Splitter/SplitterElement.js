"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitterElement = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SplitterContext_1 = require("./SplitterContext");
const SplitterElement = ({ children, type }) => {
    const context = (0, react_1.useContext)(SplitterContext_1.SplitterContext);
    const style = (0, react_1.useMemo)(() => {
        return {
            flex: type === 'flexer' ? context.flexValue : 1 - context.flexValue,
            display: 'flex',
            position: 'relative',
        };
    }, [context.flexValue, type]);
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ style: style }, { children: children }), void 0);
};
exports.SplitterElement = SplitterElement;
//# sourceMappingURL=SplitterElement.js.map