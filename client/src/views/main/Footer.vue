<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-xs-12">
        <div class="main">
          <div class="logo">
            <a href="/index">
              <img src="../../assets/logo.png" alt="">
            </a>
            <div class="des">
              <span>生如夏花之绚烂</span>
              <span>死如秋叶之静美</span>
            </div>
          </div>
          <div class="info">
            <span><em>Name&nbsp;:</em>你爸爸</span>
            <span><em>Tel&nbsp;:</em>18698763511</span>
            <span><em>Email&nbsp;:</em>153089195@qq.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    .col-md-12{
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
          a{
            float: left;
            width: $width30;
            &::after{content: ''; clear: both;}
            img{display: block; width: $width100;}
          }
          .des{
            padding: $size30 $size0 $size0 $size50;
            float: left;
            span{
              display: block;
              font-size: $font_size2;
              color: rgba(255, 255, 255, 0.7);
            }
          }
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

