import {defineConfig} from 'eslint/config'

import {addGitIgnore, scriptFiles} from '@emm-ess-configs/eslint-config/helper'
import nodeConfig from '@emm-ess-configs/eslint-config/node'
import baseConfig from '@emm-ess-configs/eslint-config/type-checked'

export default defineConfig([
    addGitIgnore(import.meta.dirname),
    {
        ignores: ['**/CHANGELOG.md'],
    },
    {
        languageOptions: {
            sourceType: 'module',
            parserOptions: {
                projectService: true,
            },
        },
    },
    ...baseConfig,
    ...nodeConfig,
    {
        files: scriptFiles,
        rules: {
            'simple-import-sort/imports': ['error', {
                groups: [
                    // Side effect imports.
                    [String.raw`^\u0000`],
                    // Node.js builtins prefixed with `node:`.
                    ['^node:'],
                    // Packages.
                    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                    [String.raw`^@?(?!emm-ess-configs)\w`],
                    // Packages from here
                    [String.raw`^@emm-ess-configs\w`],
                    // Absolute imports and other imports such as Vue-style `@/foo`.
                    // Anything not matched in another group.
                    ['^'],
                    // Relative imports.
                    // Anything that starts with a dot.
                    [String.raw`^\.`],
                    // Style imports.
                    [String.raw`^.+\.(s?css|sass)$`],
                ],
            }],
        },
    },
    {
        // seems like unicorn has a bug in this rule
        files: [
            'packages/eslint-config/index.ts',
            'packages/eslint-config/type-checked.ts',
        ],
        rules: {'unicorn/no-top-level-side-effects': 0},
    },
])
