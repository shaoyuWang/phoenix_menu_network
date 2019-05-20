<template>
  <div>
    <div class="row">
      <div class="header">
        <div class="header-logo">
          <a href="/request/index" class="logo"><img src="../../assets/logo.png" alt=""></a>
        </div>
        <div class="header-login">
          <div class="header-operation" v-show="login? false : true">
            <a href="/login">注册</a>
            <a href="/login">登录</a>
          </div>
          <el-dropdown trigger='hover' v-show="login? true : false" :show-timeout="100" :hide-timeout="200" placement="bottom-start" @command="checkStatus">
            <div class="user-info">
              <a>
                <img class="user-photo" :src="_.isEmpty(user)? null : handleImg(user.photo)"/>
                <span class="username">{{_.isEmpty(user)? null : user.name}}</span>
              </a>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="1">个人中心</el-dropdown-item>
              <el-dropdown-item :command="2">我的菜谱</el-dropdown-item>
              <el-dropdown-item :command="3">我的收藏</el-dropdown-item>
              <el-dropdown-item :command="4">我的菜单</el-dropdown-item>
              <el-dropdown-item :command="5">我的日记</el-dropdown-item>
              <el-dropdown-item :command="6">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12" style="background-color:#fff;">
        <el-menu :default-active="activeIndex" active-text-color='#409EFF' router class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/request/index" @click="currentPath()">
            <span class="nav-font">首&nbsp;&nbsp;页</span>
          </el-menu-item>
          <el-menu-item index="/request/recipeCooking" @click="currentPath()">
            <span class="nav-font">菜谱菜系</span>
          </el-menu-item>
          <el-menu-item index="/request/foodHealth" @click="currentPath()">
            <span class="nav-font">饮食健康</span>
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
          <el-menu-item index="/request/recipeVideo" @click="currentPath()">
            <span class="nav-font">美食视频</span>
          </el-menu-item>
        </el-menu>
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
      login: false,
      user: ''
    };
  },
  created() {
    this.currentPath();
    this.authority();
  },
  methods: {
    handleImg(photo){
      if(!_.isEmpty(photo)){
        return require(`../../assets/imgs/${photo}`);
      }
    },
    authority(){
      this.user = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user'));
      !_.isEmpty(this.user) ? this.login = true : this.login = false;
    },
    checkStatus(status){
      if(status != 6){
        this.$router.push({ path: '/userCenter', query: { status }});
      }else{
        this.logout();
      }
    },
    logout() {
      this.$axios({
        url: '/auth/logout',
        method: 'post',
      }).then(res =>{
        this.$message({
          message: '注销成功',
          type: 'success'
        });
        sessionStorage.clear();
        this.authority();
        this.$router.push({ path: "/"});
      })
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
  .row{
    background-color: $color_navbar;
    .header{
      width: $width_screen;
      margin: $size0 auto;
      overflow: hidden;
      .header-logo{
        float: $position_left;
        width: 200px;
        .logo{
          display: block;
          padding: 10px 0;
          text-align: $position_center;
          img{
            width: $width100;
          }
        }
      }
      .header-login{
        float: $position_right;
        &::after{ content: ''; display: block; clear: both; }
        .header-operation{
          padding: 25px 0;
          a{
            display: inline-block;
            color: $color_white;
            padding: $size10;
            &:hover{
              background-color: $color_background_hover;
              border-radius: $width20;
              text-decoration: none;
            }
          }
        }
        .user-info{
            padding-top: 20px;
            width: 100px;
            text-align: center;
            overflow: hidden;
          .user-photo{
            width: 40px;
            display: inline-block;
          }
          .username{
            margin-top: 5px;
            display: block;
            width: 100%;
            color: black;
            &:hover{color: black;}
          }
        }
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
        letter-spacing: $size2;
        span{
          font-size: $size2;
          margin-right: $size0;
          padding-left: $size5;
        }
      }
      .el-menu-item{
        padding: $size0 $size30;
        &:hover{ color: #f40;}
      }
    }
  }
  
</style>
