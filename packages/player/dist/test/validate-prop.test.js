"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const index_1 = require("../index");
const test_utils_1 = require("./test-utils");
test('no compositionWidth should give errors', () => {
    try {
        (0, test_utils_1.render)((0, jsx_runtime_1.jsx)(index_1.Player
        // @ts-expect-error
        , { 
            // @ts-expect-error
            compositionWidth: null, compositionHeight: 400, fps: 30, durationInFrames: 500, component: test_utils_1.HelloWorld, controls: true, showVolumeControls: true }, void 0));
    }
    catch (e) {
        expect(e.message).toMatch(/'compositionWidth' must be a number but got 'object' instead/);
    }
});
test('no compositionHeight should give errors', () => {
    try {
        (0, test_utils_1.render)((0, jsx_runtime_1.jsx)(index_1.Player, { compositionWidth: 400, 
            // @ts-expect-error
            compositionHeight: undefined, fps: 30, durationInFrames: 500, component: test_utils_1.HelloWorld, controls: true, showVolumeControls: true }, void 0));
    }
    catch (e) {
        expect(e.message).toMatch(/'compositionHeight' must be a number but got 'undefined' instead/);
    }
});
test('No fps should give errors', () => {
    try {
        (0, test_utils_1.render)((0, jsx_runtime_1.jsx)(index_1.Player, { compositionWidth: 500, compositionHeight: 400, 
            // @ts-expect-error
            fps: null, durationInFrames: 500, component: test_utils_1.HelloWorld, controls: true, showVolumeControls: true }, void 0));
    }
    catch (e) {
        expect(e.message).toMatch(/"fps" must be a number, but you passed a value of type object/);
    }
    try {
        (0, test_utils_1.render)((0, jsx_runtime_1.jsx)(index_1.Player, { compositionWidth: 500, compositionHeight: 400, 
            // @ts-expect-error
            fps: undefined, durationInFrames: 500, component: test_utils_1.HelloWorld, controls: true, showVolumeControls: true }, void 0));
    }
    catch (e) {
        expect(e.message).toMatch(/"fps" must be a number, but you passed a value of type undefined/);
    }
});
test('No durationInFrames should give errors', () => {
    try {
        (0, test_utils_1.render)((0, jsx_runtime_1.jsx)(index_1.Player, { compositionWidth: 500, compositionHeight: 400, fps: 30, 
            // @ts-expect-error
            durationInFrames: undefined, component: test_utils_1.HelloWorld, controls: true, showVolumeControls: true }, void 0));
    }
    catch (e) {
        expect(e.message).toMatch(/The "durationInFrames" prop of the <Player\/> component must be a number, but you passed a value of type undefined/);
    }
});
test.each([
    ['controls'],
    ['loop'],
    ['autoPlay'],
    ['showVolumeControls'],
    ['allowFullscreen'],
    ['clickToPlay'],
    ['doubleClickToFullscreen'],
])('No durationInFrames should give errors %s', (a) => {
    const props = {};
    props[a] = 'hey';
    try {
        (0, test_utils_1.render)((0, jsx_runtime_1.jsx)(index_1.Player, Object.assign({ compositionWidth: 500, compositionHeight: 400, fps: 30, durationInFrames: 100, component: test_utils_1.HelloWorld }, props), void 0));
    }
    catch (e) {
        expect(e.message).toMatch(`'${a}' must be a boolean or undefined but got 'string' instead`);
    }
});
//# sourceMappingURL=validate-prop.test.js.map