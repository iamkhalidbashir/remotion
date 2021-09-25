"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.still = void 0;
const renderer_1 = require("@remotion/renderer");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
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
const still = async () => {
    const startTime = Date.now();
    const file = parse_command_line_1.parsedCli._[1];
    const fullPath = path_1.default.join(process.cwd(), file);
    (0, initialize_render_cli_1.initializeRenderCli)('still');
    const userOutput = path_1.default.resolve(process.cwd(), (0, user_passed_output_location_1.getUserPassedOutputLocation)());
    if (userOutput.endsWith('.jpeg') || userOutput.endsWith('.jpg')) {
        log_1.Log.verbose('Output file has a JPEG extension, therefore setting the image format to JPEG.');
        remotion_1.Config.Rendering.setImageFormat('jpeg');
    }
    if (userOutput.endsWith('.png')) {
        log_1.Log.verbose('Output file has a PNG extension, therefore setting the image format to PNG.');
        remotion_1.Config.Rendering.setImageFormat('png');
    }
    const { inputProps, envVariables, quality, browser, imageFormat, stillFrame, browserExecutable, } = await (0, get_cli_options_1.getCliOptions)('still');
    if (imageFormat === 'none') {
        log_1.Log.error('No image format was selected - this is probably an error in Remotion - please post your command on Github Issues for help.');
        process.exit(1);
    }
    if (imageFormat === 'png' && !userOutput.endsWith('.png')) {
        log_1.Log.warn(`Rendering a PNG, expected a .png extension but got ${userOutput}`);
    }
    if (imageFormat === 'jpeg' &&
        !userOutput.endsWith('.jpg') &&
        !userOutput.endsWith('.jpeg')) {
        log_1.Log.warn(`Rendering a JPEG, expected a .jpg or .jpeg extension but got ${userOutput}`);
    }
    const browserInstance = renderer_1.RenderInternals.openBrowser(browser, {
        browserExecutable,
        shouldDumpIo: remotion_1.Internals.Logging.isEqualOrBelowLogLevel('verbose'),
    });
    (0, fs_1.mkdirSync)(path_1.default.join(userOutput, '..'), {
        recursive: true,
    });
    const steps = 2;
    const bundled = await (0, setup_cache_1.bundleOnCli)(fullPath, steps);
    const openedBrowser = await browserInstance;
    const comps = await (0, renderer_1.getCompositions)(bundled, {
        browser,
        inputProps,
        browserInstance: openedBrowser,
        envVariables,
    });
    const compositionId = (0, get_composition_id_1.getCompositionId)(comps);
    const composition = comps.find((c) => c.id === compositionId);
    if (!composition) {
        throw new Error(`Cannot find composition with ID ${compositionId}`);
    }
    const renderProgress = (0, progress_bar_1.createProgressBar)();
    const renderStart = Date.now();
    await (0, renderer_1.renderStill)({
        composition,
        frame: stillFrame,
        output: userOutput,
        webpackBundle: bundled,
        quality,
        browser,
        dumpBrowserLogs: remotion_1.Internals.Logging.isEqualOrBelowLogLevel('verbose'),
        envVariables,
        imageFormat,
        inputProps,
        onError: (err) => {
            log_1.Log.error();
            log_1.Log.error('The following error occured when rendering the still:');
            (0, handle_common_errors_1.handleCommonError)(err);
            process.exit(1);
        },
        puppeteerInstance: openedBrowser,
        overwrite: remotion_1.Internals.getShouldOverwrite(),
    });
    const closeBrowserPromise = openedBrowser.close();
    renderProgress.update((0, progress_bar_1.makeRenderingProgress)({
        frames: 1,
        concurrency: 1,
        doneIn: Date.now() - renderStart,
        steps,
        totalFrames: 1,
    }));
    log_1.Log.info(chalk_1.default.green('\nYour still frame is ready!'));
    const seconds = Math.round((Date.now() - startTime) / 1000);
    log_1.Log.info([
        '- Total render time:',
        seconds,
        seconds === 1 ? 'second' : 'seconds',
    ].join(' '));
    log_1.Log.info('-', 'Output can be found at:');
    log_1.Log.info(chalk_1.default.cyan(`▶️ ${userOutput}`));
    await closeBrowserPromise;
};
exports.still = still;
//# sourceMappingURL=still.js.map