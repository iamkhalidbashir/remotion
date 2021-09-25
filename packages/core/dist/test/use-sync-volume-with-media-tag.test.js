"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const use_sync_volume_with_media_tag_1 = require("../use-sync-volume-with-media-tag");
test('has the volume been adapted', async () => {
    var _a, _b;
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    const audioRef = {
        current: { volume: 0.5, addEventListener, removeEventListener },
    };
    const volume = 0.6;
    const volumePropFrame = 1;
    const actualVolume = 0.4;
    const initialProps = {
        volumePropFrame,
        actualVolume,
        volume,
        mediaRef: audioRef,
        mediaVolume: 1,
    };
    const { rerender } = (0, react_hooks_1.renderHook)((hookProps) => (0, use_sync_volume_with_media_tag_1.useSyncVolumeWithMediaTag)(hookProps), {
        initialProps,
    });
    expect((_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.volume).toEqual(initialProps.volume);
    const newVolume = 0.5;
    rerender({
        ...initialProps,
        volume: newVolume,
    });
    expect((_b = audioRef.current) === null || _b === void 0 ? void 0 : _b.volume).toEqual(newVolume);
});
test('volume should not be adapted', async () => {
    var _a;
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    const audioRef = {
        current: { volume: 0.4, addEventListener, removeEventListener },
    };
    const volume = 0.4;
    const volumePropFrame = 1;
    const actualVolume = 0.4;
    const initialProps = {
        volumePropFrame,
        actualVolume,
        volume,
        mediaRef: audioRef,
        mediaVolume: 1,
    };
    (0, react_hooks_1.renderHook)((hookProps) => (0, use_sync_volume_with_media_tag_1.useSyncVolumeWithMediaTag)(hookProps), {
        initialProps,
    });
    expect((_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.volume).toEqual(initialProps.volume);
});
//# sourceMappingURL=use-sync-volume-with-media-tag.test.js.map