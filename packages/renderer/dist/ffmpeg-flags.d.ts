export declare type FfmpegVersion = [number, number, number] | null;
export declare const getFfmpegBuildInfo: () => Promise<string>;
export declare const ffmpegHasFeature: (feature: 'enable-gpl' | 'enable-libx265' | 'enable-libvpx') => Promise<boolean>;
export declare const parseFfmpegVersion: (buildconf: string) => FfmpegVersion;
export declare const getFfmpegVersion: () => Promise<FfmpegVersion>;
//# sourceMappingURL=ffmpeg-flags.d.ts.map