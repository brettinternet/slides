module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
  overrides: [
    {
      files: ['config/**/*.js'],
      extends: ['plugin:node/recommended'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'node/no-unpublished-require': 'off',
      },
    },
    {
      files: ['bin/**/*.ts'],
      extends: ['plugin:node/recommended'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './bin/tsconfig.json',
        ecmaVersion: 6,
        sourceType: 'module',
      },
      rules: {
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-unpublished-import': 'off',
      },
    },
  ],
}
