<template>
  <el-row class="container">
    <el-col :span="16" :offset="4">
      <div class="main">
        <div class="list-item" v-for="item in videoList" :key="item.id">
          <a @click="jumpVideoTemplate(item.id)">
            <div class="item-img"><img class="img-responsive" :src="video"></div>
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
      video: 'https://vdse.bdstatic.com//f13a391bcf73de64c2e965eddae17fc8?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2F05e5f8a459a1c44cf5507778e239fe62d4d63104a5aa5dfdc4b9efbafad673f1',
      videoList:[]
    }
  },
  created(){
    this.getList();
  },
  methods:{
    jumpVideoTemplate(id){
      this.$router.push({path: '/request/videoTemplate', query: { id }});
    },
    getList(){
      this.$axios({
        url: '/main/recipeVideo/getList',
        method: 'get',
      }).then(res =>{
        console.log(res);
        if(res.status == 200){
          _.forEach(res.data.data.videos, (item,index)=>{
            this.videoList.push(item);
            if(index == 19) return false;
          });
        }
      });
    },
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

