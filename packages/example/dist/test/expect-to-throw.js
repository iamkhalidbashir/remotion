"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectToThrow = void 0;
// eslint-disable-next-line @typescript-eslint/ban-types
const expectToThrow = (func, err) => {
    // Even though the error is caught, it still gets printed to the console
    // so we mock that out to avoid the wall of red text.
    jest.spyOn(console, 'error');
    // @ts-expect-error wrong types
    console.error.mockImplementation(() => undefined);
    expect(func).toThrow(err);
    // @ts-expect-error wrong types
    console.error.mockRestore();
};
exports.expectToThrow = expectToThrow;
//# sourceMappingURL=expect-to-throw.js.map