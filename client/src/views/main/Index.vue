<template>
  <el-row>
    <el-col class="row">
      <el-carousel indicator-position="outside" :interval='5000' :autoplay="autoplay" arrow="never" height="450px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <span class="title-style">{{item.title}}</span>
          <ul>
            <li v-for="food in item.items" :key="food.id">
              <a href="#" class="food">
                <img class="img-responsive" :src="food.img" alt="" ref="img" @click="indent()">
                <div class="info">
                  <span class="info-title">{{food.title}}</span>
                  <span class="info-description">{{food.description}}</span>
                </div>
              </a>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
      <div class="main-food">
        <span class="title-style">
          二月，阳气生发，适当春捂
          <span class="many"><a href="#">更多食材&nbsp;>></a></span>
        </span>
        <div class="recommend-food">
          <ul class="nav nav-tabs tabs" role="tablist">
            <li role="presentation" class="active"><a href="#fruit" aria-controls="fruit" role="tab" data-toggle="tab">水果</a></li>
            <li role="presentation"><a href="#vegetable" aria-controls="vegetable" role="tab" data-toggle="tab">蔬菜</a></li>
            <li role="presentation"><a href="#grain" aria-controls="grain" role="tab" data-toggle="tab">五谷</a></li>
            <li role="presentation"><a href="#fresh" aria-controls="fresh" role="tab" data-toggle="tab">生鲜</a></li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane" :id="items.classify" v-for="items in tabList" :key="items.id">
              <a href="#" v-for="item in items.tabs" :key="item.id">
                <img class="img-responsive" :src="item.img">
                <div class="info">
                  <span class="icon"></span><span>{{item.name}}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <el-col :span="16" :offset="4" class="main-recommend">
        <span class="title-style">每日推荐菜谱
          <span class="many"><a href="">更多菜谱&nbsp;>></a></span>
        </span>
        <div class="list-item" v-for="item in menuList" :key="item.id">
          <a href="#">
            <div class="item-img"><img class="img-responsive" :src="item.img"></div>
            <div class="item-info">
              <span class="info-title">{{item.title}}</span>
              <span class="info-user">{{item.username}}</span>
            </div>
          </a>
        </div>
      </el-col>
    </el-col>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from './Footer.vue';
export default {
  components: {Footer},
  mounted(){
    $('#fruit').addClass('active');
    $('.el-menu-demo li:first').css('margin-left','20px');
  },
  data(){
    return {
      autoplay: false,
      bannerList: [
        { 
          id: 1, 
          title: '今日早餐推荐：趁“早”爱自己，善待你的胃',
          items: [
            { id: 1, img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 2, img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 3, img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 4, img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 5, img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
          ]
        },
        { 
          id: 2, 
          title: '今日午餐推荐：让嘴巴过足瘾的午餐',
          items: [
            { id: 1, img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 2, img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 3, img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 4, img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 5, img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
          ]
        },
        { 
          id: 3, 
          title: '今日下午茶推荐：惬意时光，美味甜蜜齐分享',
          items: [
            { id: 1, img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 2, img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 3, img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 4, img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
            { id: 5, img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg', title: '红烧黄花鱼', description: '鱼肉软绵，汤汁醇厚'},
          ]
        },
      ],
      tabList:[
        { id: 1, 
          classify: 'fruit',
          tabs: [
            { id: 1, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 2, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg'},
            { id: 3, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 4, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg'},
            { id: 5, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 6, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg'},
            { id: 7, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 8, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg'},
          ] 
        },
        { id: 2,
          classify: 'vegetable',
          tabs: [
            { id: 1, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 2, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg'},
            { id: 3, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 4, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg'},
            { id: 5, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 6, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg'},
            { id: 7, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 8, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg'},
          ] 
        },
        { id: 3,
          classify: 'grain',
          tabs: [
            { id: 1, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 2, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 3, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 4, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 5, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 6, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 7, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 8, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
          ] 
        },
        { id: 4,
          classify: 'fresh',
          tabs: [
            { id: 1, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 2, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 3, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 4, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 5, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 6, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 7, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 8, name: '菠萝', img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
          ] 
        },
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
        {
          id: 6,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 7,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 8,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
      ],

    }
  },
  methods:{
    indent(){
      console.log(this.$refs);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .row{
    .el-carousel{
      .el-carousel__item{
        ul,li,img{
          list-style: none;
          display: block;
          margin: $size0;
          padding: $size0;
        }
        ul{
          &::after{content: ''; display: block; clear: both;}
          li{
            float: $position_left;
            width: $width20;
            .food{
              position: relative;
              &:hover{ color: $color_title; transform: scale(1.05); transition-duration:0.5s; z-index: 100;};
              img{
                width: $width100;
                height: 328px;
              }
              .info{
                width: $width100;
                height: $size100;
                background-color: rgba(255, 255, 255, 0.6);
                position: absolute;
                bottom: $size0;
                span{
                    display: block;
                    padding-top: $size20;
                    padding-left: $size20;
                  }
                .info-title{
                  font-size: $font_size2;
                }
                .info-description{
                  color: #909399;
                }
              }
            }
          }
        }
      }
      /deep/ .el-carousel__button{
        width: 50px;
        background-color: #00CCFF;
      }
    }
    .main-food{
      width:$width_screen;
      margin: $size0 auto;
      .recommend-food{
        background-color: $color_background_hover;
        width: $width100;
        padding: $size10;
        .tabs{
          border-bottom: $size0;
          font-weight: bold;
          .active{
            a{
              color: #67C23A;
            }
          }
        }
        .tab-content{
          overflow: auto;
          a{
            display: block;
            float: $position_left;
            padding: $size0 $size1;
            width: 12.4%;
            position: relative;
            &:after{content: '';clear: both;}
            &:hover{color: $color_title;}
            img{ 
              width: $width100;
              position: relative;
              &:hover{
                transform: scale(1.15);
                transition-duration:0.5s;
                z-index: 100;
              }
            }
            .info{
              position: absolute;
              z-index: 101;
              bottom: $size0;
              padding: $size3;
              width: $width100;
              background-color: rgba(255, 255, 255, 0.6);
              span{
                display: block;
                float: $position_left;
                &:after{content: ''; clear: both;}
              }
              .icon{
                width: $size10;
                height: $size10;
                margin: $size5;
                background-color: #999;
              }
            }
          }
        }
      }
    }
    .main-recommend{
      overflow: hidden;
      .list-item{
        width: 280px;
        padding: $size10;
        .item-img{
          width: $width100;
        }
      }
    }
  }
</style>

