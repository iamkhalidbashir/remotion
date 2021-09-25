"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const renderer_1 = require("@remotion/renderer");
const get_concurrency_1 = require("@remotion/renderer/dist/get-concurrency");
const stitcher_1 = require("@remotion/renderer/dist/stitcher");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const get_cli_options_1 = require("./get-cli-options");
const get_composition_id_1 = require("./get-composition-id");
const handle_common_errors_1 = require("./handle-common-errors");
const initialize_render_cli_1 = require("./initialize-render-cli");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const progress_bar_1 = require("./progress-bar");
const setup_cache_1 = require("./setup-cache");
const user_passed_output_location_1 = require("./user-passed-output-location");
const validate_ffmpeg_version_1 = require("./validate-ffmpeg-version");
const onError = async (info) => {
    log_1.Log.error();
    if (info.frame === null) {
        log_1.Log.error('The following error occured when trying to initialize the video rendering:');
    }
    else {
        log_1.Log.error(`The following error occurred when trying to render frame ${info.frame}:`);
    }
    (0, handle_common_errors_1.handleCommonError)(info.error);
    process.exit(1);
};
const render = async () => {
    var _a, _b, _c, _d;
    const startTime = Date.now();
    const file = parse_command_line_1.parsedCli._[1];
    const fullPath = path_1.default.join(process.cwd(), file);
    (0, initialize_render_cli_1.initializeRenderCli)('sequence');
    const { codec, proResProfile, parallelism, concurrentMode, parallelEncoding, frameRange, shouldOutputImageSequence, absoluteOutputFile, overwrite, inputProps, envVariables, quality, browser, crf, pixelFormat, imageFormat, browserExecutable, } = await (0, get_cli_options_1.getCliOptions)('series');
    await (0, validate_ffmpeg_version_1.checkAndValidateFfmpegVersion)();
    const actualParallelism = (0, get_concurrency_1.getActualConcurrency)(parallelism !== null && parallelism !== void 0 ? parallelism : null);
    const browserInstance = Promise.all(new Array(concurrentMode === 'browser' ? actualParallelism : 1)
        .fill(true)
        .map(() => renderer_1.RenderInternals.openBrowser(browser, {
        browserExecutable,
        shouldDumpIo: remotion_1.Internals.Logging.isEqualOrBelowLogLevel('verbose'),
    })));
    if (shouldOutputImageSequence) {
        fs_1.default.mkdirSync(absoluteOutputFile, {
            recursive: true,
        });
    }
    const steps = shouldOutputImageSequence ? 2 : 3;
    const bundled = await (0, setup_cache_1.bundleOnCli)(fullPath, steps);
    const openedBrowser = await browserInstance;
    const comps = await (0, renderer_1.getCompositions)(bundled, {
        browser,
        inputProps,
        browserInstance: openedBrowser[0],
        envVariables,
    });
    const compositionId = (0, get_composition_id_1.getCompositionId)(comps);
    const config = comps.find((c) => c.id === compositionId);
    if (!config) {
        throw new Error(`Cannot find composition with ID ${compositionId}`);
    }
    renderer_1.RenderInternals.validateEvenDimensionsWithCodec({
        width: config.width,
        height: config.height,
        codec,
    });
    const outputDir = shouldOutputImageSequence
        ? absoluteOutputFile
        : await fs_1.default.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'react-motion-render'));
    log_1.Log.verbose('Output dir', outputDir);
    const renderProgress = (0, progress_bar_1.createProgressBar)();
    let totalFrames = 0;
    const renderStart = Date.now();
    let stitcherFfmpeg;
    let preStitcher;
    let encodedFrames;
    let renderedFrames;
    let preEncodedFileLocation;
    const updateRenderProgress = () => renderProgress.update((0, progress_bar_1.makeRenderingProgress)({
        frames: renderedFrames || 0,
        encodedFrames,
        totalFrames,
        concurrency: renderer_1.RenderInternals.getActualConcurrency(parallelism),
        doneIn: null,
        steps,
    }));
    if (parallelEncoding) {
        if (typeof crf !== 'number') {
            throw new TypeError('CRF is unexpectedly not a number');
        }
        preEncodedFileLocation = path_1.default.join(outputDir, 'pre-encode.' + (0, user_passed_output_location_1.getUserPassedFileExtension)());
        preStitcher = await (0, stitcher_1.spawnFfmpeg)({
            dir: outputDir,
            width: config.width,
            height: config.height,
            fps: config.fps,
            outputLocation: preEncodedFileLocation,
            force: true,
            imageFormat,
            pixelFormat,
            codec,
            proResProfile,
            crf,
            parallelism,
            onProgress: (frame) => {
                encodedFrames = frame;
                updateRenderProgress();
            },
            verbose: remotion_1.Internals.Logging.isEqualOrBelowLogLevel('verbose'),
            parallelEncoding,
            assetsInfo: { assets: [], bundleDir: bundled },
        });
        stitcherFfmpeg = preStitcher.task;
    }
    const renderer = (0, renderer_1.renderFrames)({
        config,
        onFrameUpdate: (frame) => {
            renderedFrames = frame;
            updateRenderProgress();
        },
        parallelism,
        concurrentMode,
        parallelEncoding,
        compositionId,
        outputDir,
        onError,
        onStart: ({ frameCount: fc }) => {
            renderedFrames = 0;
            if (parallelEncoding)
                encodedFrames = 0;
            totalFrames = fc;
            updateRenderProgress();
        },
        inputProps,
        envVariables,
        webpackBundle: bundled,
        imageFormat,
        quality,
        browser,
        frameRange: frameRange !== null && frameRange !== void 0 ? frameRange : null,
        dumpBrowserLogs: remotion_1.Internals.Logging.isEqualOrBelowLogLevel('verbose'),
        puppeteerInstance: openedBrowser,
        writeFrame: async (buffer) => {
            var _a;
            (_a = stitcherFfmpeg === null || stitcherFfmpeg === void 0 ? void 0 : stitcherFfmpeg.stdin) === null || _a === void 0 ? void 0 : _a.write(buffer);
        },
    });
    const { assetsInfo } = await renderer;
    if (stitcherFfmpeg) {
        (_a = stitcherFfmpeg === null || stitcherFfmpeg === void 0 ? void 0 : stitcherFfmpeg.stdin) === null || _a === void 0 ? void 0 : _a.end();
        await stitcherFfmpeg;
        (_b = preStitcher === null || preStitcher === void 0 ? void 0 : preStitcher.cleanup) === null || _b === void 0 ? void 0 : _b.call(preStitcher);
    }
    const closeBrowserPromise = openedBrowser.map((o) => o.close());
    renderProgress.update((0, progress_bar_1.makeRenderingProgress)({
        frames: totalFrames,
        encodedFrames: parallelEncoding ? totalFrames : undefined,
        totalFrames,
        steps,
        concurrency: renderer_1.RenderInternals.getActualConcurrency(parallelism),
        doneIn: Date.now() - renderStart,
    }) + '\n');
    if (process.env.DEBUG) {
        remotion_1.Internals.perf.logPerf();
    }
    if (shouldOutputImageSequence) {
        log_1.Log.info(chalk_1.default.green('\nYour image sequence is ready!'));
    }
    else {
        if (typeof crf !== 'number') {
            throw new TypeError('CRF is unexpectedly not a number');
        }
        const stitchingProgress = (0, progress_bar_1.createProgressBar)();
        stitchingProgress.update((0, progress_bar_1.makeStitchingProgress)({
            doneIn: null,
            frames: 0,
            steps,
            totalFrames,
            parallelEncoding,
        }));
        const stitchStart = Date.now();
        await (0, renderer_1.stitchFramesToVideo)({
            dir: outputDir,
            width: config.width,
            height: config.height,
            fps: config.fps,
            outputLocation: absoluteOutputFile,
            preEncodedFileLocation,
            force: overwrite,
            imageFormat,
            pixelFormat,
            codec,
            proResProfile,
            crf,
            assetsInfo,
            parallelism,
            onProgress: (frame) => {
                stitchingProgress.update((0, progress_bar_1.makeStitchingProgress)({
                    doneIn: null,
                    frames: frame,
                    steps,
                    totalFrames,
                    parallelEncoding,
                }));
            },
            onDownload: (src) => {
                log_1.Log.info('Downloading asset... ', src);
            },
            verbose: remotion_1.Internals.Logging.isEqualOrBelowLogLevel('verbose'),
        });
        stitchingProgress.update((0, progress_bar_1.makeStitchingProgress)({
            doneIn: Date.now() - stitchStart,
            frames: totalFrames,
            steps,
            totalFrames,
            parallelEncoding,
        }) + '\n');
        log_1.Log.verbose('Cleaning up...');
        try {
            await Promise.all([
                ((_c = fs_1.default.promises.rm) !== null && _c !== void 0 ? _c : fs_1.default.promises.rmdir)(outputDir, {
                    recursive: true,
                }),
                ((_d = fs_1.default.promises.rm) !== null && _d !== void 0 ? _d : fs_1.default.promises.rmdir)(bundled, {
                    recursive: true,
                }),
            ]);
        }
        catch (err) {
            log_1.Log.warn('Could not clean up directory.');
            log_1.Log.warn(err);
            log_1.Log.warn('Do you have minimum required Node.js version?');
        }
        log_1.Log.info(chalk_1.default.green('\nYour video is ready!'));
    }
    const seconds = Math.round((Date.now() - startTime) / 1000);
    log_1.Log.info([
        '- Total render time:',
        seconds,
        seconds === 1 ? 'second' : 'seconds',
    ].join(' '));
    log_1.Log.info('-', 'Output can be found at:');
    log_1.Log.info(chalk_1.default.cyan(`▶️ ${absoluteOutputFile}`));
    await closeBrowserPromise;
};
exports.render = render;
//# sourceMappingURL=render.js.map