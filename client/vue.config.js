const webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  // productionSourceMap: false,
  // devServer:{
  //   proxy:{
  //     '/admin':{
  //       target:'http://localhost:3000',
  //       changeOrigin:true,
  //     },
  //     '/request':{
  //       target:'http://localhost:3000',
  //       changeOrigin:true,
  //     },
  //   }
  // },
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
          })
    ]
  }
};
