"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAssetPositions = void 0;
const split_assets_into_segments_1 = require("./split-assets-into-segments");
const areEqual = (a, b) => {
    return a.id === b.id;
};
const findFrom = (target, asset) => {
    const index = target.findIndex((a) => areEqual(a, asset));
    if (index === -1) {
        return false;
    }
    target.splice(index, 1);
    return true;
};
const calculateAssetPositions = (frames) => {
    var _a, _b;
    const assets = [];
    for (let frame = 0; frame < frames.length; frame++) {
        const prev = ((_a = frames[frame - 1]) !== null && _a !== void 0 ? _a : []).slice();
        const current = frames[frame];
        const next = ((_b = frames[frame + 1]) !== null && _b !== void 0 ? _b : []).slice();
        for (const asset of current) {
            if (!findFrom(prev, asset)) {
                assets.push({
                    src: asset.src,
                    type: asset.type,
                    duration: null,
                    id: asset.id,
                    startInVideo: frame,
                    trimLeft: asset.mediaFrame,
                    volume: [],
                    isRemote: asset.isRemote,
                    playbackRate: asset.playbackRate,
                });
            }
            const found = assets.find((a) => a.duration === null && areEqual(a, asset));
            if (!found)
                throw new Error('something wrong');
            if (!findFrom(next, asset)) {
                // Duration calculation:
                // start 0, range 0-59:
                // 59 - 0 + 1 ==> 60 frames duration
                found.duration = frame - found.startInVideo + 1;
            }
            found.volume = [...found.volume, asset.volume];
        }
    }
    for (const asset of assets) {
        if (asset.duration === null) {
            throw new Error('duration is unexpectedly null');
        }
    }
    return (0, split_assets_into_segments_1.splitAssetsIntoSegments)({
        assets: assets,
        duration: frames.length,
    });
};
exports.calculateAssetPositions = calculateAssetPositions;
//# sourceMappingURL=calculate-asset-positions.js.map