<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="header">
          <div class="header-logo">
            <a href="/request/index" class="logo"><img src="../../assets/logo.png" alt=""></a>
          </div>
          <div class="header-login">
            <a href="/login">登录</a>
          </div>
        </div>
        <div class="col-md-12" style="background-color:#fff;">
          <el-menu :default-active="activeIndex" active-text-color='#409EFF' router class="el-menu-demo" mode="horizontal">
            <el-menu-item index="/"><span class="nav-font">首页</span></el-menu-item>
            <el-menu-item index="/request/hotRecommend"><span class="nav-font">热点推荐</span></el-menu-item>
            <el-menu-item index="/request/allRecipe"><span class="nav-font">菜谱大全</span><span class="el-icon-arrow-down"></span></el-menu-item>
            <el-menu-item index="/request/healthFood"><span class="nav-font">健康膳食</span><span class="el-icon-arrow-down"></span></el-menu-item>
            <el-menu-item index="/request/foodMenu"><span class="nav-font">美食菜单</span></el-menu-item>
            <el-menu-item index="/request/gourmetMaster"><span class="nav-font">美食达人</span></el-menu-item>
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
      activeIndex: '/',
    };
  },
  mounted() {
    // this.getUserAuthority();
  },
  methods: {
    Logout() {
      this.$router.push({ path: "/"});
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .container-fluid{
    background-color: #C12D24;
    .row{
      margin: 0;
      .header{
        width: 60%;
        margin: 0 auto;
        // overflow:auto;

        .header-logo{
          float: left;

          .logo{
            display: block;
            text-align: center;

            img{
              width: 50%;
            }
          }
        }

        .header-login{
          float: right;
          padding: $size40 $size60 0;
          
          a{
            color: #fff;
            padding: $size10;
            &:hover{
              background-color: rgba($color: #000000, $alpha: 0.3);
              border-radius: $width20;
            }
          }
          &:after{
            content: '';
            display: block;
            clear: both;
          }
        }
      }

      .el-menu-demo{
        width: 60%;
        margin: 0 auto;
        border: 0;

        .nav-font{
          font-size: $size18;
          font-family: $font_family;
          font-weight: bold;
        }

        .el-menu-item{
          padding: 0 $size40;
        }
        .el-menu-item:hover{
          color: rgb(6, 136, 175);
        }
      }
    }
  }
  
</style>
