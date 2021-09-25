"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCliOptions = void 0;
const renderer_1 = require("@remotion/renderer");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const get_env_1 = require("./get-env");
const get_filename_1 = require("./get-filename");
const get_input_props_1 = require("./get-input-props");
const image_formats_1 = require("./image-formats");
const log_1 = require("./log");
const user_passed_output_location_1 = require("./user-passed-output-location");
const getAndValidateFrameRange = () => {
    const frameRange = remotion_1.Internals.getRange();
    if (typeof frameRange === 'number') {
        log_1.Log.warn('Selected a single frame. Assuming you want to output an image.');
        log_1.Log.warn(`If you want to render a video, pass a range:  '--frames=${frameRange}-${frameRange}'.`);
        log_1.Log.warn("To dismiss this message, add the '--sequence' flag explicitly.");
    }
    return frameRange;
};
const getFinalCodec = async () => {
    const userCodec = remotion_1.Internals.getOutputCodecOrUndefined();
    const codec = remotion_1.Internals.getFinalOutputCodec({
        codec: userCodec,
        fileExtension: (0, user_passed_output_location_1.getUserPassedFileExtension)(),
        emitWarning: true,
    });
    if (codec === 'vp8' &&
        !(await renderer_1.RenderInternals.ffmpegHasFeature('enable-libvpx'))) {
        log_1.Log.error("The Vp8 codec has been selected, but your FFMPEG binary wasn't compiled with the --enable-lipvpx flag.");
        log_1.Log.error('This does not work, please switch out your FFMPEG binary or choose a different codec.');
    }
    if (codec === 'h265' &&
        !(await renderer_1.RenderInternals.ffmpegHasFeature('enable-gpl'))) {
        log_1.Log.error("The H265 codec has been selected, but your FFMPEG binary wasn't compiled with the --enable-gpl flag.");
        log_1.Log.error('This does not work, please recompile your FFMPEG binary with --enable-gpl --enable-libx265 or choose a different codec.');
    }
    if (codec === 'h265' &&
        !(await renderer_1.RenderInternals.ffmpegHasFeature('enable-libx265'))) {
        log_1.Log.error("The H265 codec has been selected, but your FFMPEG binary wasn't compiled with the --enable-libx265 flag.");
        log_1.Log.error('This does not work, please recompile your FFMPEG binary with --enable-gpl --enable-libx265 or choose a different codec.');
    }
    return codec;
};
const getBrowser = () => {
    var _a;
    return (_a = remotion_1.Internals.getBrowser()) !== null && _a !== void 0 ? _a : remotion_1.Internals.DEFAULT_BROWSER;
};
const getAndValidateAbsoluteOutputFile = (outputFile, overwrite) => {
    const absoluteOutputFile = path_1.default.resolve(process.cwd(), outputFile);
    if (fs_1.default.existsSync(absoluteOutputFile) && !overwrite) {
        log_1.Log.error(`File at ${absoluteOutputFile} already exists. Use --overwrite to overwrite.`);
        process.exit(1);
    }
    return absoluteOutputFile;
};
const getAndValidateShouldOutputImageSequence = async (frameRange) => {
    const shouldOutputImageSequence = remotion_1.Internals.getShouldOutputImageSequence(frameRange);
    if (!shouldOutputImageSequence) {
        await renderer_1.RenderInternals.validateFfmpeg();
    }
    return shouldOutputImageSequence;
};
const getAndValidateCrf = (shouldOutputImageSequence, codec) => {
    const crf = shouldOutputImageSequence ? null : remotion_1.Internals.getActualCrf(codec);
    if (crf !== null) {
        remotion_1.Internals.validateSelectedCrfAndCodecCombination(crf, codec);
    }
    return crf;
};
const getAndValidatePixelFormat = (codec) => {
    const pixelFormat = remotion_1.Internals.getPixelFormat();
    remotion_1.Internals.validateSelectedPixelFormatAndCodecCombination(pixelFormat, codec);
    return pixelFormat;
};
const getAndValidateProResProfile = (actualCodec) => {
    const proResProfile = remotion_1.Internals.getProResProfile();
    remotion_1.Internals.validateSelectedCodecAndProResCombination(actualCodec, proResProfile);
    return proResProfile;
};
const getAndValidateImageFormat = ({ shouldOutputImageSequence, codec, pixelFormat, }) => {
    const imageFormat = (0, image_formats_1.getImageFormat)(shouldOutputImageSequence ? undefined : codec);
    remotion_1.Internals.validateSelectedPixelFormatAndImageFormatCombination(pixelFormat, imageFormat);
    return imageFormat;
};
const getAndValidateBrowser = async (browserExecutable) => {
    const browser = getBrowser();
    try {
        await renderer_1.RenderInternals.ensureLocalBrowser(browser, browserExecutable);
    }
    catch (err) {
        log_1.Log.error('Could not download a browser for rendering frames.');
        log_1.Log.error(err);
        process.exit(1);
    }
    return browser;
};
const getCliOptions = async (type) => {
    const frameRange = getAndValidateFrameRange();
    const shouldOutputImageSequence = type === 'still'
        ? true
        : await getAndValidateShouldOutputImageSequence(frameRange);
    const codec = await getFinalCodec();
    const outputFile = (0, get_filename_1.getOutputFilename)({
        codec,
        imageSequence: shouldOutputImageSequence,
        type,
    });
    const overwrite = remotion_1.Internals.getShouldOverwrite();
    const crf = getAndValidateCrf(shouldOutputImageSequence, codec);
    const pixelFormat = getAndValidatePixelFormat(codec);
    const imageFormat = getAndValidateImageFormat({
        shouldOutputImageSequence,
        codec,
        pixelFormat,
    });
    const proResProfile = getAndValidateProResProfile(codec);
    const browserExecutable = remotion_1.Internals.getBrowserExecutable();
    const isAudioOnly = remotion_1.Internals.isAudioCodec(codec);
    const parallelEncoding = remotion_1.Internals.getParallelEncoding() &&
        !shouldOutputImageSequence &&
        !isAudioOnly;
    return {
        parallelism: remotion_1.Internals.getConcurrency(),
        concurrentMode: remotion_1.Internals.getConcurrentMode(),
        parallelEncoding,
        frameRange,
        shouldOutputImageSequence,
        codec,
        overwrite: remotion_1.Internals.getShouldOverwrite(),
        inputProps: (0, get_input_props_1.getInputProps)(),
        envVariables: await (0, get_env_1.getEnvironmentVariables)(),
        quality: remotion_1.Internals.getQuality(),
        browser: await getAndValidateBrowser(browserExecutable),
        absoluteOutputFile: getAndValidateAbsoluteOutputFile(outputFile, overwrite),
        crf,
        pixelFormat,
        imageFormat,
        proResProfile,
        stillFrame: remotion_1.Internals.getStillFrame(),
        browserExecutable,
    };
};
exports.getCliOptions = getCliOptions;
//# sourceMappingURL=get-cli-options.js.map