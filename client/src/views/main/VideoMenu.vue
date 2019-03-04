<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="main">
          <div class="menu-item" v-for="item in videoList" :key="item.id">
            <a href="#" id="menu-item">
              <div class="item-img"><img class="img-responsive" :src="item.finishPhoto"></div>
              <div class="item-info">
                <span class="info-title">{{item.name}}</span>
              </div>
            </a>
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
      videoList:[
        {
          id:1,
          name: '红烧排骨',
          finishPhoto: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'
        },
        {
          id:2,
          name: '红烧排骨',
          finishPhoto: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'
        },
        {
          id:3,
          name: '红烧排骨',
          finishPhoto: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .container{
    margin-top: $size30;
    .row{
      &::after{clear: both;}
      .main{
        text-align: left;
        width: $width_screen;
        margin: $size0 auto;
        overflow: hidden;
        .menu-item{
          width: 33%;
          padding: $size10;
          float: left;
          a{
            text-decoration: none;
            &:hover{
              // transform: scale(1.05);
              transition-duration:0.5s;
              box-shadow: 0px 0px 10px #999;
            }
            .item-img{
              img{width: $width100; height: 200px;}
            }
            .item-info{
              span{display: block;padding: $size20 $size0 $size0 $size20;}
              width: $width100;
              height: 80px;
              background-color: $color_white;
              .info-title{
                font-size: $font_size2;
                color: $color_title;
                font-weight: $font_bold;
              }
            }
          }
        }
      }
    }
  }
</style>

