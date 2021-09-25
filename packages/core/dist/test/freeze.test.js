"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const freeze_1 = require("../freeze");
const expect_to_throw_1 = require("./expect-to-throw");
describe('Throw with invalid duration props', () => {
    test('It should throw if Freeze has string as frame prop value', () => {
        (0, expect_to_throw_1.expectToThrow)(
        // @ts-expect-error
        () => (0, react_1.render)((0, jsx_runtime_1.jsx)(freeze_1.Freeze, { frame: '0' }, void 0)), /The 'frame' prop of <Freeze \/> must be a number, but is of type string/);
    });
    test('It should throw if Freeze has undefined as frame prop value', () => {
        (0, expect_to_throw_1.expectToThrow)(
        // @ts-expect-error
        () => (0, react_1.render)((0, jsx_runtime_1.jsx)(freeze_1.Freeze, {}, void 0)), /The <Freeze \/> component requires a 'frame' prop, but none was passed./);
    });
});
//# sourceMappingURL=freeze.test.js.map