"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stitchFramesToVideo = exports.spawnFfmpeg = exports.getAssetsData = void 0;
const execa_1 = __importDefault(require("execa"));
const remotion_1 = require("remotion");
const assets_to_ffmpeg_inputs_1 = require("./assets-to-ffmpeg-inputs");
const calculate_asset_positions_1 = require("./assets/calculate-asset-positions");
const convert_assets_to_file_urls_1 = require("./assets/convert-assets-to-file-urls");
const download_and_map_assets_to_file_1 = require("./assets/download-and-map-assets-to-file");
const get_asset_audio_details_1 = require("./assets/get-asset-audio-details");
const calculate_ffmpeg_filters_1 = require("./calculate-ffmpeg-filters");
const create_ffmpeg_complex_filter_1 = require("./create-ffmpeg-complex-filter");
const get_audio_codec_name_1 = require("./get-audio-codec-name");
const get_codec_name_1 = require("./get-codec-name");
const get_frame_number_length_1 = require("./get-frame-number-length");
const get_prores_profile_name_1 = require("./get-prores-profile-name");
const image_format_1 = require("./image-format");
const parse_ffmpeg_progress_1 = require("./parse-ffmpeg-progress");
const resolve_asset_src_1 = require("./resolve-asset-src");
const validate_even_dimensions_with_codec_1 = require("./validate-even-dimensions-with-codec");
const validate_ffmpeg_1 = require("./validate-ffmpeg");
const getAssetsData = async (options) => {
    var _a, _b;
    const codec = (_a = options.codec) !== null && _a !== void 0 ? _a : remotion_1.Internals.DEFAULT_CODEC;
    const encoderName = (0, get_codec_name_1.getCodecName)(codec);
    const isAudioOnly = encoderName === null;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const [frameInfo, fileUrlAssets] = await Promise.all([
        options.preEncodedFileLocation
            ? undefined
            : (0, get_frame_number_length_1.getFrameInfo)({
                dir: options.dir,
                isAudioOnly,
            }),
        (0, convert_assets_to_file_urls_1.convertAssetsToFileUrls)({
            assets: options.assetsInfo.assets,
            dir: options.assetsInfo.bundleDir,
            onDownload: (_b = options.onDownload) !== null && _b !== void 0 ? _b : (() => undefined),
        }),
    ]);
    (0, download_and_map_assets_to_file_1.markAllAssetsAsDownloaded)();
    const assetPositions = (0, calculate_asset_positions_1.calculateAssetPositions)(fileUrlAssets);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const assetPaths = assetPositions.map((asset) => (0, resolve_asset_src_1.resolveAssetSrc)(asset.src));
    const assetAudioDetails = await (0, get_asset_audio_details_1.getAssetAudioDetails)({
        assetPaths,
        parallelism: options.parallelism,
    });
    const filters = (0, calculate_ffmpeg_filters_1.calculateFfmpegFilters)({
        assetAudioDetails,
        assetPositions,
        fps: options.fps,
        videoTrackCount: isAudioOnly ? 0 : 1,
    });
    if (options.verbose) {
        console.log('asset positions', assetPositions);
    }
    if (options.verbose) {
        console.log('filters', filters);
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { complexFilterFlag, cleanup } = await (0, create_ffmpeg_complex_filter_1.createFfmpegComplexFilter)(filters);
    return {
        complexFilterFlag,
        cleanup,
        frameInfo,
        assetPaths,
    };
};
exports.getAssetsData = getAssetsData;
// eslint-disable-next-line complexity
const spawnFfmpeg = async (options) => {
    var _a, _b, _c, _d, _e;
    remotion_1.Internals.validateDimension(options.height, 'height', 'passed to `stitchFramesToVideo()`');
    remotion_1.Internals.validateDimension(options.width, 'width', 'passed to `stitchFramesToVideo()`');
    remotion_1.Internals.validateFps(options.fps, 'passed to `stitchFramesToVideo()`');
    const codec = (_a = options.codec) !== null && _a !== void 0 ? _a : remotion_1.Internals.DEFAULT_CODEC;
    (0, validate_even_dimensions_with_codec_1.validateEvenDimensionsWithCodec)({
        width: options.width,
        height: options.height,
        codec,
    });
    const crf = (_b = options.crf) !== null && _b !== void 0 ? _b : remotion_1.Internals.getDefaultCrfForCodec(codec);
    const imageFormat = (_c = options.imageFormat) !== null && _c !== void 0 ? _c : image_format_1.DEFAULT_IMAGE_FORMAT;
    const pixelFormat = (_d = options.pixelFormat) !== null && _d !== void 0 ? _d : remotion_1.Internals.DEFAULT_PIXEL_FORMAT;
    await (0, validate_ffmpeg_1.validateFfmpeg)();
    const encoderName = (0, get_codec_name_1.getCodecName)(codec);
    const audioCodecName = (0, get_audio_codec_name_1.getAudioCodecName)(codec);
    const proResProfileName = (0, get_prores_profile_name_1.getProResProfileName)(codec, options.proResProfile);
    const isAudioOnly = encoderName === null;
    const supportsCrf = encoderName && codec !== 'prores';
    if (options.verbose) {
        console.log('[verbose] encoder', encoderName);
        console.log('[verbose] audioCodec', audioCodecName);
        console.log('[verbose] pixelFormat', pixelFormat);
        console.log('[verbose] imageFormat', imageFormat);
        if (supportsCrf) {
            console.log('[verbose] crf', crf);
        }
        console.log('[verbose] codec', codec);
        console.log('[verbose] isAudioOnly', isAudioOnly);
        console.log('[verbose] proResProfileName', proResProfileName);
    }
    remotion_1.Internals.validateSelectedCrfAndCodecCombination(crf, codec);
    remotion_1.Internals.validateSelectedPixelFormatAndImageFormatCombination(pixelFormat, imageFormat);
    remotion_1.Internals.validateSelectedPixelFormatAndCodecCombination(pixelFormat, codec);
    const { complexFilterFlag = undefined, cleanup = undefined, frameInfo = undefined, assetPaths = undefined, } = options.parallelEncoding ? {} : await (0, exports.getAssetsData)(options);
    const ffmpegArgs = [
        ['-r', String(options.fps)],
        ...(options.preEncodedFileLocation
            ? [['-i', options.preEncodedFileLocation]]
            : [
                isAudioOnly
                    ? null
                    : ['-f', options.parallelEncoding ? 'image2pipe' : 'image2'],
                isAudioOnly ? null : ['-s', `${options.width}x${options.height}`],
                frameInfo ? ['-start_number', String(frameInfo.startNumber)] : null,
                frameInfo
                    ? ['-i', `element-%0${frameInfo.numberLength}d.${imageFormat}`]
                    : null,
                options.parallelEncoding ? ['-i', '-'] : null,
            ]),
        ...(assetPaths
            ? (0, assets_to_ffmpeg_inputs_1.assetsToFfmpegInputs)({
                assets: assetPaths,
                isAudioOnly,
                fps: options.fps,
                frameCount: options.assetsInfo.assets.length,
            })
            : []),
        options.preEncodedFileLocation
            ? ['-c:v', 'copy']
            : encoderName
                ? // -c:v is the same as -vcodec as -codec:video
                    // and specified the video codec.
                    ['-c:v', encoderName]
                : // If only exporting audio, we drop the video explicitly
                    ['-vn'],
        ...(options.preEncodedFileLocation
            ? []
            : [
                proResProfileName ? ['-profile:v', proResProfileName] : null,
                supportsCrf ? ['-crf', String(crf)] : null,
                isAudioOnly ? null : ['-pix_fmt', pixelFormat],
                // Without explicitly disabling auto-alt-ref,
                // transparent WebM generation doesn't work
                pixelFormat === 'yuva420p' ? ['-auto-alt-ref', '0'] : null,
                isAudioOnly ? null : ['-b:v', '1M'],
            ]),
        audioCodecName ? ['-c:a', audioCodecName] : null,
        complexFilterFlag,
        // Ignore audio from image sequence
        isAudioOnly ? null : ['-map', '0:v'],
        // Ignore metadata that may come from remote media
        isAudioOnly ? null : ['-map_metadata', '-1'],
        options.force ? '-y' : null,
        options.outputLocation,
    ];
    if (options.verbose) {
        console.log('Generated FFMPEG command:');
        console.log(ffmpegArgs);
    }
    const ffmpegString = ffmpegArgs
        .reduce((acc, val) => acc.concat(val), [])
        .filter(Boolean);
    const task = (0, execa_1.default)('ffmpeg', ffmpegString, { cwd: options.dir });
    (_e = task.stderr) === null || _e === void 0 ? void 0 : _e.on('data', (data) => {
        // console.log(data.toString());
        if (options.onProgress) {
            const parsed = (0, parse_ffmpeg_progress_1.parseFfmpegProgress)(data.toString());
            if (parsed !== undefined) {
                options.onProgress(parsed);
            }
        }
    });
    return { task, cleanup };
};
exports.spawnFfmpeg = spawnFfmpeg;
// eslint-disable-next-line complexity
const stitchFramesToVideo = async (options) => {
    const { task, cleanup } = await (0, exports.spawnFfmpeg)(options);
    await task;
    cleanup === null || cleanup === void 0 ? void 0 : cleanup();
};
exports.stitchFramesToVideo = stitchFramesToVideo;
//# sourceMappingURL=stitcher.js.map