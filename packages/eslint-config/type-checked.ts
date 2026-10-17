import {defineConfig} from 'eslint/config'
import {configs as tsEslintConfigs} from 'typescript-eslint'

import baseConfig from './index.js'

export default defineConfig(
    ...baseConfig,
    ...defineConfig({
        files: ['**/*.?(c|m)ts', '**/*.tsx'],
        extends: [
            ...tsEslintConfigs.strictTypeCheckedOnly,
            ...tsEslintConfigs.stylisticTypeCheckedOnly,
            {
                name: 'emm-ess-config/type-check',
                rules: {
                    // ToDo: those rules complaint about the settings, even it was turned on
                    '@typescript-eslint/no-unnecessary-condition': ['error', {
                        allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true,
                    }],
                    '@typescript-eslint/prefer-nullish-coalescing': ['error', {
                        allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true,
                    }],
                    '@typescript-eslint/switch-exhaustiveness-check': 'error',
                },
            },
        ],
    }),
)
