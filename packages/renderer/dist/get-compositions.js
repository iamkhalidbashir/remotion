"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompositions = void 0;
const remotion_1 = require("remotion");
const open_browser_1 = require("./open-browser");
const serve_static_1 = require("./serve-static");
const set_props_and_env_1 = require("./set-props-and-env");
const getPageAndCleanupFn = async ({ passedInInstance, browser, browserExecutable, }) => {
    if (passedInInstance) {
        const page = await passedInInstance.newPage();
        return {
            page,
            cleanup: () => {
                // Close puppeteer page and don't wait for it to finish.
                // Keep browser open.
                page.close().catch((err) => {
                    console.error('Was not able to close puppeteer page', err);
                });
            },
        };
    }
    const browserInstance = await (0, open_browser_1.openBrowser)(browser || remotion_1.Internals.DEFAULT_BROWSER, {
        browserExecutable,
    });
    const browserPage = await browserInstance.newPage();
    return {
        page: browserPage,
        cleanup: () => {
            // Close whole browser that was just created and don't wait for it to finish.
            browserInstance.close().catch((err) => {
                console.error('Was not able to close puppeteer page', err);
            });
        },
    };
};
const getCompositions = async (webpackBundle, config) => {
    var _a, _b;
    const { page, cleanup } = await getPageAndCleanupFn({
        passedInInstance: config === null || config === void 0 ? void 0 : config.browserInstance,
        browser: (_a = config === null || config === void 0 ? void 0 : config.browser) !== null && _a !== void 0 ? _a : remotion_1.Internals.DEFAULT_BROWSER,
        browserExecutable: (_b = config === null || config === void 0 ? void 0 : config.browserExecutable) !== null && _b !== void 0 ? _b : null,
    });
    const { port, close } = await (0, serve_static_1.serveStatic)(webpackBundle);
    page.on('error', console.error);
    page.on('pageerror', console.error);
    await (0, set_props_and_env_1.setPropsAndEnv)({
        inputProps: config === null || config === void 0 ? void 0 : config.inputProps,
        envVariables: config === null || config === void 0 ? void 0 : config.envVariables,
        page,
        port,
        initialFrame: 0,
    });
    await page.goto(`http://localhost:${port}/index.html?evaluation=true`);
    await page.waitForFunction('window.ready === true');
    const result = await page.evaluate('window.getStaticCompositions()');
    // Close web server and don't wait for it to finish,
    // it is slow.
    close().catch((err) => {
        console.error('Was not able to close web server', err);
    });
    cleanup();
    return result;
};
exports.getCompositions = getCompositions;
//# sourceMappingURL=get-compositions.js.map