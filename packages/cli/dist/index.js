"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const check_version_1 = require("./check-version");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const preview_1 = require("./preview");
const print_help_1 = require("./print-help");
const render_1 = require("./render");
const still_1 = require("./still");
const upgrade_1 = require("./upgrade");
const cli = async () => {
    const args = process.argv;
    const command = args[2];
    if (parse_command_line_1.parsedCli.help) {
        (0, print_help_1.printHelp)();
        process.exit(0);
    }
    // To check node version and to warn if node version is <12.10.0
    (0, check_version_1.checkNodeVersion)();
    try {
        if (command === 'preview') {
            await (0, preview_1.previewCommand)();
        }
        else if (command === 'render') {
            await (0, render_1.render)();
        }
        else if (command === 'still') {
            await (0, still_1.still)();
        }
        else if (command === 'upgrade') {
            await (0, upgrade_1.upgrade)();
        }
        else if (command === 'help') {
            (0, print_help_1.printHelp)();
            process.exit(0);
        }
        else {
            log_1.Log.error(`Command ${command} not found.`);
            (0, print_help_1.printHelp)();
            process.exit(1);
        }
    }
    catch (err) {
        log_1.Log.error(err.stack);
        process.exit(1);
    }
};
exports.cli = cli;
__exportStar(require("./render"), exports);
//# sourceMappingURL=index.js.map