<template>
  <el-row class="container">
    <el-col :span="16" :offset="4">
      <div class="header">
        <span class="title-style">
          每一个菜单都是一桌美味的饭
          <span class="many"><a @click="moreMenu()">更多菜单&nbsp;>></a></span>
        </span>
      </div>
      <div class="main">
        <div class="menu-item" v-for="item in menuList" :key="item.id">
          <div class="menu-title">
            <a class="title"><span>{{item.name}}</span></a>
            <span class="menu-number"><em>{{item.length}}</em>篇菜谱</span>
          </div>
          <ul class="recipe">
            <li class="recipe-item" v-for="item in item.recipes" :key="item.id">
              <a @click="jumpRecipe(item.id)">
                <img :src="handleImg(item.finishPhoto)">
                </a>
              </li>
          </ul>
          <div class="info">
            <img src="https://s1.c.meishij.net/images/default/tx2_5.png">
            <span class="username">{{item.user.name}}</span>
            <span class="menu-date">{{handleDate(item.createDate)}}</span>
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
      menuList:[],
    }
  },
  created(){
    this.getList();
  },
  methods:{
    handleImg(photo){
      if(!_.isEmpty(photo)){
        return require(`../../assets/imgs/${photo}`);
      }
    },
    handleDate(date){
        return this.moment(date).format('YYYY-MM-DD');
    },
    jumpRecipe(id){
      this.$router.push({path: '/request/recipeTemplate', query: { id }});
    },
    more(){
      this.$router.push({path: '/request/moreMenu'});
    },
    getList(){
      this.$axios({
        url: '/main/foodMenu/getList',
        method: 'get',
      }).then(res =>{
        if(res.status == 200){
          _.forEach(res.data.data.menus, (item,index)=>{
            item.length = item.recipes.length;
            this.menuList.push(item);
            if(index == 5) return false;
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
    .header{
      margin-bottom: $size20;
    }
    .main{
      .menu-item{
        background-color: $color_white;
        padding: $size10;
        margin-bottom: $size10;
        border-radius: $size10;
        &::after{content: ''; display: block; clear: both;};
        ul,li{list-style: none;};
        .menu-title{
          padding-top: $size10;
          padding-left: $size20;
          letter-spacing: $size2;
          &::after{content: ''; display: block; clear: both;}
          .title{
            font-size: $font_size2;
            float: $position_left;
          }
          .menu-number{
            float: $position_right;
            font-size: $font_size1;
            padding-top: $size6;
            padding-right: $size10;
            em{
              font-style: normal;
              color: #f40;
            }
          }
        }
        .recipe{
          display: block;
          margin-top: $size10;
          width: auto;
          height: 210px;
          overflow: scroll;
          overflow-x: auto;
          white-space:nowrap;
          &::-webkit-scrollbar {display:none};
          .recipe-item{
            display: inline-block;
            margin: 0 2px;
            width: 220px;
            height: 200px;
          }
          img{
            width: 220px;
            height: 200px;
            border-radius: $size5;
            padding-right: $size1;
          }
        }
        .info{
          margin-top: $size10;
          text-align: right;
          color: #999;
          width: 100%;
          img{
            width: $size20;
            display: inline-block;
            margin: 0 10px;
          }
          .username{
            text-align: right;
            display: inline-block;
            text-overflow: ellipsis;
            margin-right: 10px;
          }
          .menu-date{
            display: inline-block;
            text-align: right;
          }
        }
      }
    }
  }
</style>
