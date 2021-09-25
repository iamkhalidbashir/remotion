"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPropsAndEnv = void 0;
const remotion_1 = require("remotion");
const setPropsAndEnv = async ({ inputProps, envVariables, page, port, initialFrame, }) => {
    if (inputProps || envVariables) {
        await page.goto(`http://localhost:${port}/index.html`);
        if (inputProps) {
            await page.evaluate((key, input) => {
                window.localStorage.setItem(key, input);
            }, remotion_1.Internals.INPUT_PROPS_KEY, JSON.stringify(inputProps));
        }
        if (envVariables) {
            await page.evaluate((key, input) => {
                window.localStorage.setItem(key, input);
            }, remotion_1.Internals.ENV_VARIABLES_LOCAL_STORAGE_KEY, JSON.stringify(envVariables));
        }
        await page.evaluate((key, value) => {
            window.localStorage.setItem(key, value);
        }, remotion_1.Internals.INITIAL_FRAME_LOCAL_STORAGE_KEY, initialFrame);
    }
};
exports.setPropsAndEnv = setPropsAndEnv;
//# sourceMappingURL=set-props-and-env.js.map