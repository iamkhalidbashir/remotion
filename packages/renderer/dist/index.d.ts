import { TAsset, TCompMetadata } from 'remotion';
declare global {
    interface Window {
        ready: boolean;
        getStaticCompositions: () => TCompMetadata[];
        remotion_setFrame: (frame: number) => void;
        remotion_collectAssets: () => TAsset[];
    }
}
export { FfmpegVersion } from './ffmpeg-flags';
export { getCompositions } from './get-compositions';
export { renderFrames } from './render';
export { renderStill } from './render-still';
export { stitchFramesToVideo } from './stitcher';
export { OnErrorInfo, OnStartData, RenderFramesOutput } from './types';
export declare const RenderInternals: {
    ensureLocalBrowser: (browser: import("remotion").Browser, preferredBrowserExecutable: import("remotion").BrowserExecutable) => Promise<void>;
    ffmpegHasFeature: (feature: "enable-gpl" | "enable-libx265" | "enable-libvpx") => Promise<boolean>;
    getActualConcurrency: (userPreference: number | null) => number;
    getFfmpegVersion: () => Promise<import("./ffmpeg-flags").FfmpegVersion>;
    openBrowser: (browser: import("remotion").Browser, options?: {
        shouldDumpIo?: boolean | undefined;
        browserExecutable?: string | null | undefined;
    } | undefined) => Promise<import("puppeteer-core").Browser>;
    validateFfmpeg: () => Promise<void>;
    binaryExists: (name: "ffmpeg" | "brew") => Promise<boolean>;
    getFfmpegBuildInfo: () => Promise<string>;
    validateEvenDimensionsWithCodec: ({ width, height, codec, }: {
        width: number;
        height: number;
        codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv";
    }) => void;
};
//# sourceMappingURL=index.d.ts.map