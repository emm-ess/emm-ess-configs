import globals from 'globals'

import baseConfig from '@emm-ess-configs/eslint-config'

export default [
    {
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
        ignores: [
            '!.*',
            '!package.json',
            '**/node_modules',
        ],
    },
    ...baseConfig,
    {
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // Side effect imports.
                        ['^\\u0000'],
                        // Node.js builtins prefixed with `node:`.
                        ['^node:'],
                        // Packages.
                        // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                        ['^@?(?!emm-ess-configs)\\w'],
                        // Packages from here
                        ['^@emm-ess-configs\\w'],
                        // Absolute imports and other imports such as Vue-style `@/foo`.
                        // Anything not matched in another group.
                        ['^'],
                        // Relative imports.
                        // Anything that starts with a dot.
                        ['^\\.'],
                        // Style imports.
                        ['^.+\\.(s?css|sass)$'],
                    ],
                },
            ],
        },
    },
]
