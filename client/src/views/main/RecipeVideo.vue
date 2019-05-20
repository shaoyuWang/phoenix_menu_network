<template>
  <el-row class="container">
    <el-col :span="16" :offset="4">
      <div class="main">
        <div class="list-item" v-for="item in videoList" :key="item.id">
          <a @click="jumpVideoTemplate(item.id)">
            <div class="item-img">
              <video class="img-responsive" preload="auto" :src="handleVideo(item.video)"></video>
            </div>
            <div class="item-info">
              <span class="info-title">{{item.name}}</span>
              <span class="info-user">{{item.user.name}}</span>
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
      videoList:[],
    }
  },
  created(){
    this.getList();
  },
  methods:{
    handleVideo(video){
      return require(`../../assets/videos/${video}`);
    },
    jumpVideoTemplate(id){
      this.$router.push({path: '/request/videoTemplate', query: { id }});
    },
    getList(){
      this.$axios({
        url: '/main/recipeVideo/getList',
        method: 'get',
      }).then(res =>{
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
      .img-responsive{
        width: 110% !important;
        height: 110% !important;
      }
    }
  }
</style>

