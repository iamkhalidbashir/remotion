"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideWebpackConfig = exports.bundle = exports.BundlerInternals = void 0;
const override_webpack_1 = require("./override-webpack");
Object.defineProperty(exports, "overrideWebpackConfig", { enumerable: true, get: function () { return override_webpack_1.overrideWebpackConfig; } });
const start_server_1 = require("./start-server");
const webpack_cache_1 = require("./webpack-cache");
exports.BundlerInternals = {
    startServer: start_server_1.startServer,
    cacheExists: webpack_cache_1.cacheExists,
    clearCache: webpack_cache_1.clearCache,
};
var bundler_1 = require("./bundler");
Object.defineProperty(exports, "bundle", { enumerable: true, get: function () { return bundler_1.bundle; } });
//# sourceMappingURL=index.js.map