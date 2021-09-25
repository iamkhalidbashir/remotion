"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleOnCli = void 0;
const bundler_1 = require("@remotion/bundler");
const remotion_1 = require("remotion");
const log_1 = require("./log");
const progress_bar_1 = require("./progress-bar");
const bundleOnCli = async (fullPath, steps) => {
    const shouldCache = remotion_1.Internals.getWebpackCaching();
    const cacheExistedBefore = bundler_1.BundlerInternals.cacheExists('production', null);
    if (cacheExistedBefore && !shouldCache) {
        log_1.Log.info('🧹 Cache disabled but found. Deleting... ');
        await bundler_1.BundlerInternals.clearCache('production', null);
    }
    const bundleStartTime = Date.now();
    const bundlingProgress = (0, progress_bar_1.createProgressBar)();
    const bundled = await (0, bundler_1.bundle)(fullPath, (progress) => {
        bundlingProgress.update((0, progress_bar_1.makeBundlingProgress)({ progress: progress / 100, steps, doneIn: null }));
    }, {
        enableCaching: shouldCache,
    });
    bundlingProgress.update((0, progress_bar_1.makeBundlingProgress)({
        progress: 1,
        steps,
        doneIn: Date.now() - bundleStartTime,
    }) + '\n');
    log_1.Log.verbose('Bundled under', bundled);
    const cacheExistedAfter = bundler_1.BundlerInternals.cacheExists('production', null);
    if (cacheExistedAfter && !cacheExistedBefore) {
        log_1.Log.info('⚡️ Cached bundle. Subsequent builds will be faster.');
    }
    return bundled;
};
exports.bundleOnCli = bundleOnCli;
//# sourceMappingURL=setup-cache.js.map