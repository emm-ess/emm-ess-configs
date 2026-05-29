import {defineConfig} from 'eslint/config'
import eslintPluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

import typeChecked from '@emm-ess-configs/eslint-config/type-checked'

export default defineConfig(
    ...typeChecked,
    ...eslintPluginVue.configs['flat/recommended'],
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.vue'],
                sourceType: 'module',
            },
        },
        rules: {
            'vue/block-lang': ['error', {
                script: {
                    lang: ['ts', 'tsx'],
                    allowNoLang: false,
                },
            }],
            'vue/html-indent': ['error', 4],
            'vue/block-order': ['error', {
                order: ['template', 'script', 'style'],
            }],
            'vue/first-attribute-linebreak': ['error', {
                singleline: 'beside',
                multiline: 'below',
            }],
            'vue/max-attributes-per-line': ['error', {
                singleline: {
                    max: 2,
                },
            }],

            'unicorn/filename-case': ['error', {
                case: 'pascalCase',
            }],

            // turn off react centric rule
            'sonarjs/pluginRules-of-hooks': 0,
        },
    },
    {
        rules: {
            // since vue-projects are written in conjunction with vite, it's recommended to turn this rule off
            // @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md#when-not-to-use-it
            'import-x/no-unresolved': 0,
        },
    },
)
