import { Browser as PuppeteerBrowser } from 'puppeteer-core';
import { Browser, BrowserExecutable, TCompMetadata } from 'remotion';
declare type GetCompositionsConfig = {
    browser?: Browser;
    inputProps?: object | null;
    envVariables?: Record<string, string>;
    browserInstance?: PuppeteerBrowser;
    browserExecutable?: BrowserExecutable;
};
export declare const getCompositions: (webpackBundle: string, config?: GetCompositionsConfig | undefined) => Promise<TCompMetadata[]>;
export {};
//# sourceMappingURL=get-compositions.d.ts.map