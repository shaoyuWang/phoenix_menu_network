<template>
  <el-row class="container">
    <el-col :span="16" :offset="4">
      <div class="header">
        <span class="title-style">
          每一个菜单都是一桌美味的饭
          <span class="many"><a href="">更多菜谱&nbsp;>></a></span>
        </span>
        <el-carousel :interval="4000" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
      </div>
      <div class="main">
        <div class="menu-item" v-for="item in menuList" :key="item.id">
          <div class="menu-title">
            <a href="#" class="title"><span>{{item.title}}</span></a>
            <span class="menu-number"><em>{{item.number}}</em>篇菜谱</span>
          </div>
          <ul class="recipe">
            <li class="recipe-item"><img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg"></li>
            <li class="recipe-item"><img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg"></li>
            <li class="recipe-item"><img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg"></li>
            <li class="recipe-item"><img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg"></li>
            <li class="recipe-item"><img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg"></li>
            <li class="recipe-item"><img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg"></li>
            <li class="recipe-item"><img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg"></li>
          </ul>
          <div class="info">
            <img src="https://s1.c.meishij.net/images/default/tx2_5.png">
            <span class="username">{{item.user.username}}</span>
            <span class="menu-date">{{item.createDate}}</span>
          </div>
        </div>
      </div>
    </el-col>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from './Footer.vue';
export default {
  components: {Footer},
  data() {
    return {
      menuList:[
        {
          id:1,
          title: '我的菜谱',
          number:10,
          createDate: '2018-12-13',
          user:{
            username: '中天北极紫微大帝',
          }
        },
        {
          id: 2,
          title: '我的菜谱',
          number: 10,
          createDate: '2018-12-13',
          user:{
            username: '中天北极紫微大帝',
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .container{
    .header{
      margin-bottom: $size20;
    }
    .main{
      .menu-item{
        background-color: $color_white;
        padding: $size10;
        margin-bottom: $size10;
        border-radius: $size10;
        &::after{content: ''; display: block; clear: both;};
        ul,li{list-style: none;};
        .menu-title{
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
        .recipe{
          display: block;
          margin-top: $size10;
          width: auto;
          height: 210px;
          overflow: scroll;
          overflow-x: auto;
          white-space:nowrap;
          .recipe-item{
            display: inline-block;
            margin: 0 2px;
            width: 220px;
            height: 200px;
          }
          img{
            width: 220px;
            height: 200px;
            border-radius: $size5;
            padding-right: $size1;
          }
        }
        .info{
          margin-top: $size10;
          text-align: right;
          color: #999;
          width: 100%;
          img{
            width: $size20;
            display: inline-block;
            margin: 0 10px;
          }
          .username{
            text-align: right;
            display: inline-block;
            text-overflow: ellipsis;
            margin-right: 10px;
          }
          .menu-date{
            display: inline-block;
            text-align: right;
          }
        }
      }
    }
  }
</style>
