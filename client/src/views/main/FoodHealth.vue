<template>
  <el-row class="container">
    <el-col :span="16" :offset="4">
      <div class="tabs">
        <el-tabs v-model="tabValue" type="card">
          <el-tab-pane :label="item.name"  v-for="item in tabList" :key="item.id">
            <div class="sort">
              <ul class="tab-item">
                <span class="sort-title">{{item.name}}</span>
                <li v-for="sortItem in item.sorts" :key="sortItem.id"><el-button ref="sortItem" type="text">{{sortItem.name}}</el-button></li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="main">
        <span class="title-style">
          合理的饮食，是身体健康的第一要素
          <span class="many"><a href="">更多菜谱&nbsp;>></a></span>
        </span>
        <div class="list-item" v-for="item in menuList" :key="item.id">
          <a href="#">
            <div class="item-img"><img class="img-responsive" :src="item.img"></div>
            <div class="item-info">
              <span class="info-title">{{item.title}}</span>
              <span class="info-user">{{item.username}}</span>
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
  mounted(){
    console.log(this.$refs.tabItem);
  },
  data(){
    return {
      tabValue: '',
      tabList:[
        {
          id: 1,
          name: '功能性调节',
          sorts: [
            { id: 1, name: '清热去火'},
            { id: 2, name: '减肥'},
            { id: 3, name: '祛痰'},
            { id: 4, name: '消化不良'},
        ]   
        },
        {
          id: 2,
          name: '疾病调节',
          sorts: [
            { id: 1, name: '糖尿病'},
            { id: 2, name: '高血压'},
            { id: 3, name: '痛风'},
            { id: 4, name: '胃炎'},
            ]
        },
      ],
      menuList:[
        {
          id: 1,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 2,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 3,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 4,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 5,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 6,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 7,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
        {
          id: 8,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
      ],
      
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

