"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Internals = void 0;
const shared_audio_tags_1 = require("./audio/shared-audio-tags");
const CompositionManager_1 = require("./CompositionManager");
const browser_1 = require("./config/browser");
const browser_executable_1 = require("./config/browser-executable");
const codec_1 = require("./config/codec");
const concurrency_1 = require("./config/concurrency");
const concurrent_mode_1 = require("./config/concurrent-mode");
const crf_1 = require("./config/crf");
const env_file_1 = require("./config/env-file");
const frame_range_1 = require("./config/frame-range");
const image_format_1 = require("./config/image-format");
const image_sequence_1 = require("./config/image-sequence");
const input_props_1 = require("./config/input-props");
const Logging = __importStar(require("./config/log"));
const max_timeline_tracks_1 = require("./config/max-timeline-tracks");
const override_webpack_1 = require("./config/override-webpack");
const overwrite_1 = require("./config/overwrite");
const parallel_encoding_1 = require("./config/parallel-encoding");
const pixel_format_1 = require("./config/pixel-format");
const preview_server_1 = require("./config/preview-server");
const prores_profile_1 = require("./config/prores-profile");
const quality_1 = require("./config/quality");
const still_frame_1 = require("./config/still-frame");
const webpack_caching_1 = require("./config/webpack-caching");
const CSSUtils = __importStar(require("./default-css"));
const feature_flags_1 = require("./feature-flags");
const get_environment_1 = require("./get-environment");
const initial_frame_1 = require("./initial-frame");
const is_audio_codec_1 = require("./is-audio-codec");
const perf = __importStar(require("./perf"));
const register_root_1 = require("./register-root");
const RemotionRoot_1 = require("./RemotionRoot");
const sequencing_1 = require("./sequencing");
const setup_env_variables_1 = require("./setup-env-variables");
const Timeline = __importStar(require("./timeline-position-state"));
const truthy_1 = require("./truthy");
const use_lazy_component_1 = require("./use-lazy-component");
const use_unsafe_video_config_1 = require("./use-unsafe-video-config");
const use_video_1 = require("./use-video");
const validate_dimensions_1 = require("./validation/validate-dimensions");
const validate_duration_in_frames_1 = require("./validation/validate-duration-in-frames");
const validate_fps_1 = require("./validation/validate-fps");
const validate_frame_1 = require("./validation/validate-frame");
const validate_image_format_1 = require("./validation/validate-image-format");
const validate_quality_1 = require("./validation/validate-quality");
const volume_position_state_1 = require("./volume-position-state");
const wrap_remotion_context_1 = require("./wrap-remotion-context");
// Mark them as Internals so use don't assume this is public
// API and are less likely to use it
exports.Internals = {
    perf,
    useUnsafeVideoConfig: use_unsafe_video_config_1.useUnsafeVideoConfig,
    Timeline,
    CompositionManager: CompositionManager_1.CompositionManager,
    RemotionRoot: RemotionRoot_1.RemotionRoot,
    useVideo: use_video_1.useVideo,
    getRoot: register_root_1.getRoot,
    getBrowserExecutable: browser_executable_1.getBrowserExecutable,
    getCompositionName: register_root_1.getCompositionName,
    getIsEvaluation: register_root_1.getIsEvaluation,
    getPixelFormat: pixel_format_1.getPixelFormat,
    getConcurrency: concurrency_1.getConcurrency,
    getConcurrentMode: concurrent_mode_1.getConcurrentMode,
    getParallelEncoding: parallel_encoding_1.getParallelEncoding,
    getRange: frame_range_1.getRange,
    getShouldOverwrite: overwrite_1.getShouldOverwrite,
    getOutputCodecOrUndefined: codec_1.getOutputCodecOrUndefined,
    getWebpackOverrideFn: override_webpack_1.getWebpackOverrideFn,
    getQuality: quality_1.getQuality,
    getShouldOutputImageSequence: image_sequence_1.getShouldOutputImageSequence,
    validateSelectedCrfAndCodecCombination: crf_1.validateSelectedCrfAndCodecCombination,
    getFinalOutputCodec: codec_1.getFinalOutputCodec,
    useMediaVolumeState: volume_position_state_1.useMediaVolumeState,
    useMediaMutedState: volume_position_state_1.useMediaMutedState,
    DEFAULT_CODEC: codec_1.DEFAULT_CODEC,
    DEFAULT_PIXEL_FORMAT: pixel_format_1.DEFAULT_PIXEL_FORMAT,
    FEATURE_FLAG_FIREFOX_SUPPORT: feature_flags_1.FEATURE_FLAG_FIREFOX_SUPPORT,
    DEFAULT_WEBPACK_CACHE_ENABLED: webpack_caching_1.DEFAULT_WEBPACK_CACHE_ENABLED,
    getBrowser: browser_1.getBrowser,
    DEFAULT_BROWSER: browser_1.DEFAULT_BROWSER,
    getDefaultCrfForCodec: crf_1.getDefaultCrfForCodec,
    getActualCrf: crf_1.getActualCrf,
    setFrameRangeFromCli: frame_range_1.setFrameRangeFromCli,
    getUserPreferredImageFormat: image_format_1.getUserPreferredImageFormat,
    validateSelectedPixelFormatAndImageFormatCombination: image_format_1.validateSelectedPixelFormatAndImageFormatCombination,
    validateSelectedPixelFormatAndCodecCombination: pixel_format_1.validateSelectedPixelFormatAndCodecCombination,
    validateFrameRange: frame_range_1.validateFrameRange,
    validateNonNullImageFormat: validate_image_format_1.validateNonNullImageFormat,
    getWebpackCaching: webpack_caching_1.getWebpackCaching,
    useLazyComponent: use_lazy_component_1.useLazyComponent,
    truthy: truthy_1.truthy,
    isAudioCodec: is_audio_codec_1.isAudioCodec,
    INPUT_PROPS_KEY: input_props_1.INPUT_PROPS_KEY,
    Logging,
    SequenceContext: sequencing_1.SequenceContext,
    useRemotionContexts: wrap_remotion_context_1.useRemotionContexts,
    RemotionContextProvider: wrap_remotion_context_1.RemotionContextProvider,
    isPlainIndex: register_root_1.isPlainIndex,
    CSSUtils,
    setupEnvVariables: setup_env_variables_1.setupEnvVariables,
    setupInitialFrame: initial_frame_1.setupInitialFrame,
    ENV_VARIABLES_ENV_NAME: setup_env_variables_1.ENV_VARIABLES_ENV_NAME,
    ENV_VARIABLES_LOCAL_STORAGE_KEY: setup_env_variables_1.ENV_VARIABLES_LOCAL_STORAGE_KEY,
    INITIAL_FRAME_LOCAL_STORAGE_KEY: initial_frame_1.INITIAL_FRAME_LOCAL_STORAGE_KEY,
    getDotEnvLocation: env_file_1.getDotEnvLocation,
    getServerPort: preview_server_1.getServerPort,
    MediaVolumeContext: volume_position_state_1.MediaVolumeContext,
    SetMediaVolumeContext: volume_position_state_1.SetMediaVolumeContext,
    validateDurationInFrames: validate_duration_in_frames_1.validateDurationInFrames,
    validateFps: validate_fps_1.validateFps,
    validateDimension: validate_dimensions_1.validateDimension,
    getRemotionEnvironment: get_environment_1.getRemotionEnvironment,
    getProResProfile: prores_profile_1.getProResProfile,
    setProResProfile: prores_profile_1.setProResProfile,
    validateSelectedCodecAndProResCombination: prores_profile_1.validateSelectedCodecAndProResCombination,
    getMaxTimelineTracks: max_timeline_tracks_1.getMaxTimelineTracks,
    SharedAudioContext: shared_audio_tags_1.SharedAudioContext,
    SharedAudioContextProvider: shared_audio_tags_1.SharedAudioContextProvider,
    validateQuality: validate_quality_1.validateQuality,
    validateFrame: validate_frame_1.validateFrame,
    setStillFrame: still_frame_1.setStillFrame,
    getStillFrame: still_frame_1.getStillFrame,
};
//# sourceMappingURL=internals.js.map