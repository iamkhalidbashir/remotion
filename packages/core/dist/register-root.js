"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsEvaluation = exports.getCompositionName = exports.isPlainIndex = exports.removeStaticComposition = exports.addStaticComposition = exports.getRoot = exports.registerRoot = void 0;
let root = null;
// Ok to have components with various prop types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let staticCompositions = [];
const registerRoot = (comp) => {
    if (root) {
        throw new Error('registerRoot() was called more than once.');
    }
    root = comp;
};
exports.registerRoot = registerRoot;
const getRoot = () => {
    return root;
};
exports.getRoot = getRoot;
const addStaticComposition = (composition) => {
    staticCompositions = [...staticCompositions, composition];
};
exports.addStaticComposition = addStaticComposition;
const removeStaticComposition = (id) => {
    staticCompositions = staticCompositions.filter(s => {
        return s.id !== id;
    });
};
exports.removeStaticComposition = removeStaticComposition;
// Is a plain index.html file with neither ?evalution nor ?composition URL.
// Useful for just setting localStorage values.
const isPlainIndex = () => {
    return !(0, exports.getIsEvaluation)() && (0, exports.getCompositionName)() === null;
};
exports.isPlainIndex = isPlainIndex;
const getCompositionName = () => {
    const param = new URLSearchParams(window.location.search).get('composition');
    if (param !== null) {
        return String(param);
    }
    return null;
};
exports.getCompositionName = getCompositionName;
const getIsEvaluation = () => {
    const param = new URLSearchParams(window.location.search).get('evaluation');
    return param !== null;
};
exports.getIsEvaluation = getIsEvaluation;
if (typeof window !== 'undefined') {
    window.getStaticCompositions = () => staticCompositions.map(c => {
        return {
            durationInFrames: c.durationInFrames,
            fps: c.fps,
            height: c.height,
            id: c.id,
            width: c.width,
        };
    });
}
//# sourceMappingURL=register-root.js.map