import { Browser as PuppeteerBrowser } from 'puppeteer-core';
import { Browser, BrowserExecutable, TCompMetadata } from 'remotion';
/**
 * @description Render a still frame from a composition and returns an image path
 */
export declare const renderStill: ({ composition, quality, imageFormat, webpackBundle, browser, puppeteerInstance, dumpBrowserLogs, onError, inputProps, envVariables, output, frame, overwrite, browserExecutable, }: {
    composition: TCompMetadata;
    output: string;
    webpackBundle: string;
    frame?: number | undefined;
    inputProps?: unknown;
    imageFormat?: "png" | "jpeg" | undefined;
    quality?: number | undefined;
    browser?: Browser | undefined;
    puppeteerInstance?: PuppeteerBrowser | undefined;
    dumpBrowserLogs?: boolean | undefined;
    onError?: ((err: Error) => void) | undefined;
    envVariables?: Record<string, string> | undefined;
    overwrite?: boolean | undefined;
    browserExecutable?: BrowserExecutable | undefined;
}) => Promise<void>;
//# sourceMappingURL=render-still.d.ts.map