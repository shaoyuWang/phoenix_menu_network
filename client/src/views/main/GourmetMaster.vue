<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <div class="banner">
        <el-carousel :interval="4000" height="300px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <a @click="jumpDiary(item.id)" style="height: 300px;">
              <img :src="handleImg(item.photo)" style="width: 100%;">
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="main">
        <div class="header">
          <span class="title-style">
          内容精选
          <span class="many"><a @click="more(3)">更多日记&nbsp;>></a></span>
        </span>
        </div>
        <div class="list-item" v-for="item in diaryList.slice((currentPage-1)*pagesize, currentPage*pagesize)" :key="item.id">
            <a @click="jumpDiary(item.id)">
              <div class="item-img"><img class="img-responsive" :src="handleImg(item.photo)"></div>
              <div class="item-info">
                <span class="info-title">{{item.title}}</span>
                <span class="info-user">{{item.user.name}}</span>
              </div>
            </a>
          </div>
      </div>
      <el-col :span="24" style="text-align: center; margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" 
          :current-page.sync="currentPage" :pager-count="5" :total="diaryList.length">
        </el-pagination>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data(){
    return {
      pagesize: 12,
      currentPage: 1,
      bannerList: [],
      diaryList: [],
    }
  },
  created(){
    this.getList();
  },
  methods:{
    current_change(currentPage){  //改变当前页
      this.currentPage = currentPage
    },
    handleImg(photo){
      if(!_.isEmpty(photo)){
        return require(`../../assets/imgs/${photo}`);
      }
    },
    jumpDiary(id){
      this.$router.push({path: '/request/diaryTemplate', query: { id }});
    },
    more(status){
      this.$router.push({path: '/request/allTemplate', query: { status }});
    },
    getList(){
      this.$axios({
        url: '/main/gourmetMaster/getList',
        method: 'get',
      }).then(res =>{
        if(res.status == 200){
          _.forEach(res.data.data.diarys, (item,index)=>{
            this.bannerList.push(item);
            if(index == 4) return false;
          });

          _.forEach(res.data.data.diarys, (item,index)=>{
            this.diaryList.push(item);
            if(index == 14) return false;
          });
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .banner{
    width: $width100;
    margin-top: 30px;
  }
  .main{
    margin-top: $size20;
    .diary-item{
      float: left;
      margin: $size10;
      background-color: #f40;
      width: 200px;
      height: 200px;
    }
  }
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
</style>

