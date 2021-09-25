"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatten_volume_array_1 = require("../assets/flatten-volume-array");
const expect_to_throw_1 = require("./expect-to-throw");
test('Should be able to flatten volume array', () => {
    expect((0, flatten_volume_array_1.flattenVolumeArray)([1, 1, 1, 1, 1])).toBe(1);
    expect((0, flatten_volume_array_1.flattenVolumeArray)([1, 1, 1, 1, 0])).toEqual([1, 1, 1, 1, 0]);
    (0, expect_to_throw_1.expectToThrow)(() => (0, flatten_volume_array_1.flattenVolumeArray)([]), /must have at least 1 number/);
});
//# sourceMappingURL=flatten-volume-array.test.js.map