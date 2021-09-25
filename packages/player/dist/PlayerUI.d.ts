import React from 'react';
import { PlayerRef } from './player-methods';
declare const _default: (props: {
    controls: boolean;
    loop: boolean;
    autoPlay: boolean;
    allowFullscreen: boolean;
    inputProps: unknown;
    showVolumeControls: boolean;
    mediaMuted: boolean;
    style?: React.CSSProperties | undefined;
    clickToPlay: boolean;
    doubleClickToFullscreen: boolean;
    spaceKeyToPlayOrPause: boolean;
    setMediaVolume: (v: number) => void;
    setMediaMuted: (v: boolean) => void;
    mediaVolume: number;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<PlayerRef | null>) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
export default _default;
//# sourceMappingURL=PlayerUI.d.ts.map