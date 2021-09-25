import { TAsset } from 'remotion';
export declare type UnsafeAsset = Omit<TAsset, 'frame' | 'id' | 'volume' | 'mediaFrame'> & {
    startInVideo: number;
    duration: number | null;
    trimLeft: number;
    volume: number[];
    id: string;
    playbackRate: number;
};
export declare type AssetVolume = number | number[];
export declare type MediaAsset = Omit<UnsafeAsset, 'duration' | 'volume'> & {
    duration: number;
    volume: AssetVolume;
};
export declare type AssetAudioDetails = {
    channels: number;
};
export declare type Assets = MediaAsset[];
//# sourceMappingURL=types.d.ts.map