module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 防止报Expected linebreaks to be 'LF' but found 'CRLF'
    'linebreak-style': [0, 'error', 'windows'],
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
