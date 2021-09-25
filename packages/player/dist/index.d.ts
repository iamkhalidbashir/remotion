import { PlayerEmitter } from './event-emitter';
export { Player } from './Player';
export { PlayerMethods, PlayerRef } from './player-methods';
export { PreviewSize } from './utils/preview-size';
export { Size } from './utils/use-element-size';
export declare const PlayerInternals: {
    PlayerEventEmitterContext: import("react").Context<PlayerEmitter | undefined>;
    PlayerEmitter: typeof PlayerEmitter;
    usePlayer: () => {
        frameBack: (frames: number) => void;
        frameForward: (frames: number) => void;
        isLastFrame: boolean;
        emitter: PlayerEmitter;
        playing: boolean;
        play: (e?: import("react").SyntheticEvent<Element, Event> | undefined) => void;
        pause: () => void;
        seek: (newFrame: number) => void;
        getCurrentFrame: () => number;
    };
    usePlayback: ({ loop }: {
        loop: boolean;
    }) => void;
    useElementSize: (ref: import("react").RefObject<HTMLDivElement>, options: {
        triggerOnWindowResize: boolean;
    }) => import("./utils/use-element-size").Size | null;
    calculateScale: ({ previewSize, compositionWidth, compositionHeight, canvasSize, }: {
        previewSize: import("./utils/preview-size").PreviewSize;
        compositionWidth: number;
        compositionHeight: number;
        canvasSize: import("./utils/use-element-size").Size;
    }) => {
        centerX: number;
        centerY: number;
        xCorrection: number;
        yCorrection: number;
        scale: number;
    };
    useHoverState: (ref: import("react").RefObject<HTMLDivElement>) => boolean;
};
//# sourceMappingURL=index.d.ts.map