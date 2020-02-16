module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    semi: [2, 'never'],
    indent: ['error', 2],
    'no-tabs': 0,
    'react/jsx-indent': ['off'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': ['off'],
    "object-curly-newline": ["off"],
    "arrow-body-style": 0,
    "eol-last": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "react/button-has-type": 0,
    "no-trailing-spaces": 0,
    "max-len": 0,
    "operator-linebreak": 0,
    "react/jsx-wrap-multilines": 0
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'no-undef': 0
      }
    }
  ]
}
