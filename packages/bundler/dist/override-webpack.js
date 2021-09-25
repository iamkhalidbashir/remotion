"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideWebpackConfig = void 0;
const remotion_1 = require("remotion");
/**
 * Please use Config.Bundling.overrideWebpack() from now on.
 * See: https://www.remotion.dev/docs/webpack/
 * @deprecated
 */
const overrideWebpackConfig = (fn) => {
    console.warn('bundler.overrideWebpackConfig has been deprecated.');
    console.warn('Please migrate to Config.Bundling.overrideWebpack().');
    console.warn('See: https://www.remotion.dev/docs/webpack/');
    remotion_1.Config.Bundling.overrideWebpackConfig(fn);
};
exports.overrideWebpackConfig = overrideWebpackConfig;
//# sourceMappingURL=override-webpack.js.map