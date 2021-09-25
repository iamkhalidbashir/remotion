import React, { MutableRefObject } from 'react';
import { CompProps } from 'remotion';
import { PlayerRef } from './player-methods';
declare type PropsIfHasProps<Props> = {} extends Props ? {
    inputProps?: Props;
} : {
    inputProps: Props;
};
export declare type PlayerProps<T> = {
    durationInFrames: number;
    compositionWidth: number;
    compositionHeight: number;
    fps: number;
    showVolumeControls?: boolean;
    controls?: boolean;
    style?: React.CSSProperties;
    loop?: boolean;
    autoPlay?: boolean;
    allowFullscreen?: boolean;
    clickToPlay?: boolean;
    doubleClickToFullscreen?: boolean;
    spaceKeyToPlayOrPause?: boolean;
    numberOfSharedAudioTags?: number;
} & PropsIfHasProps<T> & CompProps<T>;
export declare const PlayerFn: <T>({ durationInFrames, compositionHeight, compositionWidth, fps, inputProps, style, controls, loop, autoPlay, showVolumeControls, allowFullscreen, clickToPlay, doubleClickToFullscreen, spaceKeyToPlayOrPause, numberOfSharedAudioTags, ...componentProps }: PlayerProps<T>, ref: MutableRefObject<PlayerRef>) => JSX.Element;
declare module 'react' {
    function forwardRef<T, P = {}>(render: (props: P, ref: React.MutableRefObject<T>) => React.ReactElement | null): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
export declare const Player: <T>(props: PlayerProps<T> & React.RefAttributes<PlayerRef>) => React.ReactElement | null;
export {};
//# sourceMappingURL=Player.d.ts.map