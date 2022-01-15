require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: '@emm-ess-configs',
    env: {
        node: true,
    },
    overrides: [
        {
            files: '**/*.*',
            rules: {
                'unicorn/prefer-module': 0,
            },
        },
    ],
}
