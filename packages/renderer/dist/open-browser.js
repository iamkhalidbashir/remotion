"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openBrowser = void 0;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const remotion_1 = require("remotion");
const get_local_browser_executable_1 = require("./get-local-browser-executable");
const openBrowser = async (browser, options) => {
    var _a, _b, _c;
    if (browser === 'firefox' && !remotion_1.Internals.FEATURE_FLAG_FIREFOX_SUPPORT) {
        throw new TypeError('Firefox supported is not yet turned on. Stay tuned for the future.');
    }
    await (0, get_local_browser_executable_1.ensureLocalBrowser)(browser, (_a = options === null || options === void 0 ? void 0 : options.browserExecutable) !== null && _a !== void 0 ? _a : null);
    const executablePath = await (0, get_local_browser_executable_1.getLocalBrowserExecutable)(browser, (_b = options === null || options === void 0 ? void 0 : options.browserExecutable) !== null && _b !== void 0 ? _b : null);
    const browserInstance = await puppeteer_core_1.default.launch({
        executablePath,
        product: browser,
        dumpio: (_c = options === null || options === void 0 ? void 0 : options.shouldDumpIo) !== null && _c !== void 0 ? _c : false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            process.platform === 'linux' ? '--single-process' : null,
            ...((options === null || options === void 0 ? void 0 : options.additionalArgs) || []),
        ].filter(Boolean),
    });
    return browserInstance;
};
exports.openBrowser = openBrowser;
//# sourceMappingURL=open-browser.js.map