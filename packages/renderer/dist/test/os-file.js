"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNameInOs = void 0;
const fileNameInOs = (filename) => {
    if (process.platform === 'win32') {
        return filename.replace(/\//g, '\\');
    }
    return filename;
};
exports.fileNameInOs = fileNameInOs;
//# sourceMappingURL=os-file.js.map