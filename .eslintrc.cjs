const commonRules = {
  // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
  'no-prototype-builtins': 'off',
  // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
  'import/prefer-default-export': 'off',
  'import/no-default-export': 'error',
  // Common abbreviations are known and readable
  'unicorn/prevent-abbreviations': 'off',
  'unicorn/filename-case': 'off',
  'unicorn/no-array-reduce': 'off',
  'unicorn/no-array-for-each': 'off',
  'unicorn/no-null': 'off',
  'unicorn/prefer-object-from-entries': 'off',
  'unicorn/prefer-node-protocol': 'off',
  'react/jsx-filename-extension': [
    1,
    {
      extensions: ['.jsx', '.tsx'],
    },
  ],
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'react/jsx-props-no-spreading': 'off',
  'react/react-in-jsx-scope': 'off',
  'import/imports-first': ['error', 'absolute-first'],
  'react/prop-types': 0,
  'react/require-default-props': 0,
  semi: ['error', 'always'],
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        '**/*.test.js',
        '**/*.tests.js',
        '**/*.stories.js',
        'src/setupTests.js',
        '.storybook/**/*.js',
        '**/*.stories.*',
      ],
    },
  ],
  'no-param-reassign': [
    'error',
    { props: true, ignorePropertyModificationsFor: ['draft'] },
  ],
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
  'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  'react/function-component-definition': [
    2,
    {
      namedComponents: ['arrow-function', 'function-declaration'],
    },
  ],
  'react/jsx-no-useless-fragment': [
    'error',
    {
      allowExpressions: true,
    },
  ],
  // Makes no sense to allow type inferrence for expression parameters, but require typing the response
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    { allowExpressions: true, allowTypedFunctionExpressions: true },
  ],
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: ['return', 'block-like'] },
    { blankLine: 'always', prev: ['block-like'], next: '*' },
  ],
};

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react-refresh'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  rules: {
    ...commonRules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
