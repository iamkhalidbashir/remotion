"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const browser_executable_1 = require("./browser-executable");
const codec_1 = require("./codec");
const concurrency_1 = require("./concurrency");
const concurrent_mode_1 = require("./concurrent-mode");
const crf_1 = require("./crf");
const env_file_1 = require("./env-file");
const frame_range_1 = require("./frame-range");
const image_format_1 = require("./image-format");
const image_sequence_1 = require("./image-sequence");
const log_1 = require("./log");
const max_timeline_tracks_1 = require("./max-timeline-tracks");
const override_webpack_1 = require("./override-webpack");
const overwrite_1 = require("./overwrite");
const parallel_encoding_1 = require("./parallel-encoding");
const pixel_format_1 = require("./pixel-format");
const preview_server_1 = require("./preview-server");
const prores_profile_1 = require("./prores-profile");
const quality_1 = require("./quality");
const webpack_caching_1 = require("./webpack-caching");
exports.Config = {
    Preview: {
        /**
         * Change the maximum amount of tracks that are shown in the timeline.
         * @param maxTracks The maximum amount of timeline tracks that you would like to show.
         * @default 15
         */
        setMaxTimelineTracks: max_timeline_tracks_1.setMaxTimelineTracks,
    },
    Bundling: {
        /**
         * Pass in a function which takes the current Webpack config
         * and return a modified Webpack configuration.
         * Docs: http://remotion.dev/docs/webpack
         */
        overrideWebpackConfig: override_webpack_1.overrideWebpackConfig,
        /**
         * Whether Webpack bundles should be cached to make
         * subsequent renders faster. Default: true
         */
        setCachingEnabled: webpack_caching_1.setWebpackCaching,
        /**
         * Define on which port Remotion should start it's HTTP servers during preview and rendering.
         * By default, Remotion will try to find a free port.
         * If you specify a port, but it's not available, Remotion will throw an error.
         */
        setPort: preview_server_1.setPort,
    },
    Log: {
        /**
         * Set the log level.
         * Acceptable values: 'error' | 'warning' | 'info' | 'verbose'
         * Default value: 'info'
         *
         * Set this to 'verbose' to get browser logs and other IO.
         */
        setLevel: log_1.setLogLevel,
    },
    Puppeteer: {
        /**
         * Specify executable path for the browser to use.
         * Default: null, which will make Remotion find or download a version of said browser.
         */
        setBrowserExecutable: browser_executable_1.setBrowserExecutable,
    },
    Rendering: {
        /**
         * Set a custom location for a .env file.
         * Default: `.env`
         */
        setDotEnvLocation: env_file_1.setDotEnvLocation,
        /**
         * Sets how many Puppeteer instances will work on rendering your video in parallel.
         * Default: `null`, meaning half of the threads available on your CPU.
         */
        setConcurrency: concurrency_1.setConcurrency,
        /**
         * Set the JPEG quality for the frames.
         * Must be between 0 and 100.
         * Must be between 0 and 100.
         * Default: 80
         */
        setQuality: quality_1.setQuality,
        /** Decide in which image format to render. Can be either 'jpeg' or 'png'.
         * PNG is slower, but supports transparency.
         */
        setImageFormat: image_format_1.setImageFormat,
        /**
         * Render only a subset of a video.
         * Pass in a tuple [20, 30] to only render frames 20-30 into a video.
         * Pass in a single number `20` to only render a single frame as an image.
         * The frame count starts at 0.
         */
        setFrameRange: frame_range_1.setFrameRange,
        /**
         * Set the concurrent mode.
         * Pass in 'tab' and the renderer will launch a single browser and pages will be opened in multiple tabs.
         * Pass in 'browser' and the renderer will launch multiple browsers and open one page in each browser.
         * Use 'browser' to maximize CPU utilization and render faster.
         */
        setConcurrentMode: concurrent_mode_1.setConcurrentMode,
        /**
         * Enabling parallel encoding means render frames and encode video at the same time.
         * The image will be passed directly into ffmpeg.
         */
        setParallelEncoding: parallel_encoding_1.setParallelEncoding,
    },
    Output: {
        /**
         * If the video file already exists, should Remotion overwrite
         * the output? Default: true
         */
        setOverwriteOutput: overwrite_1.setOverwriteOutput,
        /**
         * Sets the pixel format in FFMPEG.
         * See https://trac.ffmpeg.org/wiki/Chroma%20Subsampling for an explanation.
         * You can override this using the `--pixel-format` Cli flag.
         */
        setPixelFormat: pixel_format_1.setPixelFormat,
        /**
         * @deprecated Use setCodec() and setImageSequence() instead.
         * Specify what kind of output you, either `mp4` or `png-sequence`.
         */
        setOutputFormat: codec_1.setOutputFormat,
        /**
         * Specify the codec for stitching the frames into a video.
         * Can be `h264` (default), `h265`, `vp8` or `vp9`
         */
        setCodec: codec_1.setCodec,
        /**
         * Set the Constant Rate Factor to pass to FFMPEG.
         * Lower values mean better quality, but be aware that the ranges of
         * possible values greatly differs between codecs.
         */
        setCrf: crf_1.setCrf,
        /**
         * Set to true if don't want a video but an image sequence as the output.
         */
        setImageSequence: image_sequence_1.setImageSequence,
        /**
         * Set the ProRes profile.
         * This method is only valid if the codec has been set to 'prores'.
         * Possible values: 4444-xq, 4444, hq, standard, light, proxy. Default: 'hq'
         * See https://avpres.net/FFmpeg/im_ProRes.html for meaning of possible values.
         */
        setProResProfile: prores_profile_1.setProResProfile,
    },
};
//# sourceMappingURL=index.js.map