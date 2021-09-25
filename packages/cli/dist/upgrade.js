"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgrade = void 0;
const execa_1 = __importDefault(require("execa"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const log_1 = require("./log");
const npmOrYarn = () => {
    const packageLockJsonFilePath = path_1.default.join(process.cwd(), 'package-lock.json');
    const yarnLockFilePath = path_1.default.join(process.cwd(), 'yarn.lock');
    const npmExists = fs_1.default.existsSync(packageLockJsonFilePath);
    const yarnExists = fs_1.default.existsSync(yarnLockFilePath);
    if (npmExists && !yarnExists) {
        return 'npm';
    }
    if (!npmExists && yarnExists) {
        return 'yarn';
    }
    if (npmExists && yarnExists) {
        log_1.Log.error('Found both a package-lock.json and a yarn.lock file in your project.');
        log_1.Log.error('This can lead to bugs, delete one of the two files and settle on 1 package manager.');
        log_1.Log.error('Afterwards, run this command again.');
        process.exit(1);
    }
    log_1.Log.error('Did not find a package-lock.json or yarn.lock file.');
    log_1.Log.error('Cannot determine how to update dependencies.');
    log_1.Log.error('Did you run `npm install` yet?');
    log_1.Log.error('Make sure either file exists and run this command again.');
    process.exit(1);
};
const upgrade = async () => {
    var _a;
    const packageJsonFilePath = path_1.default.join(process.cwd(), 'package.json');
    if (!fs_1.default.existsSync(packageJsonFilePath)) {
        log_1.Log.error('Could not upgrade because no package.json could be found in your project.');
        process.exit(1);
    }
    const packageJson = require(packageJsonFilePath);
    const dependencies = Object.keys(packageJson.dependencies);
    const tool = npmOrYarn();
    const toUpgrade = [
        '@remotion/bundler',
        '@remotion/cli',
        '@remotion/eslint-config',
        '@remotion/renderer',
        '@remotion/media-utils',
        '@remotion/babel-loader',
        '@remotion/lambda',
        '@remotion/three',
        '@remotion/gif',
        'remotion',
    ].filter((u) => dependencies.includes(u));
    const prom = (0, execa_1.default)(tool, ['upgrade', ...toUpgrade]);
    if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel('info')) {
        (_a = prom.stdout) === null || _a === void 0 ? void 0 : _a.pipe(process.stdout);
    }
    await prom;
    log_1.Log.info('⏫ Remotion has been upgraded!');
};
exports.upgrade = upgrade;
//# sourceMappingURL=upgrade.js.map