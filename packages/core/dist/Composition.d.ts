import { AnyComponent } from './any-component';
export declare type CompProps<T> = {
    lazyComponent: () => Promise<{
        default: AnyComponent<T>;
    }>;
} | {
    component: AnyComponent<T>;
};
export declare type StillProps<T> = {
    width: number;
    height: number;
    id: string;
    defaultProps?: T;
} & CompProps<T>;
declare type CompositionProps<T> = StillProps<T> & {
    fps: number;
    durationInFrames: number;
};
export declare const Composition: <T>({ width, height, fps, durationInFrames, id, defaultProps: props, ...compProps }: CompositionProps<T>) => null;
export {};
//# sourceMappingURL=Composition.d.ts.map