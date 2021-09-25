declare type PackageManager = 'npm' | 'yarn' | 'unknown';
export declare type Info = {
    currentVersion: string;
    latestVersion: string;
    updateAvailable: boolean;
    timedOut: boolean;
    packageManager: PackageManager;
};
export declare const isUpdateAvailableWithTimeout: () => Promise<Info>;
export {};
//# sourceMappingURL=update-available.d.ts.map