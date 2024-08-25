import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

import typeChecked from '@emm-ess-configs/eslint-config/typeChecked'

export default [
    ...typeChecked,
    ...pluginVue.configs['flat/recommended'],
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

            // turn off react centric rule
            'sonarjs/pluginRules-of-hooks': 0,
        },
    },
]
