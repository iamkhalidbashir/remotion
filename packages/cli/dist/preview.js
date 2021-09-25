"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewCommand = void 0;
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
const bundler_1 = require("@remotion/bundler");
const better_opn_1 = __importDefault(require("better-opn"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const xns_1 = __importDefault(require("xns"));
const get_config_file_name_1 = require("./get-config-file-name");
const get_env_1 = require("./get-env");
const get_input_props_1 = require("./get-input-props");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const noop = () => undefined;
exports.previewCommand = (0, xns_1.default)(async () => {
    const file = parse_command_line_1.parsedCli._[1];
    const { port: desiredPort } = parse_command_line_1.parsedCli;
    const fullPath = path_1.default.join(process.cwd(), file);
    const appliedName = (0, get_config_file_name_1.loadConfig)();
    if (appliedName) {
        log_1.Log.verbose(`Applied configuration from ${appliedName}.`);
    }
    else {
        log_1.Log.verbose('No config file loaded.');
    }
    const inputProps = (0, get_input_props_1.getInputProps)();
    const envVariables = await (0, get_env_1.getEnvironmentVariables)();
    const port = await bundler_1.BundlerInternals.startServer(path_1.default.resolve(__dirname, 'previewEntry.js'), fullPath, {
        inputProps,
        envVariables,
        port: desiredPort,
        maxTimelineTracks: remotion_1.Internals.getMaxTimelineTracks(),
    });
    (0, better_opn_1.default)(`http://localhost:${port}`);
    await new Promise(noop);
});
//# sourceMappingURL=preview.js.map