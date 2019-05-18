<template>
  <el-col :span="24" class="container">
    <div class="main">
      <div class="logo">
        <img src="../../assets/logo.png" alt="">
      </div>
      <div class="info">
        <span><em>Name&nbsp;:</em>王绍宇</span>
        <span><em>Tel&nbsp;:</em>18698763511</span>
        <span><em>Email&nbsp;:</em>sy153089195@163.com</span>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
    .container{
      width: $width100;
      background-color: #3E3A33;
      position: relative;
      top: $size30;
      .main{
        width: $width60;
        margin: $size0 auto;
        padding: $size20;
        .logo{
          width: $width50;
          padding-left: $size30;
          float: left;
          overflow: hidden;
          img{display: block; width: $width100;}
        }
        .info{
          width: $width50;
          float: right;
          padding-left: $size50;
          span{
            display: block;
            margin: $size10 $size0;
            font-size: $font_size1_5;
            color: rgba(255, 255, 255, 0.7);
            em{
              font-size: $font_size2;
              margin-right: $size10;
            }
          }
        }
      }
    }
</style>

