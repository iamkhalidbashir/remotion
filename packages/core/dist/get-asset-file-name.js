"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetFileName = void 0;
const getAssetFileName = (filename) => {
    const splitted = filename
        .split('/')
        .map(s => s.split('\\'))
        .flat(1);
    return splitted[splitted.length - 1];
};
exports.getAssetFileName = getAssetFileName;
//# sourceMappingURL=get-asset-file-name.js.map