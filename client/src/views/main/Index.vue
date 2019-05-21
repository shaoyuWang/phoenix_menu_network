<template>
  <el-row>
    <el-col class="row">
      <el-carousel indicator-position="outside" :interval='3000' :autoplay="autoplay" arrow="never" height="450px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <span class="title-style">{{item.title}}</span>
          <ul>
            <li v-for="food in item.recipes" :key="food.id">
              <a class="food" @click="jumpRecipe(food.id)">
                <img class="img-responsive" :src="handleImg(food.finishPhoto)">
                <div class="info">
                  <span class="info-title">{{food.name}}</span>
                  <span class="info-description">{{food.evaluate}}</span>
                </div>
              </a>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
      <el-col :span="16" :offset="4" class="main-food">
        <span class="title-style">
          二月，阳气生发，适当春捂
          <span class="many"><a @click="more(2)">更多食材&nbsp;>></a></span>
        </span>
        <div class="recommend-food">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="item.name" :name="item.name" v-for="item in materialKindList" :key="item.id">
              <ul class="kind-list">
                <li class="material-item" v-for="materialItem in item.materials" :key="materialItem.id">
                  <img class="material-img" :src="handleImg(materialItem.photo)">
                  <span class="material-name">{{materialItem.name}}</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="16" :offset="4" class="main-recommend">
        <span class="title-style">每日推荐菜谱
          <span class="many"><a @click="more(1)">更多菜谱&nbsp;>></a></span>
        </span>
        <div class="list-item" v-for="item in recipeList" :key="item.id">
          <a @click="jumpRecipe(item.id)">
            <div class="item-img"><img class="img-responsive" :src="handleImg(item.finishPhoto)"></div>
            <div class="item-info">
              <span class="info-title">{{item.name}}</span>
              <span class="info-user">{{item.evaluate}}</span>
            </div>
          </a>
        </div>
      </el-col>
    </el-col>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from './Footer.vue';
export default {
  components: {Footer},
  data(){
    return {
      autoplay: true,
      activeName: '',
      bannerList: [],
      materialKindList:[],
      recipeList:[],

    }
  },
  mounted(){
    $('#fruit').addClass('active');
    $('.el-menu-demo li:first').css('margin-left','20px');
    this.getList();
  },
  methods:{
    handleImg(photo){
      if(!_.isEmpty(photo)){
        return require(`../../assets/imgs/${photo}`);
      }
    },
    jumpRecipe(id){
      this.$router.push({path: '/request/recipeTemplate', query: { id }});
    },
    more(status){
      this.$router.push({path: '/request/allTemplate', query: { status }});
    },
    getList(){
      this.$axios({
        url: '/main/index/getList',
        method: 'get',
      }).then(res =>{
        if(res.status == 200){
          let title = ['今日早餐推荐：趁“早”爱自己，善待你的胃','今日午餐推荐：让嘴巴过足瘾的午餐','今日下午茶推荐：惬意时光，美味甜蜜齐分享'];
          let breakfast = _.filter(res.data.data.recipes,{timeType:1});
          let lunch = _.filter(res.data.data.recipes,{timeType:2});
          let dinner = _.filter(res.data.data.recipes,{timeType:3});
          for(var i = 0; i< 3; i++){
            let temporary = [];
            let data = [];
            switch(i){
              case 0: data = breakfast; break;
              case 1: data = lunch; break;
              case 2: data = dinner; break;
            }
            _.forEach(data, (item, index) => {
              temporary.push(item);
              if (index == 4) return false;
            });
            this.bannerList.push({
              id: i,
              title: title[i],
              recipes: temporary,
            });
          }

          // 获取菜谱
          _.forEach(res.data.data.recipes, (item, index) => {
            this.recipeList.push(item);
            if (index == 11) return false;
          });
          
          this.materialKindList = res.data.data.kinds;
          this.activeName = this.materialKindList[0].name;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .row{
    .el-carousel{
      .el-carousel__item{
        ul,li,img{
          list-style: none;
          display: block;
          margin: $size0;
          padding: $size0;
        }
        ul{
          &::after{content: ''; display: block; clear: both;}
          li{
            float: $position_left;
            width: $width20;
            .food{
              position: relative;
              cursor: pointer;
              &:hover{ color: $color_title; transform: scale(1.05); transition-duration:0.5s; z-index: 100;};
              img{
                width: $width100;
                height: 328px;
              }
              .info{
                width: $width100;
                height: $size100;
                background-color: rgba(255, 255, 255, 0.6);
                position: absolute;
                bottom: $size0;
                span{
                    display: block;
                    padding-top: $size20;
                    padding-left: $size20;
                  }
                .info-title{
                  font-size: $font_size2;
                }
                .info-description{
                  width: 100%;
                  overflow: hidden;
                  white-space:nowrap;
                  text-overflow:ellipsis;
                  color: #909399;
                }
              }
            }
          }
        }
      }
      /deep/ .el-carousel__button{
        width: 50px;
        background-color: #00CCFF;
      }
    }
    .main-food{
      .recommend-food{
        background-color: white;
        border-bottom: 1px solid rgb(156, 149, 149);
        border-radius: 10px;
        width: $width100;
        padding: $size10;
        .el-tabs{padding: 0 10px;}
        .kind-list{
          margin: 0;
          padding: 0;
          ul,li{list-style: none;}
          .material-item{
            display: inline-block;
            overflow: hidden;
            width: 100px;
            text-align: center;
            &:hover{
              color: #f40;
              transform: scale(1.05);
              transition-duration: 0.5s;
            }
            .material-img{
              display: inline-block;
              width: 80px;
              
            }
            .material-name{
              background-color: white;
              display: block;
              font-size: 14px;
            }
          }
        }
      }
    }
    .main-recommend{
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

