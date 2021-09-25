"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const download_and_map_assets_to_file_1 = require("../assets/download-and-map-assets-to-file");
const os_file_1 = require("./os-file");
test('Should correctly map a localhost URL to an asset', async () => {
    expect(await (0, download_and_map_assets_to_file_1.downloadAndMapAssetsToFileUrl)({
        localhostAsset: {
            type: 'video',
            src: 'http://localhost:3000/5f25ba62771d1f8195f858ec5ff8e8d6.mp4',
            id: '0.8331499681195862',
            frame: 2045,
            volume: 1,
            isRemote: false,
            mediaFrame: 2045,
            playbackRate: 1,
        },
        onDownload: () => undefined,
        webpackBundle: '/var/folders/hl/p8pg9kw15dbg3l7dbpn0scc80000gn/T/react-motion-graphicstoSTC7',
    })).toEqual({
        type: 'video',
        src: (0, os_file_1.fileNameInOs)('/var/folders/hl/p8pg9kw15dbg3l7dbpn0scc80000gn/T/react-motion-graphicstoSTC7/5f25ba62771d1f8195f858ec5ff8e8d6.mp4'),
        id: '0.8331499681195862',
        frame: 2045,
        mediaFrame: 2045,
        volume: 1,
        isRemote: false,
        playbackRate: 1,
    });
});
//# sourceMappingURL=map-localhost-to-file.test.js.map