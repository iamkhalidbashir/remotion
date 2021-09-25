"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderFrames = void 0;
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const cycle_browser_tabs_1 = require("./cycle-browser-tabs");
const get_concurrency_1 = require("./get-concurrency");
const get_frame_range_1 = require("./get-frame-range");
const get_frame_to_render_1 = require("./get-frame-to-render");
const image_format_1 = require("./image-format");
const open_browser_1 = require("./open-browser");
const pool_1 = require("./pool");
const provide_screenshot_1 = require("./provide-screenshot");
const seek_to_frame_1 = require("./seek-to-frame");
const serve_static_1 = require("./serve-static");
const set_props_and_env_1 = require("./set-props-and-env");
const renderFrames = async ({ config, parallelism, onFrameUpdate, compositionId, outputDir, onStart, inputProps, envVariables = {}, webpackBundle, quality, imageFormat = image_format_1.DEFAULT_IMAGE_FORMAT, browser = remotion_1.Internals.DEFAULT_BROWSER, frameRange, dumpBrowserLogs = false, puppeteerInstance, onError, browserExecutable, concurrentMode, parallelEncoding, writeFrame, }) => {
    remotion_1.Internals.validateDimension(config.height, 'height', 'in the `config` object passed to `renderFrames()`');
    remotion_1.Internals.validateDimension(config.width, 'width', 'in the `config` object passed to `renderFrames()`');
    remotion_1.Internals.validateFps(config.fps, 'in the `config` object of `renderFrames()`');
    remotion_1.Internals.validateDurationInFrames(config.durationInFrames, 'in the `config` object passed to `renderFrames()`');
    if (quality !== undefined && imageFormat !== 'jpeg') {
        throw new Error("You can only pass the `quality` option if `imageFormat` is 'jpeg'.");
    }
    remotion_1.Internals.validateQuality(quality);
    const actualParallelism = (0, get_concurrency_1.getActualConcurrency)(parallelism !== null && parallelism !== void 0 ? parallelism : null);
    const [{ port, close }, browserInstance] = await Promise.all([
        (0, serve_static_1.serveStatic)(webpackBundle),
        puppeteerInstance !== null && puppeteerInstance !== void 0 ? puppeteerInstance : Promise.all(new Array(concurrentMode === 'browser' ? actualParallelism : 1)
            .fill(true)
            .map(() => (0, open_browser_1.openBrowser)(browser, {
            shouldDumpIo: dumpBrowserLogs,
            browserExecutable,
        }))),
        // puppeteerInstance ??
        // openBrowser(browser, {
        // 	shouldDumpIo: dumpBrowserLogs,
        // 	browserExecutable,
        // }),
    ]);
    const initPage = async (_browser) => {
        const page = await _browser.newPage();
        // const page = await browserInstance.newPage();
        page.setViewport({
            width: config.width,
            height: config.height,
            deviceScaleFactor: 1,
        });
        const errorCallback = (err) => {
            onError === null || onError === void 0 ? void 0 : onError({ error: err, frame: null });
        };
        page.on('pageerror', errorCallback);
        const initialFrame = typeof frameRange === 'number'
            ? frameRange
            : frameRange === null || frameRange === undefined
                ? 0
                : frameRange[0];
        await (0, set_props_and_env_1.setPropsAndEnv)({
            inputProps,
            envVariables,
            page,
            port,
            initialFrame,
        });
        const site = `http://localhost:${port}/index.html?composition=${compositionId}`;
        await page.goto(site);
        page.off('pageerror', errorCallback);
        return page;
    };
    const pages = concurrentMode === 'browser'
        ? browserInstance.map(initPage)
        : new Array(actualParallelism)
            .fill(true)
            .map(() => initPage(browserInstance[0]));
    let stopCycling;
    if (concurrentMode !== 'browser')
        stopCycling = (0, cycle_browser_tabs_1.cycleBrowserTabs)(browserInstance[0]).stopCycling;
    const puppeteerPages = await Promise.all(pages);
    const pool = new pool_1.Pool(puppeteerPages);
    const frameCount = (0, get_frame_range_1.getFrameCount)(config.durationInFrames, frameRange !== null && frameRange !== void 0 ? frameRange : null);
    // Substract one because 100 frames will be 00-99
    // --> 2 digits
    let filePadLength = 0;
    if (frameCount) {
        filePadLength = String(frameCount - 1).length;
    }
    let framesRendered = 0;
    onStart({
        frameCount,
    });
    const frameRenderTasks = new Array(frameCount)
        .fill(Boolean)
        .map((x, i) => i)
        .map(async (index) => {
        const frame = (0, get_frame_to_render_1.getFrameToRender)(frameRange !== null && frameRange !== void 0 ? frameRange : null, index);
        const freePage = await pool.acquire();
        const paddedIndex = String(frame).padStart(filePadLength, '0');
        const errorCallback = (err) => {
            onError === null || onError === void 0 ? void 0 : onError({ error: err, frame });
        };
        freePage.on('pageerror', errorCallback);
        try {
            await (0, seek_to_frame_1.seekToFrame)({ frame, page: freePage });
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
        let frameBuffer;
        if (imageFormat !== 'none') {
            frameBuffer = await (0, provide_screenshot_1.provideScreenshot)({
                page: freePage,
                imageFormat,
                quality,
                options: {
                    frame,
                    output: parallelEncoding
                        ? undefined
                        : path_1.default.join(outputDir, `element-${paddedIndex}.${imageFormat}`),
                },
            });
        }
        const collectedAssets = await freePage.evaluate(() => {
            return window.remotion_collectAssets();
        });
        pool.release(freePage);
        framesRendered++;
        onFrameUpdate(framesRendered);
        freePage.off('pageerror', errorCallback);
        return { collectedAssets, frameBuffer };
    });
    if (parallelEncoding) {
        for (const i in frameRenderTasks) {
            const o = await frameRenderTasks[i];
            writeFrame === null || writeFrame === void 0 ? void 0 : writeFrame(o.frameBuffer);
        }
    }
    const assets = (await Promise.all(frameRenderTasks)).map((o) => o.collectedAssets);
    close().catch((err) => {
        console.log('Unable to close web server', err);
    });
    stopCycling === null || stopCycling === void 0 ? void 0 : stopCycling();
    // If browser instance was passed in, we close all the pages
    // we opened.
    // If new browser was opened, then closing the browser as a cleanup.
    if (puppeteerInstance) {
        await Promise.all(puppeteerPages.map((p) => p.close())).catch((err) => {
            console.log('Unable to close browser tab', err);
        });
    }
    else {
        browserInstance.forEach((o) => o.close().catch((err) => {
            console.log('Unable to close browser', err);
        }));
    }
    return {
        assetsInfo: {
            assets,
            bundleDir: webpackBundle,
        },
        frameCount,
    };
};
exports.renderFrames = renderFrames;
//# sourceMappingURL=render.js.map