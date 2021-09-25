"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const round_volume_to_avoid_stack_overflow_1 = require("../assets/round-volume-to-avoid-stack-overflow");
test('Should avoid having more than 98 possible volumes to avoid FFMPEG exception', () => {
    const thousandsOfValues = new Array(10000)
        .fill(true)
        .map((_, i) => i / 9999)
        .map((t) => (0, round_volume_to_avoid_stack_overflow_1.roundVolumeToAvoidStackOverflow)(t));
    expect(new Set(thousandsOfValues).size).toBe(98);
});
//# sourceMappingURL=avoid-ffmpeg-stackoverflow.test.js.map