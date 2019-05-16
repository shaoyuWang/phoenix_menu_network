<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <div class="banner">
        <el-carousel :interval="4000" height="300px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="main">
        <div class="header">
          <span>内容精选</span>
        </div>
        <div class="list-item" v-for="item in diaryList" :key="item.id">
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
  </el-row>
</template>

<script>
export default {
  data(){
    return {
      diaryList:[
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
    .header{
      text-align: $position_center;
      font-size: $font_size3;
      color: $color_title;
      letter-spacing: $size8;
      padding: $size20 $size0;
    }
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

