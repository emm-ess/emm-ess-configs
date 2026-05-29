import {defineConfig} from 'eslint/config'

import {addGitIgnore, globals} from '@emm-ess-configs/eslint-config/helper'
import baseConfig from '@emm-ess-configs/eslint-config/type-checked'

export default defineConfig([
    {
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
            },
        },
        ignores: [
            '!.*',
            '!package.json',
            '**/node_modules',
        ],
    },
    addGitIgnore(import.meta.dirname),
    ...baseConfig,
    {
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
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
                },
            ],
        },
    },
])
