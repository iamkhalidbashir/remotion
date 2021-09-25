import { Browser } from './browser';
import { BrowserExecutable } from './browser-executable';
import { Codec } from './codec';
import { Concurrency } from './concurrency';
import { ConcurrentMode } from './concurrent-mode';
import { FrameRange } from './frame-range';
import { ImageFormat } from './image-format';
import { LogLevel } from './log';
import { WebpackConfiguration, WebpackOverrideFn } from './override-webpack';
import { PixelFormat } from './pixel-format';
export declare const Config: {
    readonly Preview: {
        /**
         * Change the maximum amount of tracks that are shown in the timeline.
         * @param maxTracks The maximum amount of timeline tracks that you would like to show.
         * @default 15
         */
        readonly setMaxTimelineTracks: (maxTracks: number) => void;
    };
    readonly Bundling: {
        /**
         * Pass in a function which takes the current Webpack config
         * and return a modified Webpack configuration.
         * Docs: http://remotion.dev/docs/webpack
         */
        readonly overrideWebpackConfig: (fn: WebpackOverrideFn) => void;
        /**
         * Whether Webpack bundles should be cached to make
         * subsequent renders faster. Default: true
         */
        readonly setCachingEnabled: (flag: boolean) => void;
        /**
         * Define on which port Remotion should start it's HTTP servers during preview and rendering.
         * By default, Remotion will try to find a free port.
         * If you specify a port, but it's not available, Remotion will throw an error.
         */
        readonly setPort: (port: number | undefined) => void;
    };
    readonly Log: {
        /**
         * Set the log level.
         * Acceptable values: 'error' | 'warning' | 'info' | 'verbose'
         * Default value: 'info'
         *
         * Set this to 'verbose' to get browser logs and other IO.
         */
        readonly setLevel: (newLogLevel: "verbose" | "info" | "warn" | "error") => void;
    };
    readonly Puppeteer: {
        /**
         * Specify executable path for the browser to use.
         * Default: null, which will make Remotion find or download a version of said browser.
         */
        readonly setBrowserExecutable: (newBrowserExecutablePath: BrowserExecutable) => void;
    };
    readonly Rendering: {
        /**
         * Set a custom location for a .env file.
         * Default: `.env`
         */
        readonly setDotEnvLocation: (file: string) => void;
        /**
         * Sets how many Puppeteer instances will work on rendering your video in parallel.
         * Default: `null`, meaning half of the threads available on your CPU.
         */
        readonly setConcurrency: (newConcurrency: Concurrency) => void;
        /**
         * Set the JPEG quality for the frames.
         * Must be between 0 and 100.
         * Must be between 0 and 100.
         * Default: 80
         */
        readonly setQuality: (q: number | undefined) => void;
        /** Decide in which image format to render. Can be either 'jpeg' or 'png'.
         * PNG is slower, but supports transparency.
         */
        readonly setImageFormat: (format: "none" | "png" | "jpeg") => void;
        /**
         * Render only a subset of a video.
         * Pass in a tuple [20, 30] to only render frames 20-30 into a video.
         * Pass in a single number `20` to only render a single frame as an image.
         * The frame count starts at 0.
         */
        readonly setFrameRange: (newFrameRange: FrameRange | null) => void;
        /**
         * Set the concurrent mode.
         * Pass in 'tab' and the renderer will launch a single browser and pages will be opened in multiple tabs.
         * Pass in 'browser' and the renderer will launch multiple browsers and open one page in each browser.
         * Use 'browser' to maximize CPU utilization and render faster.
         */
        readonly setConcurrentMode: (mode: "tab" | "browser") => void;
        /**
         * Enabling parallel encoding means render frames and encode video at the same time.
         * The image will be passed directly into ffmpeg.
         */
        readonly setParallelEncoding: (value: boolean) => void;
    };
    readonly Output: {
        /**
         * If the video file already exists, should Remotion overwrite
         * the output? Default: true
         */
        readonly setOverwriteOutput: (newOverwrite: boolean) => void;
        /**
         * Sets the pixel format in FFMPEG.
         * See https://trac.ffmpeg.org/wiki/Chroma%20Subsampling for an explanation.
         * You can override this using the `--pixel-format` Cli flag.
         */
        readonly setPixelFormat: (format: "yuv420p" | "yuva420p" | "yuv422p" | "yuv444p" | "yuv420p10le" | "yuv422p10le" | "yuv444p10le" | "yuva444p10le") => void;
        /**
         * @deprecated Use setCodec() and setImageSequence() instead.
         * Specify what kind of output you, either `mp4` or `png-sequence`.
         */
        readonly setOutputFormat: (newLegacyFormat: "mp4" | "png-sequence") => void;
        /**
         * Specify the codec for stitching the frames into a video.
         * Can be `h264` (default), `h265`, `vp8` or `vp9`
         */
        readonly setCodec: (newCodec: import("./codec").CodecOrUndefined) => void;
        /**
         * Set the Constant Rate Factor to pass to FFMPEG.
         * Lower values mean better quality, but be aware that the ranges of
         * possible values greatly differs between codecs.
         */
        readonly setCrf: (newCrf: number | undefined) => void;
        /**
         * Set to true if don't want a video but an image sequence as the output.
         */
        readonly setImageSequence: (newImageSequence: boolean) => void;
        /**
         * Set the ProRes profile.
         * This method is only valid if the codec has been set to 'prores'.
         * Possible values: 4444-xq, 4444, hq, standard, light, proxy. Default: 'hq'
         * See https://avpres.net/FFmpeg/im_ProRes.html for meaning of possible values.
         */
        readonly setProResProfile: (profile: "light" | "4444-xq" | "4444" | "hq" | "standard" | "proxy" | undefined) => void;
    };
};
export type { PixelFormat, Concurrency, WebpackConfiguration, WebpackOverrideFn, BrowserExecutable, ImageFormat, Codec, Browser, FrameRange, LogLevel, ConcurrentMode, };
//# sourceMappingURL=index.d.ts.map