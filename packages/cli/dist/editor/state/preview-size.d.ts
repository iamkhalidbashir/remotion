import { PreviewSize } from '@remotion/player';
declare type PreviewSizeCtx = {
    size: PreviewSize;
    setSize: React.Dispatch<React.SetStateAction<PreviewSize>>;
};
export declare const persistPreviewSizeOption: (option: PreviewSize) => void;
export declare const loadPreviewSizeOption: () => PreviewSize;
export declare const PreviewSizeContext: import("react").Context<PreviewSizeCtx>;
export {};
//# sourceMappingURL=preview-size.d.ts.map