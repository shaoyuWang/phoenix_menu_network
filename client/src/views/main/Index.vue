<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <el-carousel indicator-position="outside" :interval='5000'  arrow="always" trigger="click" height="450px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
              <span class="title">{{item.title}}</span>
              <ul>
                <li v-for="food in item.items" :key="food.id">
                  <a href="healthFood" class="food">
                    <img :src="food.img" alt="">
                  </a>
                  <div class="info">
                    <a href="#">
                      <span class="info-title">{{food.title}}</span>
                      <span class="info-description">{{food.description}}</span>
                    </a>
                  </div>
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>
          <div class="main">
            <span class="title">
              二月，阳气生发，适当春捂
              <span class="many"><a href="#">更多食材&nbsp;></a></span>
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
                    <img :src="item.img">
                    <div class="info">
                      <span class="icon"></span><span>{{item.name}}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted(){
    $('#fruit').addClass('active');
  },
  data(){
    return {
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
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .container-fluid{
    .row{
      .title{
        display: block;
        width: $width100;
        text-align: center;
        padding: $size40 0;
        color: hotpink;
        font-size: 28px;
        position: relative;
        .many{
          position: absolute;
          right: 0;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.3);
          padding-top: 12px;
          a{ text-decoration: none; }
        }
      }
      .col-md-12{
        .el-carousel__item{
          ul,li,img{
            list-style: none;
            display: block;
            margin: 0;
            padding: 0;
          }
          ul{
            overflow: auto;
            li{
              float: left;
              width: 20%;
              .food{
                img{
                  width: $width100;
                }
              }
              .info{
                height: 100px;
                background-color: rgba(255, 255, 255, 0.6);
                position: relative;
                bottom: 100px;
                span{
                    display: block;
                    padding: $size10 0 $size5 $size20;
                  }
                a{
                  text-decoration: none;
                  color: rgb(19, 7, 63);
                  .info-title{
                    font-size: 20px;
                  }
                  .info-description{color: rgb(19, 7, 63);}
                  &:hover{
                    color: rgb(231, 8, 27);
                  }
                }
              }
            }
          }
        }
        .main{
          height: 4000px;
          width:60%;
          margin: 0 auto;
          .recommend-food{
            background-color: rgba(90, 81, 81,0.4);
            width: $width100;
            padding: $size10;
            .tabs{
              border-bottom: 0px;
              font-weight: bold;
              .active{
                color: skyblue;
                a{
                  color: rgba(255, 68, 0, 0.8);
                }
              }
            }
            .tab-content{
              overflow: auto;
              a{
                display: block;
                float: left;
                padding: 0 1px;
                width: 12.4%;
                position: relative;
                &:after{content: '';clear: both;}
                &:hover{color: #f40;}
                img{ width: 100% }
                .info{
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  background-color: rgba(255, 255, 255, 0.6);
                  span{
                    display: block;
                    float: left;
                    &:after{content: ''; clear: both;}
                  }
                  .icon{
                    width: 10px;
                    height: 10px;
                    margin: 5px;
                    background-color: #999;
                  }
                }
              }
              
            }
          }
        }
      }
    }
  }
</style>

