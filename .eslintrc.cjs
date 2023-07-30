module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', '@jambit/typed-redux-saga'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    },
    overrides: [
        {
            files: ['./**/*.ts'],
            excludedFiles: ['./**/*.spec.ts'],
            rules: {
                '@jambit/typed-redux-saga/use-typed-effects': 'error',
                '@jambit/typed-redux-saga/delegate-effects': 'error',
            },
        },
    ],
};
