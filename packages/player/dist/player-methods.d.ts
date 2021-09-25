import { SyntheticEvent } from 'react';
import { PlayerEmitter } from './event-emitter';
export declare type PlayerMethods = {
    play: (e?: SyntheticEvent) => void;
    pause: () => void;
    toggle: () => void;
    seekTo: (frame: number) => void;
    getCurrentFrame: () => number;
    requestFullscreen: () => void;
    exitFullscreen: () => void;
    isFullscreen: () => void;
    setVolume: (num: number) => void;
    getVolume: () => number;
    isMuted: () => boolean;
    mute: () => void;
    unmute: () => void;
};
export declare type PlayerRef = PlayerEmitter & PlayerMethods;
//# sourceMappingURL=player-methods.d.ts.map