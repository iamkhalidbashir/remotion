"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const remotion_1 = require("remotion");
const styled_components_1 = __importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
	background-color: white;
	flex: 1;
`;
const Label = styled_components_1.default.div `
	font-size: 260px;
	color: black;
	font-weight: 700;
	font-family: 'SF Pro Text';
	text-align: center;
	transform: scaleX(1);
	line-height: 1em;
`;
const StaggerType = () => {
    const types = 4;
    const frame = (0, remotion_1.useCurrentFrame)();
    const videoConfig = (0, remotion_1.useVideoConfig)();
    return ((0, jsx_runtime_1.jsx)(Container, Object.assign({ style: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } }, { children: (0, jsx_runtime_1.jsx)("div", { children: new Array(types)
                .fill(true)
                .map((_, i) => {
                return i;
            })
                .map((i) => {
                const ratio = i / types;
                const isSecondHalf = frame > videoConfig.durationInFrames / 2;
                const opacity = frame / (videoConfig.durationInFrames / 2) > ratio;
                const stroking = (() => {
                    if (!isSecondHalf) {
                        return i % 2 === 0;
                    }
                    return Math.ceil(frame / 10) % 2 === i % 2;
                })();
                const color = (0, polished_1.mix)(ratio, '#fff', '#000');
                return ((0, jsx_runtime_1.jsx)(Label, Object.assign({ style: {
                        ...(stroking
                            ? {}
                            : {
                                WebkitTextStrokeColor: color,
                                WebkitTextStrokeWidth: 8,
                                WebkitTextFillColor: 'white',
                            }),
                        opacity: Number(opacity),
                        width: 2000,
                        marginLeft: -(2000 - videoConfig.width) / 2,
                        marginTop: -20,
                    } }, { children: "beta" }), i));
            }) }, void 0) }), void 0));
};
exports.default = StaggerType;
//# sourceMappingURL=index.js.map