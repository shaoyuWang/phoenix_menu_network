<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <div class="banner">
        <span class="title-style">精选推荐</span>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img class="banner-img" :src="img">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="main">
        <ul class="tab">
          <li v-for="item in itemList" :key="item.timeType">
            <a @click="SelectContent(item.name, item.timeType)" :class="{tab_active: item.timeType == current}">{{item.name}}</a>
          </li>
        </ul>
        <div class="main-recommend">
          <span class="title-style">
            推荐{{title}}菜品
            <span class="many"><a @click="more(1)">更多菜谱&nbsp;>></a></span>
          </span>
          <div class="list-item" v-for="item in recipeList" :key="item.id">
            <a @click="jumpRecipe(item.id)">
              <div class="item-img"><img class="img-responsive" :src="img"></div>
              <div class="item-info">
                <span class="info-title">{{item.name}}</span>
                <span class="info-user">{{item.user.name}}</span>
              </div>
            </a>
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
      current: 1,
      title: '早餐',
      img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
      itemList: [
        {timeType: 1, name: '早餐'},{timeType: 2, name: '午餐'},{timeType: 3, name: '晚餐'}
      ],
      bannerList: [],
      recipeList: [],
      recipeTemp: [],
    }
  },
  created(){
    this.getList();
  },
  methods:{
    jumpRecipe(id){
      this.$router.push({path: '/request/recipeTemplate', query: { id }});
    },
    // 显示当前内容
    SelectContent(name, timeType){
      this.title = name;
      this.current = timeType;
      this.recipeList = _.filter(this.recipeTemp, { timeType: timeType});
    },
    more(status){
      this.$router.push({path: '/request/allTemplate', query: { status }});
    },
    getList(){
      this.$axios({
        url: '/main/threeMeals/getList',
        method: 'get',
      }).then(res =>{
        console.log(res);
        if(res.status == 200){
          _.forEach(res.data.data.recipes, (item,index)=>{
            this.bannerList.push(item);
            if(index == 4) return false;
          });

          _.forEach(res.data.data.recipes, (item,index)=>{
            this.recipeTemp.push(item);
            if(index == 14) return false;
          });
          this.initList();
        }
      });
    },
    initList(){
      this.recipeList = _.filter(this.recipeTemp, { timeType: this.itemList[0].timeType});
      console.log(this.recipeTemp);
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
  .banner{
    width: $width100;
    overflow: hidden;
    .banner-img{
      width: 100%;
    }
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
          cursor: pointer;
          &:hover{ color:$color_a_hover;}
        }
      }
    }
    .main-recommend{
      text-align: left;
      overflow: hidden;
      
    }
  }
</style>

