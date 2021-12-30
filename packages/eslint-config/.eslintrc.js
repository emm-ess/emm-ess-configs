module.exports = {
    root: true,
    extends: './index.js',
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
