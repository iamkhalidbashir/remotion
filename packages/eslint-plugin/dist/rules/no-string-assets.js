"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const createRule = experimental_utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/remotion-dev/remotion`;
});
const NoStringAssets = [
    "Don't reference local assets by string, use an import statement instead.",
    "See: https://www.remotion.dev/docs/assets",
].join("\n");
exports.default = createRule({
    name: "no-string-assets",
    meta: {
        type: "problem",
        docs: {
            description: NoStringAssets,
            category: "Best Practices",
            recommended: "warn",
        },
        fixable: undefined,
        schema: [],
        messages: {
            NoStringAssets: NoStringAssets,
        },
    },
    defaultOptions: [],
    create: (context) => {
        return {
            JSXAttribute: (node) => {
                if (node.type !== "JSXAttribute") {
                    return;
                }
                if (node.name.name !== "src") {
                    return;
                }
                const value = node.value;
                if (!value || value.type !== "Literal") {
                    return;
                }
                const stringValue = value.value;
                if (typeof stringValue !== "string") {
                    return;
                }
                const parent = node.parent;
                if (!parent) {
                    return;
                }
                if (parent.type !== "JSXOpeningElement") {
                    return;
                }
                const name = parent.name;
                if (name.type !== "JSXIdentifier") {
                    return;
                }
                if (name.name === "Img" ||
                    name.name === "img" ||
                    name.name === "Audio" ||
                    name.name === "audio" ||
                    name.name === "Video" ||
                    name.name === "video" ||
                    name.name === "source") {
                    // Network and inline URLs are okay
                    if (stringValue.startsWith("http://")) {
                        return;
                    }
                    if (stringValue.startsWith("https://")) {
                        return;
                    }
                    if (stringValue.startsWith("data:")) {
                        return;
                    }
                    context.report({
                        messageId: "NoStringAssets",
                        node,
                    });
                }
            },
        };
    },
});
//# sourceMappingURL=no-string-assets.js.map