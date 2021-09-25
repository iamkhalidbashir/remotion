"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const split_assets_into_segments_1 = require("../assets/split-assets-into-segments");
test('Should create segments of audio clips correctly', () => {
    const assets = [
        // Clip from 0-10 seconds
        {
            duration: 300,
            src: 'asset1.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        // Clip from 5-15 seconds
        {
            duration: 300,
            src: 'asset2.mp4',
            startInVideo: 150,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '2',
            isRemote: false,
            playbackRate: 1,
        },
    ];
    expect((0, split_assets_into_segments_1.splitAssetsIntoSegments)({ assets, duration: 450 })).toEqual([
        {
            duration: 150,
            src: 'asset1.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 150,
            src: 'asset1.mp4',
            startInVideo: 150,
            trimLeft: 150,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 150,
            src: 'asset2.mp4',
            startInVideo: 150,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '2',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 150,
            src: 'asset2.mp4',
            startInVideo: 300,
            trimLeft: 150,
            type: 'video',
            volume: 1,
            id: '2',
            isRemote: false,
            playbackRate: 1,
        },
    ]);
});
test('Should leave single clip untouched', () => {
    const assets = [
        // Clip from 0-10 seconds
        {
            duration: 300,
            src: 'asset1.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
    ];
    expect((0, split_assets_into_segments_1.splitAssetsIntoSegments)({ assets, duration: 450 })).toEqual([
        {
            duration: 300,
            src: 'asset1.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
    ]);
});
test('Should leave two identical clips the same', () => {
    const assets = [
        // Clip from 0-10 seconds
        {
            duration: 300,
            src: 'asset1.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 300,
            src: 'asset2.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '2',
            isRemote: false,
            playbackRate: 1,
        },
    ];
    expect((0, split_assets_into_segments_1.splitAssetsIntoSegments)({ assets, duration: 450 })).toEqual([
        {
            duration: 300,
            src: 'asset1.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 300,
            src: 'asset2.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '2',
            isRemote: false,
            playbackRate: 1,
        },
    ]);
});
test('Should not have one-off errors', () => {
    const assets = [
        // Clip from 0-10 seconds
        {
            duration: 2,
            src: 'asset1.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 2,
            src: 'asset2.mp4',
            startInVideo: 1,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '2',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 2,
            src: 'asset3.mp4',
            startInVideo: 2,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '3',
            isRemote: false,
            playbackRate: 1,
        },
    ];
    expect((0, split_assets_into_segments_1.splitAssetsIntoSegments)({ assets, duration: 450 })).toEqual([
        {
            duration: 1,
            src: 'asset1.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 1,
            src: 'asset1.mp4',
            startInVideo: 1,
            trimLeft: 1,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 1,
            src: 'asset2.mp4',
            startInVideo: 1,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '2',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 1,
            src: 'asset2.mp4',
            startInVideo: 2,
            trimLeft: 1,
            type: 'video',
            volume: 1,
            id: '2',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 1,
            src: 'asset3.mp4',
            startInVideo: 2,
            trimLeft: 0,
            type: 'video',
            volume: 1,
            id: '3',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 1,
            src: 'asset3.mp4',
            startInVideo: 3,
            trimLeft: 1,
            type: 'video',
            volume: 1,
            id: '3',
            isRemote: false,
            playbackRate: 1,
        },
    ]);
});
test('Should have correct volume arrays', () => {
    expect((0, split_assets_into_segments_1.splitAssetsIntoSegments)({
        assets: [
            {
                duration: 100,
                src: 'asset1.mp4',
                startInVideo: 0,
                trimLeft: 0,
                type: 'video',
                volume: new Array(100).fill(1).map((_, i) => (i === 0 ? 0 : 1)),
                id: '1',
                isRemote: false,
                playbackRate: 1,
            },
            {
                duration: 50,
                src: 'asset2.mp4',
                startInVideo: 50,
                trimLeft: 0,
                type: 'video',
                volume: new Array(100).fill(1).map((_, i) => (i === 0 ? 0 : 1)),
                id: 'breaker',
                isRemote: false,
                playbackRate: 1,
            },
        ],
        duration: 100,
    })).toEqual([
        {
            duration: 50,
            src: 'asset1.mp4',
            startInVideo: 0,
            trimLeft: 0,
            type: 'video',
            volume: new Array(50).fill(1).map((_, i) => (i === 0 ? 0 : 1)),
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 50,
            src: 'asset1.mp4',
            startInVideo: 50,
            trimLeft: 50,
            type: 'video',
            volume: 1,
            id: '1',
            isRemote: false,
            playbackRate: 1,
        },
        {
            duration: 50,
            src: 'asset2.mp4',
            startInVideo: 50,
            trimLeft: 0,
            type: 'video',
            volume: new Array(100).fill(1).map((_, i) => (i === 0 ? 0 : 1)),
            id: 'breaker',
            isRemote: false,
            playbackRate: 1,
        },
    ]);
});
//# sourceMappingURL=split-assets-into-segments.test.js.map