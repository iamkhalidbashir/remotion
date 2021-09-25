"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideScreenshot = void 0;
const screenshot_dom_element_1 = require("./screenshot-dom-element");
const provideScreenshot = async ({ page, imageFormat, options, quality, }) => {
    // console.log(options.output);
    return (0, screenshot_dom_element_1.screenshotDOMElement)({
        page,
        opts: {
            path: options.output,
            selector: '#canvas',
        },
        imageFormat,
        quality,
    });
};
exports.provideScreenshot = provideScreenshot;
//# sourceMappingURL=provide-screenshot.js.map