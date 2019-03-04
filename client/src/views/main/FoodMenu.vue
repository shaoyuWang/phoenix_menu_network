<template>
<div class="container">
  <div class="row">
    <div class="col-lg-12 col-md-12 col-xs-12">
      <div class="header">
        <span class="title-style">
          每一个菜单都是一桌美味的饭
          <span class="many"><a href="">更多菜谱&nbsp;>></a></span>
        </span>
      </div>
      <div class="menu-item">
        <div class="menu-title">
          <a href="#" class="title"><span>我的菜单</span></a>
          <span class="menu-number"><em>10</em>篇菜单</span>
        </div>
        <div class="info">
          <span class="date">2018-12-13 21:21:38</span>
          <div class="user">
            <img src="https://s1.c.meishij.net/images/default/tx2_5.png">
            <span class="username">中天北极紫微大帝</span>
          </div>
        </div>
        <div class="recipe">
          <img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg">
          <img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg">
          <img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg">
          <img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Footer from './Footer.vue';
export default {
  components: {Footer},
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .row{
    width: $width60;
    margin: $size0 auto;
    .menu-item{
      background-color: $color_white;
      padding: $size10;
      &::after{content: ''; display: block; clear: both;}
      .menu-title{
        // padding: $size10 $size20;
        padding-top: $size10;
        padding-left: $size20;
        letter-spacing: $size2;
        &::after{content: ''; display: block; clear: both;}
        .title{
          font-size: $font_size2;
          float: $position_left;
        }
        .menu-number{
          float: $position_right;
          font-size: $font_size1;
          padding-top: $size6;
          padding-right: $size10;
          em{
            font-style: normal;
            color: #f40;
          }
        }
      }
      .info{
        float: $position_left;
        margin: $size10;
        color: #999;
        width: 18%;
        height: 180px;
        position: relative;
        .date{
          position: absolute;
          top: $size0;
          padding-left: $size10;
        }
        .user{
          position: absolute;
          bottom: $size0;
          width: $width100;
          img{
            width: $size40;
            display: inline-block;
          }
          .username{
            display: inline-block;
            text-overflow: ellipsis;
          }
        }
      }
      .recipe{
        float: left;
        margin-top: $size10;
        width: 78%;
        img{
          width: 25%;
          border-radius: $size5;
          padding-right: $size1;
        }
      }
    }
  }
</style>
