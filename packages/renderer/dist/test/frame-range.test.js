"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_frame_to_render_1 = require("../get-frame-to-render");
test('Should parse the frame range at least', () => {
    expect((0, get_frame_to_render_1.getFrameToRender)(null, 0)).toBe(0);
    expect((0, get_frame_to_render_1.getFrameToRender)(0, 0)).toBe(0);
    expect((0, get_frame_to_render_1.getFrameToRender)([0, 150], 0)).toBe(0);
});
//# sourceMappingURL=frame-range.test.js.map