import { BrowserExecutable, FrameRange } from 'remotion';
export declare const getCliOptions: (type: 'still' | 'series') => Promise<{
    parallelism: number | null;
    concurrentMode: "tab" | "browser";
    parallelEncoding: boolean;
    frameRange: FrameRange | null;
    shouldOutputImageSequence: boolean;
    codec: "h264" | "h265" | "vp8" | "vp9" | "mp3" | "aac" | "wav" | "prores" | "h264-mkv";
    overwrite: boolean;
    inputProps: object;
    envVariables: Record<string, string>;
    quality: number | undefined;
    browser: import("remotion").Browser;
    absoluteOutputFile: string;
    crf: number | null;
    pixelFormat: "yuv420p" | "yuva420p" | "yuv422p" | "yuv444p" | "yuv420p10le" | "yuv422p10le" | "yuv444p10le" | "yuva444p10le";
    imageFormat: "png" | "jpeg" | "none";
    proResProfile: "4444-xq" | "4444" | "hq" | "standard" | "light" | "proxy" | undefined;
    stillFrame: number;
    browserExecutable: BrowserExecutable;
}>;
//# sourceMappingURL=get-cli-options.d.ts.map