"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const download_and_map_assets_to_file_1 = require("../assets/download-and-map-assets-to-file");
test('Should sanitize weird file names when downloading', async () => {
    const newSrc = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'http://gtts-api.miniggiodev.fr/Ici+Japon+Corp.?lang=ja',
        isRemote: true,
        webpackBundle: '/var/tmp',
    });
    expect(newSrc).toBe(process.platform === 'win32'
        ? '\\var\\tmp\\7415404696948826'
        : '/var/tmp/7415404696948826');
});
test('Should give different file names based on different url query parameters', async () => {
    const asset1 = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'https://gtts-api.miniggiodev.fr/Ici+Japon+Corp.mp4?hi=1',
        isRemote: true,
        webpackBundle: '/var/tmp',
    });
    const sameAgain = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'https://gtts-api.miniggiodev.fr/Ici+Japon+Corp.mp4?hi=1',
        isRemote: true,
        webpackBundle: '/var/tmp',
    });
    const differentAsset = (0, download_and_map_assets_to_file_1.getSanitizedFilenameForAssetUrl)({
        src: 'https://gtts-api.miniggiodev.fr/Ici+Japon+Corp.mp4?hi=2',
        isRemote: true,
        webpackBundle: '/var/tmp',
    });
    expect(asset1).toEqual(sameAgain);
    expect(asset1).not.toEqual(differentAsset);
});
//# sourceMappingURL=handle-weird-file-names.test.js.map