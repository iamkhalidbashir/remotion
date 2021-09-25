import { LazyExoticComponent } from 'react';
import { LooseAnyComponent } from './any-component';
export declare type TComposition<T = unknown> = {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
    id: string;
    component: LazyExoticComponent<LooseAnyComponent<T>>;
    props?: T;
    nonce: number;
};
export declare type TCompMetadata = Pick<TComposition, 'id' | 'height' | 'width' | 'fps' | 'durationInFrames'>;
declare type EnhancedTSequenceData = {
    type: 'sequence';
} | {
    type: 'audio';
    src: string;
    volume: string | number;
    doesVolumeChange: boolean;
    startMediaFrom: number;
} | {
    type: 'video';
    src: string;
    volume: string | number;
    doesVolumeChange: boolean;
    startMediaFrom: number;
};
export declare type TSequence = {
    from: number;
    duration: number;
    id: string;
    displayName: string;
    parent: string | null;
    rootId: string;
    showInTimeline: boolean;
    nonce: number;
} & EnhancedTSequenceData;
export declare type TAsset = {
    type: 'audio' | 'video';
    src: string;
    id: string;
    frame: number;
    volume: number;
    isRemote: boolean;
    mediaFrame: number;
    playbackRate: number;
};
export declare type RenderAssetInfo = {
    assets: TAsset[][];
    bundleDir: string;
};
export declare type CompositionManagerContext = {
    compositions: TComposition[];
    registerComposition: <T>(comp: TComposition<T>) => void;
    unregisterComposition: (name: string) => void;
    currentComposition: string | null;
    setCurrentComposition: (curr: string) => void;
    registerSequence: (seq: TSequence) => void;
    unregisterSequence: (id: string) => void;
    registerAsset: (asset: TAsset) => void;
    unregisterAsset: (id: string) => void;
    sequences: TSequence[];
    assets: TAsset[];
};
export declare const CompositionManager: import("react").Context<CompositionManagerContext>;
export {};
//# sourceMappingURL=CompositionManager.d.ts.map