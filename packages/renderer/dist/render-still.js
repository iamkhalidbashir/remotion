"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderStill = void 0;
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const open_browser_1 = require("./open-browser");
const provide_screenshot_1 = require("./provide-screenshot");
const seek_to_frame_1 = require("./seek-to-frame");
const serve_static_1 = require("./serve-static");
const set_props_and_env_1 = require("./set-props-and-env");
/**
 * @description Render a still frame from a composition and returns an image path
 */
const renderStill = async ({ composition, quality, imageFormat = 'png', webpackBundle, browser = remotion_1.Internals.DEFAULT_BROWSER, puppeteerInstance, dumpBrowserLogs = false, onError, inputProps, envVariables, output, frame = 0, overwrite = true, browserExecutable, }) => {
    remotion_1.Internals.validateDimension(composition.height, 'height', 'in the `config` object passed to `renderStill()`');
    remotion_1.Internals.validateDimension(composition.width, 'width', 'in the `config` object passed to `renderStill()`');
    remotion_1.Internals.validateFps(composition.fps, 'in the `config` object of `renderStill()`');
    remotion_1.Internals.validateDurationInFrames(composition.durationInFrames, 'in the `config` object passed to `renderStill()`');
    remotion_1.Internals.validateNonNullImageFormat(imageFormat);
    remotion_1.Internals.validateFrame(frame, composition.durationInFrames);
    if (typeof output !== 'string') {
        throw new TypeError('`output` parameter was not passed or is not a string');
    }
    output = path_1.default.resolve(process.cwd(), output);
    if (quality !== undefined && imageFormat !== 'jpeg') {
        throw new Error("You can only pass the `quality` option if `imageFormat` is 'jpeg'.");
    }
    remotion_1.Internals.validateQuality(quality);
    if (fs_1.default.existsSync(output)) {
        if (!overwrite) {
            throw new Error(`Cannot render still - "overwrite" option was set to false, but the output destination ${output} already exists.`);
        }
        const stat = (0, fs_1.statSync)(output);
        if (!stat.isFile()) {
            throw new Error(`The output location ${output} already exists, but is not a file, but something else (e.g. folder). Cannot save to it.`);
        }
    }
    (0, fs_1.mkdirSync)(path_1.default.resolve(output, '..'), {
        recursive: true,
    });
    const [{ port, close }, browserInstance] = await Promise.all([
        (0, serve_static_1.serveStatic)(webpackBundle),
        puppeteerInstance !== null && puppeteerInstance !== void 0 ? puppeteerInstance : (0, open_browser_1.openBrowser)(browser, {
            browserExecutable,
            shouldDumpIo: dumpBrowserLogs,
        }),
    ]);
    const page = await browserInstance.newPage();
    page.setViewport({
        width: composition.width,
        height: composition.height,
        deviceScaleFactor: 1,
    });
    const errorCallback = (err) => {
        onError === null || onError === void 0 ? void 0 : onError(err);
    };
    page.on('pageerror', errorCallback);
    await (0, set_props_and_env_1.setPropsAndEnv)({
        inputProps,
        envVariables,
        page,
        port,
        initialFrame: frame,
    });
    const site = `http://localhost:${port}/index.html?composition=${composition.id}`;
    await page.goto(site);
    try {
        await (0, seek_to_frame_1.seekToFrame)({ frame, page });
    }
    catch (err) {
        const error = err;
        if (error.message.includes('timeout') &&
            error.message.includes('exceeded')) {
            errorCallback(new Error('The rendering timed out. See https://www.remotion.dev/docs/timeout/ for possible reasons.'));
        }
        else {
            errorCallback(error);
        }
        throw error;
    }
    await (0, provide_screenshot_1.provideScreenshot)({
        page,
        imageFormat,
        quality,
        options: {
            frame,
            output,
        },
    });
    page.off('pageerror', errorCallback);
    close().catch((err) => {
        console.log('Unable to close web server', err);
    });
    if (puppeteerInstance) {
        await page.close();
    }
    else {
        browserInstance.close().catch((err) => {
            console.log('Unable to close browser', err);
        });
    }
};
exports.renderStill = renderStill;
//# sourceMappingURL=render-still.js.map