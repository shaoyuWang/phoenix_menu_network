<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="banner">
          <span class="title-style">精选推荐</span>
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="main">
          <ul class="tab">
            <li v-for="(item,index) in itemList" :key="index">
              <a @click="SelectContent(item.name,index)" :class="{active: index == current}">{{item.name}}</a>
            </li>
          </ul>
          <div class="main-recommend">
            <span class="title-style">
              推荐{{title}}菜品
              <span class="many"><a href="">更多菜谱&nbsp;>></a></span>
            </span>
            <div class="col-lg-3 col-md-3 col-xs-3 menu-item" v-for="item in menuList" :key="item.id">
              <a href="#" id="menu-item">
                <div class="item-img"><img class="img-responsive" :src="item.img"></div>
                <div class="item-info">
                  <span class="info-title">{{item.title}}</span>
                  <span class="info-user">{{item.username}}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from './Footer.vue';
export default {
  components: {Footer},
  data() {
    return {
      current: 0,
      title: '早餐',
      itemList: [
        {name: '早餐'},{name: '午餐'},{name: '晚餐'}
      ],
      menuList:[
        {
          id: 1,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 2,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 3,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 4,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 5,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
      ],
    }
  },
  methods:{
    // 显示当前内容
    SelectContent(name,index){
      this.title = name;
      this.current = index;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .container{
    .row{
      width: $width_screen;
      margin: $size0 auto;
      .banner{
        width: $width100;
      }
      .main{
        text-align: center;
        ul,li{margin: 0;padding: 0;text-decoration: none; list-style: none;}
        .tab{
          display: inline-block;
          padding: $size10;
          letter-spacing: $size3;
          &::after{
            content: '';
            display: inline-block;
            clear: both;
          }
          li{
            float: $position_left;
            a{
              padding: $size10 $size20;
              font-size: $font_size2;
              &:hover{ color:$color_a_hover;}
            }
          }
        }
        .main-recommend{
          text-align: left;
          width: $width_screen;
          margin: $size0 auto;
          overflow: hidden;
          .menu-item{
            padding: $size5;
            float: left;
            a{
              text-decoration: none;
              &:hover{transform: scale(1.05); transition-duration:0.5s;}
              .item-img{
                img{width: $width100;}
              }
              .item-info{
                span{display: block;padding: $size10 $size15;}
                width: $width100;
                background-color: $color_white;
                .info-title{
                  font-size: $font_size2;
                  color: $color_title;
                  font-weight: $font_bold;
                }
                .info-user{
                  font-size: $font_size1;
                  color: $color_user_title;
                  overflow: hidden;
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

