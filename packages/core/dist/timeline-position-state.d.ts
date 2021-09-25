/// <reference types="react" />
export declare type TimelineContextValue = {
    frame: number;
    playing: boolean;
    rootId: string;
};
export declare type SetTimelineContextValue = {
    setFrame: (u: React.SetStateAction<number>) => void;
    setPlaying: (u: React.SetStateAction<boolean>) => void;
};
export declare const TimelineContext: import("react").Context<TimelineContextValue>;
export declare const SetTimelineContext: import("react").Context<SetTimelineContextValue>;
export declare const useTimelinePosition: () => number;
export declare const useTimelineSetFrame: () => (u: React.SetStateAction<number>) => void;
declare type PlayingReturnType = readonly [
    boolean,
    (u: React.SetStateAction<boolean>) => void
];
export declare const usePlayingState: () => PlayingReturnType;
export {};
//# sourceMappingURL=timeline-position-state.d.ts.map