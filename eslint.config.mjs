import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'error' },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.min.js',
      'public/**',
      'static/**',
      '*.log',
      '*.env',
      '*.env.*',
      'tmp/**',
      'temp/**',
      'service-worker.js',
    ],
  },
  {
    rules: {
      'react/jsx-pascal-case': [
        'warn',
        {
          allowAllCaps: true, // 모든 대문자 이름 허용
          ignore: ['S_'], // S_로 시작하는 이름 무시
        },
      ],
    },
  },
];
