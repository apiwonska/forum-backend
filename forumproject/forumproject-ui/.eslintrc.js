module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'jsx-a11y', 'import', 'prettier', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'es5',
         singleQuote: true,
        printWidth: 80,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'error',
    'import/prefer-default-export': 'error',
    'no-nested-ternary': 'error',
  },
  // accept absolute imports from src folder
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
