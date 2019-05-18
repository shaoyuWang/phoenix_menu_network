<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <div class="banner">
        <span class="title-style">精选推荐</span>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="main">
        <ul class="tab">
          <li v-for="(item,index) in itemList" :key="index">
            <a @click="SelectContent(item.name,index)" :class="{tab_active: index == current}">{{item.name}}</a>
          </li>
        </ul>
        <div class="main-recommend">
          <span class="title-style">
            推荐{{title}}菜品
            <span class="many"><a @click="more(1)">更多菜谱&nbsp;>></a></span>
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
      current: 0,
      title: '早餐',
      itemList: [
        {name: '早餐'},{name: '午餐'},{name: '晚餐'}
      ],
      menuList:[
        {
          id: 1,
          img: 'https://s1.st.meishij.net/r/145/214/5241145/s5241145_155694793439005.jpg',
          title: '花开富贵卷',
          username: '中天北极紫微大帝'
        },
        {
          id: 2,
          img: 'https://s1.st.meishij.net/r/197/182/6108197/s6108197_155629783855746.jpg',
          title: '蒜香凉拌三丝',
          username: '中天北极紫微大帝'
        },
        {
          id: 3,
          img: 'https://s1.st.meishij.net/r/155/60/5140155/s5140155_155196470921235.jpg',
          title: '蜜汁鸡翅',
          username: '中天北极紫微大帝'
        },
        {
          id: 4,
          img: 'https://s1.st.meishij.net/r/83/154/13351083/s13351083_155635662091593.jpg',
          title: '法式黑椒烤牛肉肠',
          username: '中天北极紫微大帝'
        },
        {
          id: 5,
          img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
          title: '红烧黄花鱼',
          username: '中天北极紫微大帝'
        },
      ],
    }
  },
  methods:{
    // 显示当前内容
    SelectContent(name,index){
      this.title = name;
      this.current = index;
    },
    more(status){
      this.$router.push({path: '/request/allTemplate', query: { status }});
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

