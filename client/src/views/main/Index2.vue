<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="banner">
          <el-carousel arrow="always" :autoplay='autoplay' trigger="click" type="card" height="400px">
            <el-carousel-item v-for="item in bannerList" :key="item.id" ref="banner_item">
              <div class="banner-title">
                <span>{{item.title}}</span>
              </div>
              <ul>
                <li v-for="img in item.imgs" :key="img.id">
                  <a href="healthFood" class="img">
                    <img :src="img.img" alt="">
                    <div class="description">
                      <span class="title">{{img.title}}</span>
                      <span class="info">{{img.info}}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      autoplay: false,
      showTitle: false,
      bannerList: [
        { 
          id: 1, 
          title: '今日早餐推荐：趁“早”爱自己，善待你的胃',
          imgs: [
            { id: 1, img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg'},
            { id: 2, img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 3, img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg'},
          ]
        },
        { 
          id: 2, 
          title: '今日午餐推荐：让嘴巴过足瘾的午餐',
          imgs: [
            { id: 1, img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg'},
            { id: 2, img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 3, img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg'},
          ]
        },
        { 
          id: 3, 
          title: '今日下午茶推荐：惬意时光，美味甜蜜齐分享',
          imgs: [
            { id: 1, img: 'https://s1.ig.meishij.net/p/20190222/0e1486237ec2b3fab35ac1643225c2b1.jpg'},
            { id: 2, img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'},
            { id: 3, img: 'https://s1.ig.meishij.net/p/20190225/52836834688cc3530d95d0ccf25384a0.jpg'},
          ]
        },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  @import "../../styles/variables.scss";
  .container-fluid{
    .row{
      .banner{
        .el-carousel__item{

          .banner-title{
            width: $width100;
            text-align: center;
            padding: $size20 0;
            span{
              font: {
                size: 28px;
                family: $font_family;
              }
              color: hotpink;
            }
          }
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
              width: 33.33%;
              .img{
                display: block;
                img{
                  width: $width100;
                }
                .description{
                  background-color: rgba(255, 255, 255, 0.9);
                  width: 100%;
                  height: 20px;
                  position: absolute;
                  bottom: 30px;
                }
              }
              
            }
          }
        }
      }
    }
  }
</style>

