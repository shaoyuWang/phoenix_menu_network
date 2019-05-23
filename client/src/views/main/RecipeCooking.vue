<template>
  <el-row class="container">
    <el-col :span="16" :offset="4">
      <div class="tabs">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane :label="item.name" :name="item.name" v-for="item in sortKindList" :key="item.id">
            <div class="sort">
              <ul class="tab-item">
                <span class="sort-title">{{item.name}}</span>
                <li v-for="sortItem in item.sorts" :key="sortItem.id">
                  <el-button @click="checkSort(sortItem.name)" type="text">{{sortItem.name}}</el-button>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="main">
        <span class="title-style">
          了解餐饮文化大国，看中华八大菜系
          <span class="many"><a @click="more(1)">更多菜谱&nbsp;>></a></span>
        </span>
        <div class="list-item" v-for="item in recipeList.slice((currentPage-1)*pagesize, currentPage*pagesize)" :key="item.id">
          <a @click="jumpRecipe(item.id)">
            <div class="item-img"><img class="img-responsive" :src="handleImg(item.finishPhoto)"></div>
            <div class="item-info">
              <span class="info-title">{{item.name}}</span>
              <span class="info-user">{{item.evaluate}}</span>
            </div>
          </a>
        </div>
      </div>
      <el-col :span="24" style="text-align: center; margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" 
          :current-page.sync="currentPage" :pager-count="5" :total="recipeList.length">
        </el-pagination>
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
    this.getList();
  },
  data(){
    return {
      pagesize: 12,
      currentPage: 1,
      activeName: '',
      img: '',
      sortKindList: [],
      recipeTemp: [],
      recipeList: [],
    }
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
    checkSort(sortName){
      this.recipeList = _.filter(this.recipeTemp,{ sort: { name:sortName } });
    },
    jumpRecipe(id){
      this.$router.push({path: '/request/recipeTemplate', query: { id }});
    },
    more(status){
      this.$router.push({path: '/request/allTemplate', query: { status }});
    },
    getList(){
      this.$axios({
        url: '/main/recipeCooking/getList',
        method: 'get',
      }).then(res =>{
        if(res.status == 200){
          _.forEach(res.data.data.recipes, (item,index)=>{
            this.recipeTemp.push(item);
            if(index == 15) return false;
          });
          
          _.forEach(res.data.data.sortKinds, (item)=>{
            this.sortKindList.push(item);
          });
          this.activeName = this.sortKindList[0].name;
          this.initList();
        }
      });
    },
    initList(){
      this.recipeList = _.filter(this.recipeTemp, { sort: { name: this.sortKindList[0].sorts[0].name}});
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .container{
    .tabs{
      margin: $size50 auto;
      margin-bottom: $size30;
      /deep/ .el-tabs__header{
        margin-bottom: $size0;
        /deep/ .el-tabs__nav {
          border: $size0;
          /deep/ .is-active{
            background-color: $color_white !important;
          }  
          /deep/ .el-tabs__item{
            font-size: $font_size1_5;
            padding: $size0 $size40;
            background-color: rgba(255, 255, 255, 0.4);
            &:hover{background-color: $color_white;}
          }
        }
      }
      .sort{
        background-color: $color_white;
        width: $width100;
        ul,li{
          list-style: none; 
          margin: $size0; 
          padding: $size0;
          a{color: rgba(151, 151, 151, 0.9);}
        }
        span{display: block;}
        
        .tab-item{
          padding: $size0 $size10 $size10 $size20;
          border-bottom: 1px solid rgba(153, 153, 153, 0.2);
          overflow: hidden;
          .sort-title{
            padding: $size10 $size0 $size10 $size20;
            font-size: $font_size2_5;
            color: #f40;
          }
          li{
            float: left;
            .el-button{
              display: inline-block;
              padding: $size5 $size20;
              color: rgb(80, 80, 80);
              &:hover{color: $color_white; background-color: blue;}
            }
          }
        }
      }
    }
    .main{
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

