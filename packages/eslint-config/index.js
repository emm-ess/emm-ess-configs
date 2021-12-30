module.exports = {
    plugins: [
        'simple-import-sort',
    ],
    extends: [
        'eslint:recommended',
        'standard',
        'plugin:promise/recommended',

        // imports & import-sorting
        'plugin:import/recommended',

        // misc
        'plugin:eslint-comments/recommended',
        'plugin:json/recommended',

        // compatibility
        'plugin:compat/recommended',

        // code-smell-detection / code-quality
        'plugin:unicorn/recommended',
        'plugin:sonarjs/recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production'
            ? 'error'
            : 0,
        'no-debugger': process.env.NODE_ENV === 'production'
            ? 'error'
            : 0,
        indent: [
            'error',
            4,
            {
                // 0 would be nicer but somehow eslint is not working with that
                SwitchCase: 1,
            },
        ],
        'brace-style': [
            'error',
            'stroustrup',
            {
                allowSingleLine: true,
            },
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'no-multi-spaces': [
            'error',
            {
                exceptions: {
                    VariableDeclarator: true,
                    ImportDeclaration: true,
                },
            },
        ],
        'comma-dangle': ['error', 'always-multiline'],
        'key-spacing': [
            'error',
            {
                mode: 'minimum',
            },
        ],
        'object-property-newline': [
            'error',
            {
                allowAllPropertiesOnSameLine: true,
            },
        ],
        semi: [
            'error',
            'never',
            {
                beforeStatementContinuationChars: 'always',
            },
        ],
        'multiline-ternary': ['warn', 'always'],
        'operator-linebreak': ['warn', 'before'],
        quotes: ['error', 'single'],
        'quote-props': ['error', 'as-needed'],
        'object-curly-spacing': ['error', 'never'],
        'arrow-parens': ['error', 'always'],

        // import sorting
        'sort-import': 0,
        'import/order': 0,
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
}
