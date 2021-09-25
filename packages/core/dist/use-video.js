"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVideo = void 0;
const react_1 = require("react");
const CompositionManager_1 = require("./CompositionManager");
const useVideo = () => {
    var _a;
    const context = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    return ((_a = context.compositions.find(c => {
        return c.id === context.currentComposition;
    })) !== null && _a !== void 0 ? _a : null);
};
exports.useVideo = useVideo;
//# sourceMappingURL=use-video.js.map