"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const Title = styled_components_1.default.div `
	font-size: 80px;
	font-family: 'Roboto';
	color: white;
	font-weight: bold;
`;
const Subtitle = styled_components_1.default.div `
	font-family: 'Roboto';
	font-size: 50px;
	color: white;
	margin-top: 20px;
	margin-bottom: 80px;
`;
const Link = styled_components_1.default.div `
	color: white;
	font-size: 45px;
	font-family: 'Roboto';
`;
const getStickerScale = (frame, index) => {
    const duration = 10;
    const start = index * 10;
    if (frame < start) {
        return 0;
    }
    if (frame > start + duration) {
        return 1;
    }
    return (frame - start) / duration;
};
const Rating = () => {
    const [handle] = (0, react_1.useState)(() => (0, remotion_1.delayRender)());
    const [data, setData] = (0, react_1.useState)(null);
    const fetchData = (0, react_1.useCallback)(async () => {
        const resource = await fetch('http://localhost:8000/packs/xoloi');
        const json = await resource.json();
        setData(json);
    }, []);
    (0, react_1.useEffect)(() => {
        (0, remotion_1.continueRender)(handle);
    }, [data, handle]);
    (0, react_1.useEffect)(() => {
        fetchData();
    }, [fetchData]);
    const frame = (0, remotion_1.useCurrentFrame)();
    if (!data) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
            flex: 1,
            padding: 80,
            flexDirection: 'column',
            display: 'flex',
            background: 'linear-gradient(to bottom left, #5851db, #405de6)',
        } }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Title, { children: "New Pack available" }, void 0), data ? ((0, jsx_runtime_1.jsxs)(Subtitle, { children: [data.data.pack.name, " by ", data.data.pack.publisher] }, void 0)) : null, data
                        ? data === null || data === void 0 ? void 0 : data.data.pack.stickers.slice(0, 12).map((d, i) => (
                        // eslint-disable-next-line
                        (0, jsx_runtime_1.jsx)(remotion_1.Img, { src: `https://anysticker.imgix.net/${d.source}`, style: {
                                height: 306,
                                width: 306,
                                transform: `scale(${getStickerScale(frame, i)})`,
                            } }, d.id)))
                        : null] }, void 0), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }, void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    opacity: frame < 140 ? 0 : frame > 160 ? 1 : (frame - 140) / 20,
                } }, { children: [(0, jsx_runtime_1.jsx)(remotion_1.Img, { src: "https://www.anysticker.app/logo-transparent.png", style: { height: 200, width: 200, marginRight: 40 } }, void 0), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }, void 0), (0, jsx_runtime_1.jsxs)(Link, { children: ["anysticker.app/", data.data.pack.id] }, void 0)] }), void 0)] }), void 0));
};
exports.default = Rating;
//# sourceMappingURL=index.js.map