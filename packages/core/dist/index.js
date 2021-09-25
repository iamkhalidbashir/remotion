"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = exports.Sequence = exports.registerRoot = exports.interpolateColors = exports.getInputProps = void 0;
require("./asset-types");
const multiple_versions_warning_1 = require("./multiple-versions-warning");
(0, multiple_versions_warning_1.checkMultipleRemotionVersions)();
__exportStar(require("./AbsoluteFill"), exports);
__exportStar(require("./audio"), exports);
__exportStar(require("./Composition"), exports);
__exportStar(require("./config"), exports);
var input_props_1 = require("./config/input-props");
Object.defineProperty(exports, "getInputProps", { enumerable: true, get: function () { return input_props_1.getInputProps; } });
__exportStar(require("./easing"), exports);
__exportStar(require("./freeze"), exports);
__exportStar(require("./IFrame"), exports);
__exportStar(require("./Img"), exports);
__exportStar(require("./internals"), exports);
__exportStar(require("./interpolate"), exports);
var interpolateColors_1 = require("./interpolateColors");
Object.defineProperty(exports, "interpolateColors", { enumerable: true, get: function () { return interpolateColors_1.interpolateColors; } });
__exportStar(require("./random"), exports);
__exportStar(require("./ready-manager"), exports);
var register_root_1 = require("./register-root");
Object.defineProperty(exports, "registerRoot", { enumerable: true, get: function () { return register_root_1.registerRoot; } });
var sequencing_1 = require("./sequencing");
Object.defineProperty(exports, "Sequence", { enumerable: true, get: function () { return sequencing_1.Sequence; } });
var series_1 = require("./series");
Object.defineProperty(exports, "Series", { enumerable: true, get: function () { return series_1.Series; } });
__exportStar(require("./spring"), exports);
__exportStar(require("./Still"), exports);
__exportStar(require("./use-frame"), exports);
__exportStar(require("./use-video-config"), exports);
__exportStar(require("./video"), exports);
__exportStar(require("./video-config"), exports);
//# sourceMappingURL=index.js.map