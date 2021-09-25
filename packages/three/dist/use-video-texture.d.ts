import React from 'react';
import { Video } from 'remotion';
import { VideoTexture } from 'three';
declare global {
    interface HTMLVideoElement {
        requestVideoFrameCallback?: (cb: () => void) => void;
    }
}
export declare type UseVideoTextureOptions = React.ComponentProps<typeof Video>;
export declare const useVideoTexture: (videoRef: React.RefObject<HTMLVideoElement>) => VideoTexture | null;
//# sourceMappingURL=use-video-texture.d.ts.map