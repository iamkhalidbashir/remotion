import minimist from 'minimist';
import { BrowserExecutable, Codec, ImageFormat, PixelFormat, ProResProfile } from 'remotion';
export declare type CommandLineOptions = {
    ['browser-executable']: BrowserExecutable;
    ['pixel-format']: PixelFormat;
    ['image-format']: ImageFormat;
    ['prores-profile']: ProResProfile;
    ['bundle-cache']: string;
    ['env-file']: string;
    codec: Codec;
    concurrency: number;
    config: string;
    crf: number;
    force: boolean;
    overwrite: boolean;
    png: boolean;
    props: string;
    quality: number;
    frames: string | number;
    sequence: boolean;
    log: string;
    help: boolean;
    port: number;
    frame: string | number;
};
export declare const parsedCli: CommandLineOptions & minimist.ParsedArgs;
export declare const parseCommandLine: (type: 'still' | 'sequence') => void;
//# sourceMappingURL=parse-command-line.d.ts.map