"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bundler_1 = require("@remotion/bundler");
const renderer_1 = require("@remotion/renderer");
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const webpack_override_1 = require("../webpack-override");
test('Can render a still using Node.JS APIs', async () => {
    const bundled = await (0, bundler_1.bundle)(path_1.default.join(process.cwd(), 'src/index.tsx'), () => undefined, { webpackOverride: webpack_override_1.webpackOverride });
    const compositions = await (0, renderer_1.getCompositions)(bundled);
    const composition = compositions.find((c) => c.id === 'react-svg');
    const testOut = path_1.default.join((0, os_1.tmpdir)(), 'path/to/still.png');
    expect(() => (0, renderer_1.renderStill)({
        composition,
        output: testOut,
        webpackBundle: bundled,
        frame: 500,
    })).rejects.toThrow(/Cannot use frame 500: Duration of composition is 300, therefore the highest frame that can be rendered is 299/);
    expect(() => (0, renderer_1.renderStill)({
        composition,
        output: process.platform === 'win32' ? 'D:\\' : '/var',
        webpackBundle: bundled,
    })).rejects.toThrow(/already exists, but is not a file/);
    expect(() => (0, renderer_1.renderStill)({
        composition,
        output: 'src/index.tsx',
        webpackBundle: bundled,
        overwrite: false,
    })).rejects.toThrow(/Cannot render still - "overwrite" option was set to false, but the output/);
    await (0, renderer_1.renderStill)({
        composition,
        output: testOut,
        webpackBundle: bundled,
        frame: 100,
    });
    expect((0, fs_1.existsSync)(testOut)).toBe(true);
    (0, fs_1.unlinkSync)(testOut);
});
//# sourceMappingURL=stills.test.js.map