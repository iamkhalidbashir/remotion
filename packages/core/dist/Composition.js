"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composition = void 0;
const react_1 = require("react");
const CompositionManager_1 = require("./CompositionManager");
const nonce_1 = require("./nonce");
const register_root_1 = require("./register-root");
const use_lazy_component_1 = require("./use-lazy-component");
const validate_dimensions_1 = require("./validation/validate-dimensions");
const validate_duration_in_frames_1 = require("./validation/validate-duration-in-frames");
const validate_fps_1 = require("./validation/validate-fps");
const Composition = ({ width, height, fps, durationInFrames, id, defaultProps: props, ...compProps }) => {
    const { registerComposition, unregisterComposition } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    const lazy = (0, use_lazy_component_1.useLazyComponent)(compProps);
    const nonce = (0, nonce_1.useNonce)();
    (0, react_1.useEffect)(() => {
        // Ensure it's a URL safe id
        if (!id) {
            throw new Error('No id for composition passed.');
        }
        if (!id.match(/^([a-zA-Z0-9-])+$/g)) {
            throw new Error(`Composition id can only contain a-z, A-Z, 0-9 and -. You passed ${id}`);
        }
        (0, validate_dimensions_1.validateDimension)(width, 'width', 'of the <Composition/> component');
        (0, validate_dimensions_1.validateDimension)(height, 'height', 'of the <Composition/> component');
        (0, validate_duration_in_frames_1.validateDurationInFrames)(durationInFrames, 'of the <Composition/> component');
        (0, validate_fps_1.validateFps)(fps, 'as a prop of the <Composition/> component');
        registerComposition({
            durationInFrames,
            fps,
            height,
            width,
            id,
            component: lazy,
            props,
            nonce,
        });
        if ((0, register_root_1.getIsEvaluation)()) {
            (0, register_root_1.addStaticComposition)({
                component: lazy,
                durationInFrames,
                fps,
                height,
                id,
                width,
                nonce,
            });
        }
        return () => {
            unregisterComposition(id);
            (0, register_root_1.removeStaticComposition)(id);
        };
    }, [
        durationInFrames,
        fps,
        height,
        lazy,
        id,
        props,
        registerComposition,
        unregisterComposition,
        width,
        nonce,
    ]);
    return null;
};
exports.Composition = Composition;
//# sourceMappingURL=Composition.js.map