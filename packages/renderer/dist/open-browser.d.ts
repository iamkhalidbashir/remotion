import puppeteer from 'puppeteer-core';
import { Browser } from 'remotion';
export declare const openBrowser: (browser: Browser, options?: {
    shouldDumpIo?: boolean | undefined;
    browserExecutable?: string | null | undefined;
    additionalArgs?: string[] | null | undefined;
} | undefined) => Promise<puppeteer.Browser>;
//# sourceMappingURL=open-browser.d.ts.map