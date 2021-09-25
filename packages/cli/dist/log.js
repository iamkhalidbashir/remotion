"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const remotion_1 = require("remotion");
exports.Log = {
    verbose: (...args) => {
        if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel('verbose')) {
            return console.log(chalk_1.default.blueBright(...args));
        }
    },
    info: (...args) => {
        if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel('info')) {
            return console.log(...args);
        }
    },
    warn: (...args) => {
        if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel('warn')) {
            return console.warn(chalk_1.default.yellow(...args));
        }
    },
    error: (...args) => {
        if (remotion_1.Internals.Logging.isEqualOrBelowLogLevel('error')) {
            return console.error(chalk_1.default.red(...args));
        }
    },
};
//# sourceMappingURL=log.js.map