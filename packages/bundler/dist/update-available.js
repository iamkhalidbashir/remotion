"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUpdateAvailableWithTimeout = void 0;
const fs_1 = require("fs");
const latest_version_1 = __importDefault(require("latest-version"));
const path_1 = require("path");
const semver_1 = __importDefault(require("semver"));
const packageManager = (0, fs_1.existsSync)((0, path_1.join)(__dirname, '..', 'yarn.lock'))
    ? 'yarn'
    : (0, fs_1.existsSync)((0, path_1.join)(__dirname, '..', 'package-lock.json'))
        ? 'npm'
        : 'unknown';
const isUpdateAvailable = async (currentVersion) => {
    const latest = await (0, latest_version_1.default)('@remotion/bundler');
    return {
        updateAvailable: semver_1.default.lt(currentVersion, latest),
        currentVersion,
        latestVersion: latest,
        timedOut: false,
        packageManager,
    };
};
const isUpdateAvailableWithTimeout = () => {
    const packageJson = require('../package.json');
    const { version } = packageJson;
    const threeSecTimeout = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                currentVersion: version,
                latestVersion: version,
                updateAvailable: false,
                timedOut: true,
                packageManager,
            });
        }, 3000);
    });
    return Promise.race([threeSecTimeout, isUpdateAvailable(version)]);
};
exports.isUpdateAvailableWithTimeout = isUpdateAvailableWithTimeout;
//# sourceMappingURL=update-available.js.map