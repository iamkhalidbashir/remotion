declare type State = {
    checkerboard: boolean;
    setCheckerboard: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const persistCheckerboardOption: (option: boolean) => void;
export declare const loadCheckerboardOption: () => boolean;
export declare const CheckerboardContext: import("react").Context<State>;
export {};
//# sourceMappingURL=checkerboard.d.ts.map