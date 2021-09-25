"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndMapAssetsToFileUrl = exports.getSanitizedFilenameForAssetUrl = exports.markAllAssetsAsDownloaded = void 0;
const fs_1 = require("fs");
const got_1 = __importDefault(require("got"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
const isDownloadingMap = {};
const hasBeenDownloadedMap = {};
const listeners = {};
const waitForAssetToBeDownloaded = (src) => {
    if (!listeners[src]) {
        listeners[src] = [];
    }
    return new Promise((resolve) => {
        listeners[src].push(() => resolve());
    });
};
const notifyAssetIsDownloaded = (src) => {
    if (!listeners[src]) {
        listeners[src] = [];
    }
    listeners[src].forEach((fn) => fn());
    isDownloadingMap[src] = false;
    hasBeenDownloadedMap[src] = true;
};
const downloadAsset = async (src, to, onDownload) => {
    if (hasBeenDownloadedMap[src]) {
        return;
    }
    if (isDownloadingMap[src]) {
        return waitForAssetToBeDownloaded(src);
    }
    isDownloadingMap[src] = true;
    onDownload(src);
    (0, fs_1.mkdirSync)(path_1.default.resolve(to, '..'), {
        recursive: true,
    });
    // Listen to 'close' event instead of more
    // concise method to avoid this problem
    // https://github.com/remotion-dev/remotion/issues/384#issuecomment-844398183
    await new Promise((resolve, reject) => {
        const writeStream = (0, fs_1.createWriteStream)(to);
        writeStream.on('close', () => resolve());
        writeStream.on('error', (err) => reject(err));
        got_1.default
            .stream(src)
            .pipe(writeStream)
            .on('error', (err) => reject(err));
    });
    notifyAssetIsDownloaded(src);
};
const markAllAssetsAsDownloaded = () => {
    Object.keys(hasBeenDownloadedMap).forEach((key) => {
        delete hasBeenDownloadedMap[key];
    });
    Object.keys(isDownloadingMap).forEach((key) => {
        delete isDownloadingMap[key];
    });
};
exports.markAllAssetsAsDownloaded = markAllAssetsAsDownloaded;
const getSanitizedFilenameForAssetUrl = ({ src, isRemote, webpackBundle, }) => {
    const { pathname, search } = new URL(src);
    if (!isRemote) {
        return path_1.default.join(webpackBundle, (0, sanitize_filename_1.default)(pathname));
    }
    const split = pathname.split('.');
    const fileExtension = split.length > 1 && split[split.length - 1]
        ? `.${split[split.length - 1]}`
        : '';
    const hashedFileName = String((0, remotion_1.random)(`${pathname}${search}`)).replace('0.', '');
    return path_1.default.join(webpackBundle, (0, sanitize_filename_1.default)(hashedFileName + fileExtension));
};
exports.getSanitizedFilenameForAssetUrl = getSanitizedFilenameForAssetUrl;
const downloadAndMapAssetsToFileUrl = async ({ localhostAsset, webpackBundle, onDownload, }) => {
    const newSrc = (0, exports.getSanitizedFilenameForAssetUrl)({
        src: localhostAsset.src,
        isRemote: localhostAsset.isRemote,
        webpackBundle,
    });
    if (localhostAsset.isRemote) {
        await downloadAsset(localhostAsset.src, newSrc, onDownload);
    }
    return {
        ...localhostAsset,
        src: newSrc,
    };
};
exports.downloadAndMapAssetsToFileUrl = downloadAndMapAssetsToFileUrl;
//# sourceMappingURL=download-and-map-assets-to-file.js.map