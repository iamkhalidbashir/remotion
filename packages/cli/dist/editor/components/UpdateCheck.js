"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCheck = exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
exports.Container = styled_components_1.default.div `
	background: linear-gradient(to right, #4290f5, #42e9f5);
	padding: 8px;
	font-family: ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color: white;
	text-align: center;
	font-weight: bold;
	font-size: 14px;
	a {
		color: white;
		text-decoration: underline;
		cursor: pointer;
	}
	code {
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 4px;
		padding: 3px 8px;
		&:active {
			color: black;
		}
	}
`;
const makeLocalStorageKey = (version) => `update-dismiss-${version}`;
const dismissVersion = (version) => {
    window.localStorage.setItem(makeLocalStorageKey(version), 'true');
};
const isVersionDismissed = (version) => {
    return window.localStorage.getItem(makeLocalStorageKey(version)) === 'true';
};
const UpdateCheck = () => {
    const [info, setInfo] = (0, react_1.useState)(null);
    const checkForUpdates = (0, react_1.useCallback)(() => {
        fetch('/update')
            .then((res) => res.json())
            .then((d) => setInfo(d))
            .catch((err) => {
            console.log('Could not check for updates', err);
        });
    }, []);
    const dismiss = (0, react_1.useCallback)(() => {
        if (info === null) {
            return;
        }
        dismissVersion(info.latestVersion);
        setInfo(null);
    }, [info]);
    const remindLater = (0, react_1.useCallback)(() => {
        setInfo(null);
    }, []);
    (0, react_1.useEffect)(() => {
        checkForUpdates();
    }, [checkForUpdates]);
    const copyCmd = (cmd) => {
        const permissionName = 'clipboard-write';
        navigator.permissions
            .query({ name: permissionName })
            .then((result) => {
            if (result.state === 'granted' || result.state === 'prompt') {
                navigator.clipboard.writeText(cmd);
            }
        })
            .catch((err) => {
            console.log('Could not copy command', err);
        });
    };
    if (!info) {
        return null;
    }
    if (!info.updateAvailable) {
        return null;
    }
    if (isVersionDismissed(info.latestVersion)) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(exports.Container, { children: ["A new version of Remotion is available! ", info.currentVersion, " \u27A1\uFE0F", ' ', (0, jsx_runtime_1.jsx)("span", { style: { width: 8, display: 'inline-block' } }, void 0), info.latestVersion, ". Run", ' ', info.packageManager === 'yarn' ? ((0, jsx_runtime_1.jsx)("code", Object.assign({ onClick: () => copyCmd('yarn upgrade'), style: { cursor: 'pointer' } }, { children: "yarn upgrade" }), void 0)) : ((0, jsx_runtime_1.jsx)("code", Object.assign({ onClick: () => copyCmd('npm run upgrade'), style: { cursor: 'pointer' } }, { children: "npm run upgrade" }), void 0)), ' ', "to get it. ", (0, jsx_runtime_1.jsx)("br", {}, void 0), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "https://github.com/remotion-dev/remotion/releases", target: "_blank" }, { children: "Release notes" }), void 0), (0, jsx_runtime_1.jsx)("span", { style: { width: 8, display: 'inline-block' } }, void 0), (0, jsx_runtime_1.jsx)("a", Object.assign({ onClick: remindLater }, { children: "Remind me next time" }), void 0), (0, jsx_runtime_1.jsx)("span", { style: { width: 8, display: 'inline-block' } }, void 0), (0, jsx_runtime_1.jsx)("a", Object.assign({ onClick: dismiss }, { children: "Skip this version" }), void 0)] }, void 0));
};
exports.UpdateCheck = UpdateCheck;
//# sourceMappingURL=UpdateCheck.js.map