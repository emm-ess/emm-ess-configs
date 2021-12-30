module.exports = {
    extends: [
        './index.js',

        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],

    plugins: [
        '@typescript-eslint',
        'deprecation',
    ],

    rules: {
        'deprecation/deprecation': 'warn',

        'no-use-before-define': 0,
    },
}
