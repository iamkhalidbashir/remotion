"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deterministic_randomness_1 = __importDefault(require("./rules/deterministic-randomness"));
const even_dimensions_1 = __importDefault(require("./rules/even-dimensions"));
const no_mp4_import_1 = __importDefault(require("./rules/no-mp4-import"));
const no_string_assets_1 = __importDefault(require("./rules/no-string-assets"));
const warn_native_media_tag_1 = __importDefault(require("./rules/warn-native-media-tag"));
const rules = {
    "no-mp4-import": no_mp4_import_1.default,
    "warn-native-media-tag": warn_native_media_tag_1.default,
    "deterministic-randomness": deterministic_randomness_1.default,
    "no-string-assets": no_string_assets_1.default,
    "even-dimensions": even_dimensions_1.default,
};
module.exports = {
    rules,
};
//# sourceMappingURL=index.js.map