export declare const createProgressBar: () => {
    update: (str: string) => boolean;
};
export declare const makeProgressBar: (percentage: number) => string;
export declare const makeBundlingProgress: ({ progress, steps, doneIn, }: {
    progress: number;
    steps: number;
    doneIn: number | null;
}) => string;
export declare const makeRenderingProgress: ({ frames, totalFrames, encodedFrames, steps, concurrency, doneIn, }: {
    frames: number;
    totalFrames: number;
    encodedFrames?: number | undefined;
    steps: number;
    concurrency: number;
    doneIn: number | null;
}) => string;
export declare const makeStitchingProgress: ({ frames, totalFrames, steps, doneIn, parallelEncoding, }: {
    frames: number;
    totalFrames: number;
    steps: number;
    doneIn: number | null;
    parallelEncoding?: boolean | undefined;
}) => string;
//# sourceMappingURL=progress-bar.d.ts.map