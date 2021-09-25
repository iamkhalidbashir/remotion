"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfigFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const log_1 = require("./log");
const loadConfigFile = (configFileName, isJavascript) => {
    const resolved = path_1.default.resolve(process.cwd(), configFileName);
    if (!isJavascript) {
        const tsconfigJson = path_1.default.join(process.cwd(), 'tsconfig.json');
        if (!fs_1.default.existsSync(tsconfigJson)) {
            log_1.Log.error('Could not find a tsconfig.json file in your project. Did you delete it? Create a tsconfig.json in the root of your project. Copy the default file from https://github.com/remotion-dev/template/blob/main/tsconfig.json.');
            process.exit(1);
        }
        const tsConfig = typescript_1.default.readConfigFile(tsconfigJson, typescript_1.default.sys.readFile);
        const compilerOptions = typescript_1.default.parseJsonConfigFileContent(tsConfig.config, typescript_1.default.sys, './');
        const output = typescript_1.default.transpileModule(fs_1.default.readFileSync(resolved, 'utf-8'), {
            compilerOptions: compilerOptions.options,
        });
        // eslint-disable-next-line no-eval
        eval(output.outputText);
        return resolved;
    }
    const outputs = typescript_1.default.transpileModule(fs_1.default.readFileSync(resolved, 'utf-8'), {});
    // eslint-disable-next-line no-eval
    eval(outputs.outputText);
    return configFileName;
};
exports.loadConfigFile = loadConfigFile;
//# sourceMappingURL=load-config.js.map