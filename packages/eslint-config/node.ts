import {defineConfig} from 'eslint/config'

import {scriptFiles} from './helper.js'

// add-on for code running in node: spread it after the base config, or scope it via `files` (e.g. vite.config.ts)
// (node globals aren't set here: neostandard already adds them to every script file)
export default defineConfig({
    name: 'emm-ess-config/node',
    files: scriptFiles,
    rules: {
        // checked against `engines.node` of the project's package.json
        'n/no-unsupported-features/node-builtins': 'error',
        'n/no-unsupported-features/es-builtins': 'error',
    },
})
