"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionManager = void 0;
const react_1 = require("react");
exports.CompositionManager = (0, react_1.createContext)({
    compositions: [],
    registerComposition: () => undefined,
    unregisterComposition: () => undefined,
    currentComposition: null,
    setCurrentComposition: () => undefined,
    registerSequence: () => undefined,
    unregisterSequence: () => undefined,
    registerAsset: () => undefined,
    unregisterAsset: () => undefined,
    sequences: [],
    assets: [],
});
//# sourceMappingURL=CompositionManager.js.map