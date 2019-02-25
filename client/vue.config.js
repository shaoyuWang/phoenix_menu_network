module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer:{
    proxy:{
      '/admin':{
        target:'http://localhost:3000',
        changeOrigin:true,
      },
      '/request':{
        target:'http://localhost:3000',
        changeOrigin:true,
      },
    }
  },
};
