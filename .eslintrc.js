module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    "plugin:@typescript-eslint/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
      "no-use-before-define": "off",
      "react/prop-types": "off",
      "comma-dangle": "off",
      semi: "off",
      "space-before-function-paren": "off",
      "@typescript-eslint/no-var-requires":"off",
      "@typescript-eslint/no-explicit-any": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never"
        }
      ],
      "import/no-duplicates":"off"
    },
    settings: {
      "import/resolver": {
        // "node":{
        //   "extensions": [".js", ".jsx", ".ts", ".tsx"]
        // },
        typescript: {} 
      }
  }
}
