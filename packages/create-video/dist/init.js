"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const chalk_1 = __importDefault(require("chalk"));
const degit_1 = __importDefault(require("degit"));
const execa_1 = __importDefault(require("execa"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const log_1 = require("./log");
const prompts_1 = __importStar(require("./prompts"));
const FEATURED_TEMPLATES = [
    {
        shortName: 'Hello World',
        name: 'remotion-dev/template-helloworld',
        description: 'The default starter template (recommended)',
    },
    {
        shortName: 'Hello World (Javascript)',
        name: 'remotion-dev/template-helloworld-javascript',
        description: 'The default starter template in plain JS',
    },
    {
        shortName: 'React Three Fiber',
        name: 'remotion-dev/template-three',
        description: 'Remotion + React Three Fiber Starter Template',
    },
    {
        shortName: 'Still images',
        name: 'remotion-dev/template-still',
        description: 'Dynamic PNG/JPEG template with built-in server',
    },
    {
        shortName: 'Text To Speech',
        name: 'FelippeChemello/Remotion-TTS-Example',
        description: 'Turns text into speech and makes a video',
    },
];
function padEnd(str, width) {
    // Pulled from commander for overriding
    const len = Math.max(0, width - (0, strip_ansi_1.default)(str).length);
    return str + Array(len + 1).join(' ');
}
function validateName(name) {
    if (typeof name !== 'string' || name === '') {
        return 'The project name can not be empty.';
    }
    if (!/^[a-z0-9@.\-_]+$/i.test(name)) {
        return 'The project name can only contain URL-friendly characters (alphanumeric and @ . -  _)';
    }
    return true;
}
function assertValidName(folderName) {
    const validation = validateName(folderName);
    if (typeof validation === 'string') {
        throw new Error(`Cannot create an app named ${chalk_1.default.red(`"${folderName}"`)}. ${validation}`);
    }
}
async function assertFolderEmptyAsync(projectRoot, folderName) {
    const conflicts = fs_extra_1.default
        .readdirSync(projectRoot)
        .filter((file) => !/\.iml$/.test(file));
    if (conflicts.length) {
        const message = 'Try using a new directory name, or moving these files.';
        log_1.Log.newLine();
        log_1.Log.error(message);
        log_1.Log.newLine();
        process.exit(1);
    }
}
const shouldUseYarn = () => {
    var _a, _b;
    return Boolean(((_a = process.env.npm_execpath) === null || _a === void 0 ? void 0 : _a.includes('yarn.js')) ||
        ((_b = process.env.npm_config_user_agent) === null || _b === void 0 ? void 0 : _b.includes('yarn')));
};
const isGitExecutableAvailable = async () => {
    try {
        await (0, execa_1.default)('git', ['--version']);
        return true;
    }
    catch (e) {
        if (e.errno === 'ENOENT') {
            log_1.Log.warn('Unable to find `git` command. `git` not in PATH.');
            return false;
        }
    }
};
const initGitRepoAsync = async (root, flags = { silent: false, commit: true }) => {
    // let's see if we're in a git tree
    try {
        await (0, execa_1.default)('git', ['rev-parse', '--is-inside-work-tree'], {
            cwd: root,
        });
        !flags.silent &&
            log_1.Log.info('New project is already inside of a git repo, skipping git init.');
    }
    catch (e) {
        if (e.errno === 'ENOENT') {
            !flags.silent &&
                log_1.Log.warn('Unable to initialize git repo. `git` not in PATH.');
            return false;
        }
    }
    // not in git tree, so let's init
    try {
        await (0, execa_1.default)('git', ['init'], { cwd: root });
        !flags.silent && log_1.Log.info('Initialized a git repository.');
        if (flags.commit) {
            await (0, execa_1.default)('git', ['add', '--all'], { cwd: root, stdio: 'ignore' });
            await (0, execa_1.default)('git', ['commit', '-m', 'Create a new Remotion video'], {
                cwd: root,
                stdio: 'ignore',
            });
            await (0, execa_1.default)('git', ['branch', '-M', 'main'], {
                cwd: root,
                stdio: 'ignore',
            });
        }
        return true;
    }
    catch (e) {
        log_1.Log.verbose('git error:', e);
        // no-op -- this is just a convenience and we don't care if it fails
        return false;
    }
};
const resolveProjectRootAsync = async () => {
    let projectName = '';
    try {
        const { answer } = await (0, prompts_1.default)({
            type: 'text',
            name: 'answer',
            message: 'What would you like to name your video?',
            initial: 'my-video',
            validate: (name) => {
                const validation = validateName(path_1.default.basename(path_1.default.resolve(name)));
                if (typeof validation === 'string') {
                    return 'Invalid project name: ' + validation;
                }
                return true;
            },
        });
        if (typeof answer === 'string') {
            projectName = answer.trim();
        }
    }
    catch (error) {
        // Handle the aborted message in a custom way.
        if (error.code !== 'ABORTED') {
            throw error;
        }
    }
    const projectRoot = path_1.default.resolve(projectName);
    const folderName = path_1.default.basename(projectRoot);
    assertValidName(folderName);
    await fs_extra_1.default.ensureDir(projectRoot);
    await assertFolderEmptyAsync(projectRoot, folderName);
    return [projectRoot, folderName];
};
const init = async () => {
    var _a, _b, _c, _d;
    const [projectRoot, folderName] = await resolveProjectRootAsync();
    await isGitExecutableAvailable();
    const descriptionColumn = Math.max(...FEATURED_TEMPLATES.map((t) => typeof t === 'object' ? t.shortName.length : 0)) + 2;
    const template = await (0, prompts_1.selectAsync)({
        message: 'Choose a template:',
        optionsPerPage: 20,
        choices: FEATURED_TEMPLATES.map((template) => {
            if (typeof template === 'string') {
                return prompts_1.default.separator(template);
            }
            else {
                return {
                    value: template.name,
                    title: chalk_1.default.bold(padEnd(template.shortName, descriptionColumn)) +
                        template.description.trim(),
                    short: template.name,
                };
            }
        }),
    }, {});
    try {
        const emitter = (0, degit_1.default)(`https://github.com/${template}`);
        await emitter.clone(projectRoot);
        log_1.Log.info(`Cloned template into ${projectRoot}`);
    }
    catch (e) {
        log_1.Log.error('Error with template cloning. Aborting');
        process.exit(1);
    }
    log_1.Log.info(`Created project at ${chalk_1.default.blue(folderName)}. Installing dependencies...`);
    if (shouldUseYarn()) {
        log_1.Log.info('> yarn');
        const promise = (0, execa_1.default)('yarn', [], {
            cwd: projectRoot,
        });
        (_a = promise.stderr) === null || _a === void 0 ? void 0 : _a.pipe(process.stderr);
        (_b = promise.stdout) === null || _b === void 0 ? void 0 : _b.pipe(process.stdout);
        await promise;
    }
    else {
        log_1.Log.info('> npm install');
        const promise = (0, execa_1.default)('npm', ['install'], {
            cwd: projectRoot,
        });
        (_c = promise.stderr) === null || _c === void 0 ? void 0 : _c.pipe(process.stderr);
        (_d = promise.stdout) === null || _d === void 0 ? void 0 : _d.pipe(process.stdout);
        await promise;
    }
    await initGitRepoAsync(projectRoot, {
        silent: false,
        commit: true,
    });
    log_1.Log.info(`Welcome to ${chalk_1.default.blue('Remotion')}!`);
    log_1.Log.info(`✨ Your video has been created at ${chalk_1.default.blue(folderName)}.\n`);
    log_1.Log.info('Get started by running');
    log_1.Log.info(chalk_1.default.blue(`cd ${folderName}`));
    log_1.Log.info(chalk_1.default.blue(shouldUseYarn() ? 'yarn start' : 'npm start'));
    log_1.Log.info('');
    log_1.Log.info('To render an MP4 video, run');
    log_1.Log.info(chalk_1.default.blue(shouldUseYarn() ? 'yarn build' : 'npm run build'));
    log_1.Log.info('');
    log_1.Log.info('Read the documentation at', chalk_1.default.underline('https://remotion.dev'));
    log_1.Log.info('Enjoy Remotion!');
};
exports.init = init;
//# sourceMappingURL=init.js.map