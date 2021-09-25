"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputProps = exports.INPUT_PROPS_KEY = void 0;
const get_environment_1 = require("../get-environment");
exports.INPUT_PROPS_KEY = 'remotion.inputProps';
const getInputProps = () => {
    if ((0, get_environment_1.getRemotionEnvironment)() === 'rendering') {
        const param = localStorage.getItem(exports.INPUT_PROPS_KEY);
        if (!param) {
            return {};
        }
        const parsed = JSON.parse(param);
        return parsed;
    }
    if ((0, get_environment_1.getRemotionEnvironment)() === 'preview') {
        return process.env.INPUT_PROPS;
    }
    throw new Error('You cannot call `getInputProps()` from a <Player>. Instead, the props are available as React props from component that you passed as `component` prop.');
};
exports.getInputProps = getInputProps;
//# sourceMappingURL=input-props.js.map