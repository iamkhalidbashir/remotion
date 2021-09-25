export declare type TimelineViewState = {
    collapsed: {
        [key: string]: boolean;
    };
};
export declare type TimelineActionState = {
    type: 'collapse';
    hash: string;
} | {
    type: 'expand';
    hash: string;
};
export declare const timelineStateReducer: (state: TimelineViewState, action: TimelineActionState) => TimelineViewState;
//# sourceMappingURL=timeline-state-reducer.d.ts.map