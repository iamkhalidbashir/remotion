/// <reference types="react" />
import { VolumeProp } from '../volume-prop';
export declare type RemotionMainVideoProps = {
    startFrom?: number;
    endAt?: number;
};
export declare type RemotionVideoProps = Omit<React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>, 'autoPlay' | 'controls' | 'loop'> & {
    volume?: VolumeProp;
    playbackRate?: number;
};
//# sourceMappingURL=props.d.ts.map