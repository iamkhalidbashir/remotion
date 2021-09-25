"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const is_composition_still_1 = require("../helpers/is-composition-still");
const film_1 = require("../icons/film");
const still_1 = require("../icons/still");
const CurrentComposition_1 = require("./CurrentComposition");
const FramePersistor_1 = require("./FramePersistor");
const Container = styled_components_1.default.div `
	border-right: 1px solid black;
	position: absolute;
	height: 100%;
	width: 100%;
	flex: 1;
`;
const List = styled_components_1.default.div `
	padding: 5px;
	height: calc(100% - 100px);
	overflow-y: auto;
`;
const Item = styled_components_1.default.a `
	background: ${(props) => props.selected ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
	color: ${(props) => (props.selected ? 'white' : 'rgba(255, 255, 255, 0.6)')};
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 6px;
	padding-bottom: 6px;
	font-size: 13px;
	font-family: Arial, Helvetica, sans-serif;
	display: flex;
	border-radius: 2px;
	text-decoration: none;
	cursor: default;
	align-items: center;
	border-width: 1px;
	border-style: solid;
	border-color: transparent;
	margin-bottom: 1px;
	&:hover {
		border-color: ${(props) => props.selected ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
		background: ${(props) => props.selected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
		color: white;
	}
`;
const spacer = {
    width: 6,
};
const CompositionSelector = () => {
    const { compositions, setCurrentComposition, currentComposition } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const setCurrentFrame = remotion_1.Internals.Timeline.useTimelineSetFrame();
    const selectComposition = (0, react_1.useCallback)((c) => {
        window.history.pushState({}, 'Preview', `/${c.id}`);
        const frame = (0, FramePersistor_1.getFrameForComposition)(c.id);
        const frameInBounds = Math.min(c.durationInFrames - 1, frame);
        setCurrentFrame(frameInBounds);
        setCurrentComposition(c.id);
    }, [setCurrentComposition, setCurrentFrame]);
    (0, react_1.useEffect)(() => {
        if (currentComposition) {
            return;
        }
        const compositionFromUrl = (0, FramePersistor_1.getCurrentCompositionFromUrl)();
        if (compositionFromUrl) {
            const exists = compositions.find((c) => c.id === compositionFromUrl);
            if (exists) {
                selectComposition(exists);
                return;
            }
        }
        if (compositions.length > 0) {
            selectComposition(compositions[0]);
        }
    }, [compositions, currentComposition, selectComposition]);
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)(CurrentComposition_1.CurrentComposition, {}, void 0), (0, jsx_runtime_1.jsx)(List, { children: compositions.map((c) => {
                    return ((0, jsx_runtime_1.jsxs)(Item, Object.assign({ href: c.id, selected: currentComposition === c.id, onClick: (evt) => {
                            evt.preventDefault();
                            selectComposition(c);
                        } }, { children: [(0, is_composition_still_1.isCompositionStill)(c) ? ((0, jsx_runtime_1.jsx)(still_1.StillIcon, { style: { height: 18, width: 18 } }, void 0)) : ((0, jsx_runtime_1.jsx)(film_1.FilmIcon, { style: { height: 18, width: 18 } }, void 0)), (0, jsx_runtime_1.jsx)("div", { style: spacer }, void 0), c.id] }), c.id));
                }) }, void 0)] }, void 0));
};
exports.CompositionSelector = CompositionSelector;
//# sourceMappingURL=CompositionSelector.js.map