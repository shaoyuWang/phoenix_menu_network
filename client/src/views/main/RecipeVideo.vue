<template>
  <el-row class="container">
    <el-col :span="16" :offset="4">
      <div class="main">
        <div class="list-item" v-for="item in videoList" :key="item.id">
          <a href="#" id="menu-item">
            <div class="item-img"><img class="img-responsive" :src="item.finishPhoto"></div>
            <div class="item-info">
              <span class="info-title">{{item.name}}</span>
            </div>
          </a>
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
        {
          id:4,
          name: '红烧排骨',
          finishPhoto: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'
        },
        {
          id:5,
          name: '红烧排骨',
          finishPhoto: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg'
        },
        {
          id:6,
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
    .main{
      overflow: hidden;
      .menu-item{
        width: 220px;
        padding: $size5;
        float: left;
        a{
          text-decoration: none;
          &:hover{
            transition-duration: 0.5s;
            box-shadow: $size0 $size0 $size20 #000;
          }
          .item-img{
            img{
              width: $width100; 
              height: 210px;
            }
          }
          .item-info{
            span{
              display: block;
              padding: $size20 $size0 $size40 $size20;
            }
            width: $width100;
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
</style>

