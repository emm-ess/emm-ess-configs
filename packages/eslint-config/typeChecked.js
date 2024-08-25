import tseslint from 'typescript-eslint'

import baseConfig from './index.js'

export default [
    ...baseConfig,
    ...tseslint.config({
        files: ['*.ts', '*.tsx'],
        extends: [
            ...tseslint.configs.strictTypeCheckedOnly,
            ...tseslint.configs.stylisticTypeCheckedOnly,
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
                },
            },
        ],
    }),
]
