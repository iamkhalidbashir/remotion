import { RenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
declare const HelloWorld: FC;
declare const customRender: (ui: ReactElement, options?: Omit<RenderOptions<typeof import("@testing-library/dom/types/queries"), HTMLElement>, "queries"> | undefined) => import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement>;
export * from '@testing-library/react';
export { customRender as render, HelloWorld };
//# sourceMappingURL=test-utils.d.ts.map