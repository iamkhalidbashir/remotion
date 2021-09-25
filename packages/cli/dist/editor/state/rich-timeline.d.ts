declare type State = {
    richTimeline: boolean;
    setRichTimeline: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const persistRichTimelineOption: (option: boolean) => void;
export declare const loadRichTimelineOption: () => boolean;
export declare const RichTimelineContext: import("react").Context<State>;
export {};
//# sourceMappingURL=rich-timeline.d.ts.map