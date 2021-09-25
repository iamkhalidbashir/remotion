export declare type CancellablePromise = {
    promise: Promise<unknown>;
    cancel: () => void;
};
export declare const cancellablePromise: (promise: Promise<unknown>) => CancellablePromise;
//# sourceMappingURL=cancellable-promise.d.ts.map