import { Browser as PuppeteerBrowser } from 'puppeteer-core';
import { Browser, BrowserExecutable, ConcurrentMode, FrameRange, ImageFormat, VideoConfig } from 'remotion';
import { OnErrorInfo, OnStartData, RenderFramesOutput } from './types';
export declare const renderFrames: ({ config, parallelism, onFrameUpdate, compositionId, outputDir, onStart, inputProps, envVariables, webpackBundle, quality, imageFormat, browser, frameRange, dumpBrowserLogs, puppeteerInstance, onError, browserExecutable, concurrentMode, parallelEncoding, writeFrame, }: {
    config: VideoConfig;
    compositionId: string;
    onStart: (data: OnStartData) => void;
    onFrameUpdate: (f: number) => void;
    outputDir: string;
    inputProps: unknown;
    envVariables?: Record<string, string> | undefined;
    webpackBundle: string;
    imageFormat: ImageFormat;
    parallelism?: number | null | undefined;
    quality?: number | undefined;
    browser?: Browser | undefined;
    frameRange?: FrameRange | null | undefined;
    dumpBrowserLogs?: boolean | undefined;
    puppeteerInstance?: PuppeteerBrowser[] | undefined;
    browserExecutable?: BrowserExecutable | undefined;
    onError?: ((info: OnErrorInfo) => void) | undefined;
    concurrentMode?: "tab" | "browser" | undefined;
    parallelEncoding?: boolean | undefined;
    writeFrame?: ((buffer?: Buffer | undefined) => void) | undefined;
}) => Promise<RenderFramesOutput>;
//# sourceMappingURL=render.d.ts.map