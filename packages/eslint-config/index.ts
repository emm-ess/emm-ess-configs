import js from '@eslint/js'
import commentConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs'
import {defineConfig} from 'eslint/config'
import compat from 'eslint-plugin-compat'
import {importX} from 'eslint-plugin-import-x'
import pluginJson from 'eslint-plugin-json'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import neostandard from 'neostandard'
import tseslint from 'typescript-eslint'

export default defineConfig(
    {
        ignores: [
            '!.*',
            '!package.json',
            '**/node_modules',
        ],
    },
    {
        languageOptions: {
            globals: globals.builtin,
            ecmaVersion: 'latest',
        },
    },
    js.configs.recommended,
    commentConfigs.recommended,
    ...neostandard({ts: true}),
    importX.flatConfigs.recommended,
    pluginJson.configs.recommended,
    compat.configs['flat/recommended'],
    sonarjs.configs.recommended,
    unicorn.configs.recommended,
    {
        name: 'emm-ess-config/plugins',
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
    },
    {
        name: 'emm-ess-config/rules',
        rules: {
            // @ts-expect-error it works, that's good enough for now
            'no-console': process.env.NODE_ENV === 'production'
                ? 'error'
                : 0,
            // @ts-expect-error it works, that's good enough for now
            'no-debugger': process.env.NODE_ENV === 'production'
                ? 'error'
                : 0,

            '@stylistic/indent': ['error', 4, {
                // 0 would be nicer but somehow eslint is not working with that
                SwitchCase: 1,
            }],
            '@stylistic/brace-style': ['error', 'stroustrup', {
                allowSingleLine: true,
            }],
            '@stylistic/block-spacing': ['error', 'never'],
            '@stylistic/space-before-function-paren': ['error', {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            }],
            '@stylistic/no-multi-spaces': ['error', {
                exceptions: {
                    VariableDeclarator: true,
                    ImportDeclaration: true,
                },
            }],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/key-spacing': ['error', {
                mode: 'minimum',
            }],
            '@stylistic/object-property-newline': ['error', {
                allowAllPropertiesOnSameLine: true,
            }],
            '@stylistic/semi': ['error', 'never', {
                beforeStatementContinuationChars: 'always',
            }],
            '@stylistic/multiline-ternary': ['warn', 'always'],
            '@stylistic/operator-linebreak': ['warn', 'before'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/quote-props': ['error', 'as-needed'],
            '@stylistic/object-curly-spacing': ['error', 'never'],
            '@stylistic/arrow-parens': ['error', 'always'],

            // imports
            'import-x/no-extraneous-dependencies': ['error', {
                includeTypes: true,
            }],
            'import-x/no-cycle': 'error',
            'import-x/no-mutable-exports': 'error',
            'import-x/no-useless-path-segments': ['warn', {
                noUselessIndex: true,
            }],
            'import-x/no-relative-packages': 'error',
            'import-x/newline-after-import': 'warn',
            'import-x/no-anonymous-default-export': 'warn',

            // import sorting
            'sort-import': 0,
            'import/order': 0,
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',

            'sonarjs/todo-tag': 0,
            'sonarjs/fixme-tag': 0,
            'unicorn/prevent-abbreviations': 0,
        },
    },
    ...defineConfig({
        files: ['**/*.ts', '**/*.tsx'],
        extends: [
            ...tseslint.configs.strict,
            ...tseslint.configs.stylistic,
            {
                name: 'emm-ess-config/typescript',
                rules: {
                    '@typescript-eslint/consistent-type-imports': ['error', {
                        prefer: 'type-imports',
                    }],
                    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],

                    // ToDo: check why turning off sonarjs-rules for ts is needed
                    'sonarjs/prefer-enum-initializers': 0,
                    'sonarjs/prefer-nullish-coalescing': 0,
                    'sonarjs/different-types-comparison': 0,
                    '@stylistic/block-spacing': ['error', 'never'],

                    'import-x/no-unresolved': 0,
                },
            },
        ],
    }),
)
