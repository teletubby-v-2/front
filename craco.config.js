const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // 'primary-color': '#5CDB95',
              // 'text-selection-bg': '@blue-4',
              //can customize and theme by override variables.
              //https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}