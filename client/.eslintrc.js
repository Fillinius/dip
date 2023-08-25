module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: [0, 2],
    semi: 0,
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' },
    ],
    'multiline-ternary': ['off'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
  },
}
