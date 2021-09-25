/// <reference types="node" />
import puppeteer from 'puppeteer-core';
import { ImageFormat } from 'remotion';
export declare const provideScreenshot: ({ page, imageFormat, options, quality, }: {
    page: puppeteer.Page;
    imageFormat: ImageFormat;
    quality: number | undefined;
    options: {
        frame: number;
        output?: string;
    };
}) => Promise<Buffer>;
//# sourceMappingURL=provide-screenshot.d.ts.map