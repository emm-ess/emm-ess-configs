import path from 'node:path'
import url from 'node:url'

import {fixupPluginRules} from '@eslint/compat'
import {FlatCompat} from '@eslint/eslintrc'
import js from '@eslint/js'
import compat from 'eslint-plugin-compat'
import json from 'eslint-plugin-json'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import neostandard from 'neostandard'
import tseslint from 'typescript-eslint'

const compatThingy = new FlatCompat({
    baseDirectory: path.dirname(url.fileURLToPath(import.meta.url)),
})

/**
 * @param {string} name the pugin name
 * @param {string} alias the plugin alias
 * @returns {import("eslint").ESLint.Plugin}
 */
function legacyPlugin(name, alias = name) {
    const plugin = compatThingy.plugins(name)[0]?.plugins?.[alias]

    if (!plugin) {
        throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`)
    }

    return fixupPluginRules(plugin)
}

export default [
    {
        ignores: [
            '!.*',
            '!package.json',
            '**/node_modules',
        ],
    },
    {
        files: ['*.js', '*.cjs', '*.mjs', '*.json'],
        languageOptions: {
            globals: globals.builtin,
            ecmaVersion: 'latest',
        },
    },
    js.configs.recommended,
    ...neostandard({ts: true}),
    json.configs.recommended,
    compat.configs['flat/recommended'],
    sonarjs.configs.recommended,
    {
        name: 'emm-ess-config/plugins',
        plugins: {
            unicorn,
            import: legacyPlugin('eslint-plugin-import', 'import'),
            'simple-import-sort': legacyPlugin('eslint-plugin-simple-import-sort', 'simple-import-sort'),
            'eslint-comments': legacyPlugin('eslint-plugin-eslint-comments', 'eslint-comments'),
        },
    },
    ...tseslint.config({
        files: ['*.ts', '*.tsx'],
        extends: [
            ...tseslint.configs.strict,
            ...tseslint.configs.stylistic,
            // ...compatThingy.plugins('eslint-plugin-deprecation'),
            ...compatThingy.extends('plugin:import/typescript'),
            {
                name: 'emm-ess-config/typescript',
                rules: {
                    '@typescript-eslint/consistent-type-imports': ['error', {
                        prefer: 'type-imports',
                    }],
                    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
                },
            },
        ],
    }),
    {
        name: 'emm-ess-config/rules',
        rules: {
            'no-console': process.env.NODE_ENV === 'production'
                ? 'error'
                : 0,
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

            // import sorting
            'sort-import': 0,
            'import/order': 0,
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',

            'sonarjs/todo-tag': 0,

            // ToDo: check why turning off sonarjs-rules for ts is needed
            'sonarjs/prefer-enum-initializers': 0,
            'sonarjs/prefer-nullish-coalescing': 0,
        },
    },
]
