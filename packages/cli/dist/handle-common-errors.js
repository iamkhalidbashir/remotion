"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommonError = void 0;
const log_1 = require("./log");
const handleCommonError = (err) => {
    log_1.Log.error(err.message);
    if (err.message.includes('Could not play video with')) {
        log_1.Log.info();
        log_1.Log.info('💡 Get help for this issue at https://remotion.dev/docs/media-playback-error');
    }
    if (err.message.includes('A delayRender was called')) {
        log_1.Log.info();
        log_1.Log.info('💡 Get help for this issue at https://remotion.dev/docs/timeout');
    }
};
exports.handleCommonError = handleCommonError;
//# sourceMappingURL=handle-common-errors.js.map