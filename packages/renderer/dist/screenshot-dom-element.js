"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenshotDOMElement = void 0;
const puppeteer_screenshot_1 = require("./puppeteer-screenshot");
const screenshotDOMElement = async ({ page, imageFormat, quality, opts = {}, }) => {
    const path = 'path' in opts ? opts.path : undefined;
    const { selector } = opts;
    if (!selector)
        throw Error('Please provide a selector.');
    // if (!path) throw Error('Please provide a path.');
    if (imageFormat === 'png') {
        await page.evaluate(() => {
            document.body.style.background = 'transparent';
        });
    }
    if (imageFormat === 'none') {
        throw new TypeError('Tried to make a screenshot with format "none"');
    }
    return (0, puppeteer_screenshot_1.screenshot)(page, {
        omitBackground: imageFormat === 'png',
        path,
        type: imageFormat,
        quality,
    });
};
exports.screenshotDOMElement = screenshotDOMElement;
//# sourceMappingURL=screenshot-dom-element.js.map