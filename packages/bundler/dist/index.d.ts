import { overrideWebpackConfig } from './override-webpack';
export declare const BundlerInternals: {
    startServer: (entry: string, userDefinedComponent: string, options?: {
        webpackOverride?: import("remotion").WebpackOverrideFn | undefined;
        inputProps?: object | undefined;
        envVariables?: Record<string, string> | undefined;
        port?: number | undefined;
        maxTimelineTracks?: number | undefined;
    } | undefined) => Promise<number>;
    cacheExists: (environment: "development" | "production", inputProps: object | null) => boolean;
    clearCache: (environment: "development" | "production", inputProps: object | null) => Promise<void>;
};
export { bundle } from './bundler';
export { overrideWebpackConfig };
//# sourceMappingURL=index.d.ts.map