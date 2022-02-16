module.exports = {
    "env": {
        "browser": true
    },
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 12,
        sourceType:'module'
    },
    rules: {
        'class-methods-use-this': 'off',
        camelcase: 'off',
      },
};