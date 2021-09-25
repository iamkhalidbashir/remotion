"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const deterministic_randomness_1 = __importDefault(require("../rules/deterministic-randomness"));
const ruleTester = new experimental_utils_1.ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
});
ruleTester.run("deterministic-randomness", deterministic_randomness_1.default, {
    valid: ['import {random} from "remotion";\nconst hi = random(null)'],
    invalid: [
        {
            code: "Math.random()",
            errors: [
                {
                    messageId: "DeterministicRandomness",
                },
            ],
        },
    ],
});
//# sourceMappingURL=no-math-random.test.js.map