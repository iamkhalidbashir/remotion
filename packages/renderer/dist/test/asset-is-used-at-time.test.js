"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_is_used_at_time_1 = require("../assets/asset-is-used-at-time");
test('Should give true is asset is used at time', () => {
    expect((0, asset_is_used_at_time_1.assetIsUsedAtTime)({
        duration: 2,
        src: 'hi.mp4',
        startInVideo: 0,
        trimLeft: 2,
        type: 'audio',
        volume: 1,
        id: '1',
        isRemote: false,
        playbackRate: 1,
    }, 1)).toBe(true);
    expect((0, asset_is_used_at_time_1.assetIsUsedAtTime)({
        duration: 2,
        src: 'hi.mp4',
        startInVideo: 1,
        trimLeft: 0,
        type: 'audio',
        volume: 1,
        id: '1',
        isRemote: false,
        playbackRate: 1,
    }, 1)).toBe(true);
});
test('Should give false if asset is not used at time', () => {
    expect((0, asset_is_used_at_time_1.assetIsUsedAtTime)({
        duration: 2,
        src: 'hi.mp4',
        startInVideo: 1,
        trimLeft: 0,
        type: 'audio',
        volume: 1,
        id: '1',
        isRemote: false,
        playbackRate: 1,
    }, 0)).toBe(false);
    expect((0, asset_is_used_at_time_1.assetIsUsedAtTime)({
        duration: 2,
        src: 'hi.mp4',
        startInVideo: 1,
        trimLeft: 0,
        type: 'audio',
        volume: 1,
        id: '1',
        isRemote: false,
        playbackRate: 1,
    }, 3)).toBe(false);
});
//# sourceMappingURL=asset-is-used-at-time.test.js.map