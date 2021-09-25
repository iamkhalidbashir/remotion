import execa from 'execa';
import { Codec, ImageFormat, PixelFormat, ProResProfile, RenderAssetInfo } from 'remotion';
export declare type StitcherOptions = {
    dir: string;
    fps: number;
    width: number;
    height: number;
    outputLocation: string;
    force: boolean;
    assetsInfo: RenderAssetInfo;
    imageFormat?: ImageFormat;
    pixelFormat?: PixelFormat;
    codec?: Codec;
    crf?: number;
    parallelism?: number | null;
    onProgress?: (progress: number) => void;
    onDownload?: (src: string) => void;
    proResProfile?: ProResProfile;
    verbose?: boolean;
    parallelEncoding?: boolean;
    preEncodedFileLocation?: string;
};
export declare const spawnFfmpeg: (options: StitcherOptions) => Promise<{
    task: execa.ExecaChildProcess<string>;
    cleanup: (() => void) | undefined;
}>;
export declare const stitchFramesToVideo: (options: StitcherOptions) => Promise<void>;
//# sourceMappingURL=stitcher.d.ts.map