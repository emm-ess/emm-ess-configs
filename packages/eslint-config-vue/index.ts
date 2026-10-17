import {defineConfig} from 'eslint/config'
import eslintPluginVue from 'eslint-plugin-vue'
import {parser as tsParser} from 'typescript-eslint'

import browserConfig from '@emm-ess-configs/eslint-config/browser'
import typeChecked from '@emm-ess-configs/eslint-config/type-checked'

export default defineConfig([
    ...typeChecked,
    ...browserConfig,
    ...eslintPluginVue.configs['flat/recommended'],
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tsParser,
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

            'vue/component-api-style': ['error', ['script-setup']],
            'vue/define-props-declaration': ['error', 'type-based'],
            'vue/define-emits-declaration': ['error', 'type-based'],
            'vue/define-macros-order': 'error',
            'vue/prefer-use-template-ref': 'error',
            'vue/no-unused-refs': 'error',
            'vue/no-unused-properties': 'error',
            'vue/no-unused-emit-declarations': 'error',

            'unicorn/filename-case': ['error', {
                case: 'pascalCase',
                // only the component file itself; folders like `src/components` stay kebab-case
                checkDirectories: false,
            }],
        },
    },
    {
        // refs live in composables too, not only in components
        files: ['**/*.vue', '**/*.?(c|m)ts'],
        rules: {
            'vue/no-ref-object-reactivity-loss': 'error',
            'vue/require-typed-ref': 'error',
        },
    },
    {
        rules: {
            // since vue-projects are written in conjunction with vite, it's recommended to turn this rule off
            // @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md#when-not-to-use-it
            'import-x/no-unresolved': 0,
        },
    },
])
