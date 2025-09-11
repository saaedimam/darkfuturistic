/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'jsx-a11y', 'import', 'tailwindcss'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
      },
    ],
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  settings: {
    tailwindcss: {
      callees: ['classnames', 'clsx'],
    },
  },
}

