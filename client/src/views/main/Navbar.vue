<template>
  <div>
    <div class="container nav">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
          <div class="header">
            <div class="header-logo">
              <a href="/request/index" class="logo"><img src="../../assets/logo.png" alt=""></a>
            </div>
            <div class="header-login">
              <a href="/login">登录</a>
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-md-12 col-xs-12" style="background-color:#fff;">
          <el-menu :default-active="activeIndex" active-text-color='#409EFF' router class="el-menu-demo" mode="horizontal">
            <el-menu-item index="/request/index" @click="currentPath()">
              <span class="nav-font">首页</span>
            </el-menu-item>
            <el-menu-item index="/request/allRecipe" @click="currentPath()" ref="menu">
              <span class="nav-font">菜谱大全<span class="el-icon-arrow-down"></span></span>
            </el-menu-item>
            <el-menu-item index="/request/threeMeals" @click="currentPath()">
              <span class="nav-font">一日三餐</span>
            </el-menu-item>
            <el-menu-item index="/request/foodMenu" @click="currentPath()">
              <span class="nav-font">美食菜单</span>
            </el-menu-item>
            <el-menu-item index="/request/gourmetMaster" @click="currentPath()">
              <span class="nav-font">美食达人</span>
            </el-menu-item>
            <el-menu-item index="/request/videoMenu" @click="currentPath()">
              <span class="nav-font">美食视频</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '',
    };
  },
  mounted() {
    this.currentPath();
    console.log(this.$refs.menu.$el);
    this.$refs.menu.$el.style.padding = '0 20px 0 30px';
  },
  methods: {
    Logout() {
      this.$router.push({ path: "/"});
    },
    // 获取当前页面路径
    currentPath(){
      this.activeIndex = this.$router.history.current.fullPath;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .nav{
    background-color: $color_navbar;
    .row{
      margin: $size0;
      .header{
        width: $width_screen;
        margin: $size0 auto;
        // overflow:auto;
        .header-logo{
          float: $position_left;
          .logo{
            display: block;
            text-align: $position_center;
            img{
              width: $width50;
            }
          }
        }

        .header-login{
          float: $position_right;
          padding: $size40 $size60 $size0;
          a{
            color: $color_white;
            padding: $size10;
            &:hover{
              background-color: $color_background_hover;
              border-radius: $width20;
              text-decoration: none;
            }
          }
          &::after{ content: ''; display: block; clear: both; }
        }
      }

      .el-menu-demo{
        width: 997px;
        margin: $size0 auto;
        border: $size0;
        ul,li{ display: inline-block; }
        .nav-font{
          font-size: $font_size1_8;
          font-family: $font_family;
          font-weight: $font_bold;
          letter-spacing: 2px;
          span{
            font-size: 2px;
            margin-right: 0;
            padding-left: 5px;
          }
        }
        .el-menu-item{
          padding: $size0 $size30;
          &:hover{ color: #f40;}
        }
      }
    }
  }
  
</style>
