import { TAsset } from 'remotion';
export declare const markAllAssetsAsDownloaded: () => void;
export declare const getSanitizedFilenameForAssetUrl: ({ src, isRemote, webpackBundle, }: {
    src: string;
    isRemote: boolean;
    webpackBundle: string;
}) => string;
export declare const downloadAndMapAssetsToFileUrl: ({ localhostAsset, webpackBundle, onDownload, }: {
    localhostAsset: TAsset;
    webpackBundle: string;
    onDownload: (src: string) => void;
}) => Promise<TAsset>;
//# sourceMappingURL=download-and-map-assets-to-file.d.ts.map