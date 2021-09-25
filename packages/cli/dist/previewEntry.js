"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_dom_1 = require("react-dom");
const remotion_1 = require("remotion");
require("../styles/styles.css");
const Editor_1 = require("./editor/components/Editor");
remotion_1.Internals.CSSUtils.injectCSS(remotion_1.Internals.CSSUtils.makeDefaultCSS(null));
(0, react_dom_1.render)((0, jsx_runtime_1.jsx)(remotion_1.Internals.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(Editor_1.Editor, {}, void 0) }, void 0), document.getElementById('container'));
//# sourceMappingURL=previewEntry.js.map