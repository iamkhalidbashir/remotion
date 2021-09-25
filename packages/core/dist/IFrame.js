"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFrame = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ready_manager_1 = require("./ready-manager");
const IFrameRefForwarding = ({ onLoad, onError, ...props }, ref) => {
    const [handle] = (0, react_1.useState)(() => (0, ready_manager_1.delayRender)());
    const didLoad = (0, react_1.useCallback)((e) => {
        (0, ready_manager_1.continueRender)(handle);
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
    }, [handle, onLoad]);
    const didGetError = (0, react_1.useCallback)((e) => {
        (0, ready_manager_1.continueRender)(handle);
        if (onError) {
            onError(e);
        }
        else {
            console.error('Error loading iframe:', e, 'Handle the event using the onError() prop to make this message disappear.');
        }
    }, [handle, onError]);
    return (0, jsx_runtime_1.jsx)("iframe", Object.assign({}, props, { ref: ref, onError: didGetError, onLoad: didLoad }), void 0);
};
exports.IFrame = (0, react_1.forwardRef)(IFrameRefForwarding);
//# sourceMappingURL=IFrame.js.map