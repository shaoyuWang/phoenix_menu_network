module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer:{
    proxy:{
      '/api/v1':{
        target:'http://localhost:3000',
        changeOrigin:true,
      },
      '/auth':{
        target:'http://localhost:3000',
        changeOrigin:true,
      },
    }
  },
};
