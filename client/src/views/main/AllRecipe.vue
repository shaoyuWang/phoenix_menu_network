<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-xs-12">
        <div class="tabs">
          <el-tabs v-model="tabValue" type="card">
            <el-tab-pane label="我的美食属性(禁用)" name="property" disabled></el-tab-pane>
            <el-tab-pane :label="item.name" :name="item.name" v-for="item in tabList" :key="item.id">
              <div class="sort">
                <ul class="tab-item" v-for="tab in item.tabs" :key="tab.id">
                  <span class="sort-title">{{tab.name}}</span>
                  <li v-for="tabItem in tab.tabItem" :key="tabItem.id"><a href="#">{{tabItem.name}}</a></li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="main">
          <span class="title-style">
            一个不留
            <span class="many"><a href="">更多菜谱&nbsp;>></a></span>
          </span>
          <div class="col-lg-3 col-md-3 col-xs-3 menu-item" v-for="item in menuList" :key="item.id">
            <a href="#" id="menu-item">
              <div class="item-img"><img class="img-responsive" :src="item.img"></div>
              <div class="item-info">
                <span class="info-title">{{item.title}}</span>
                <span class="info-user">{{item.username}}</span>
              </div>
            </a>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
  import Footer from './Footer.vue';
export default {
  components: {Footer},
  data(){
    return {
      tabValue: '中华菜系',
      tabList:[
        {
          id: 1,
          name: '家常菜谱',
          title: 'home',
          tabs: [
            {
              id: 1,
              name: '家常菜谱',
              tabItem:[
                { id: '1', name: '家常菜'},
                { id: '2', name: '私房菜'},
                { id: '3', name: '海鲜菜'},
                { id: '4', name: '凉拌菜'},
              ]
            },
            {
              id: 2,
              name: '家常菜谱2',
              tabItem:[
                { id: '1', name: '家常菜'},
                { id: '2', name: '私房菜'},
                { id: '3', name: '海鲜菜'},
                { id: '4', name: '凉拌菜'},]
            }
          ]
        },
        {
          id: 2,
          name: '中华菜系',
          title: 'kind',
          tabs: [
            {
              id: 1,
              name: '中华菜系',
              tabItem:[
                { id: '1', name: '东北菜'},
                { id: '2', name: '西北菜'},
                { id: '3', name: '南北菜'},
                { id: '4', name: '北北菜'},
              ]
            }
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
    .row{
      .tabs{
        width: $width_screen;
        margin: $size50 auto;
        margin-bottom: $size30;
        /deep/ .el-tabs__header{
          margin-bottom: $size0;
          // background-color: rgba(247, 247, 247, 1);
          /deep/ .el-tabs__nav {
            border: $size0;
            /deep/ .is-active{
              background-color: $color_white !important;
              // border-bottom: $size1 solid rgba(153, 153, 153, 0.2);
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
            padding: $size0 $size10 $size10 $size40;
            border-bottom: 1px solid rgba(153, 153, 153, 0.2);
            overflow: hidden;
            .sort-title{
              padding: $size10 $size0 $size10 $size20;
              font-size: $font_size2_5;
            }
            li{
              float: left;
              a{
                display: inline-block;
                padding: $size5 $size20;
                &:hover{color: $color_white; background-color: #f40;}
              }
            }
          }
        }
      }
      .main{
          width: $width_screen;
          margin: $size0 auto;
          overflow: hidden;
          .menu-item{
            padding: $size5;
            float: left;
            // &:after{content: ''; clear: both;}
            a{
              text-decoration: none;
              &:hover{transform: scale(1.05); transition-duration:0.5s;}
              .item-img{
                img{width: $width100;}
              }
              .item-info{
                span{display: block;padding: $size10 $size15;}
                width: $width100;
                background-color: $color_white;
                .info-title{
                  font-size: $font_size2;
                  color: $color_title;
                  font-weight: $font_bold;
                }
                .info-user{
                  font-size: $font_size1;
                  color: $color_user_title;
                  overflow: hidden;
                  width: 100%;
                }
              }
            }
          }
        }
    }
  }
</style>

