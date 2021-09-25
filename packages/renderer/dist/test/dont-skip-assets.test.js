"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculate_asset_positions_1 = require("../assets/calculate-asset-positions");
function truthy(value) {
    return Boolean(value);
}
test('Dont skip assets', () => {
    const assetPositions = (0, calculate_asset_positions_1.calculateAssetPositions)(mock);
    expect(assetPositions).toEqual([
        {
            src: 'http://localhost:3000/4793bac32f610ffba8197b8a3422456f.mp3',
            type: 'audio',
            duration: 180,
            id: 'audio-0.24816237785853446-undefined-undefined-undefined-muted:undefined',
            startInVideo: 0,
            trimLeft: 0,
            volume: 1,
            isRemote: false,
            playbackRate: 1,
        },
        {
            src: 'http://localhost:3000/4793bac32f610ffba8197b8a3422456f.mp3',
            type: 'audio',
            duration: 40,
            id: 'audio-0.24816237785853446-undefined-undefined-undefined-muted:undefined',
            startInVideo: 180,
            trimLeft: 180,
            volume: 1,
            isRemote: false,
            playbackRate: 1,
        },
        {
            src: 'http://localhost:3000/4793bac32f610ffba8197b8a3422456f.mp3',
            type: 'audio',
            duration: 2714,
            id: 'audio-0.24816237785853446-undefined-undefined-undefined-muted:undefined',
            startInVideo: 220,
            trimLeft: 220,
            volume: 1,
            isRemote: false,
            playbackRate: 1,
        },
        {
            src: 'http://localhost:3000/e15ac5e3d531199ebb1828ca6a99100d.webm',
            type: 'video',
            duration: 40,
            id: 'audio-0.6976876351982355-0-180-40-muted:undefined',
            startInVideo: 180,
            trimLeft: 0,
            volume: 1,
            isRemote: false,
            playbackRate: 1,
        },
    ]);
});
const mock = new Array(2934)
    .fill(true)
    .map((_, i) => i)
    .map((k) => {
    return [
        k >= 180 && k < 220
            ? {
                type: 'video',
                src: 'http://localhost:3000/e15ac5e3d531199ebb1828ca6a99100d.webm',
                id: 'audio-0.6976876351982355-0-180-40-muted:undefined',
                frame: 180,
                volume: 1,
                isRemote: false,
                playbackRate: 1,
                mediaFrame: 0,
            }
            : null,
        {
            type: 'audio',
            src: 'http://localhost:3000/4793bac32f610ffba8197b8a3422456f.mp3',
            id: 'audio-0.24816237785853446-undefined-undefined-undefined-muted:undefined',
            frame: k,
            volume: 1,
            isRemote: false,
            playbackRate: 1,
            mediaFrame: k,
        },
    ].filter(truthy);
});
//# sourceMappingURL=dont-skip-assets.test.js.map