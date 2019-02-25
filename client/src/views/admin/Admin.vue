<template>
  <div>
    <el-row class="container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/admin" class="logo">
          <img src="../../assets/logo.jpg" class="logo_img"/>
          Project Performance Review
        </el-menu-item>
        <el-menu-item index="/admin/user">User</el-menu-item>
      </el-menu>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      activeIndex: '1',
    }
  },
  methods: {
    Logout() {
      this.$router.push({path: '/'});
      // this.$axios({
      //   url: '/auth/logout',
      //   method: 'post',
      // }).then(res =>{
      //   this.$router.push({ path: "/"});
      // })
    }
  }
};
</script>

style <style lang="scss" scoped>
  @import '../../styles/style.scss';
  @import '../../styles/variables.scss';
  .container{
    .logo {
      background-color: $color_white !important;
      color: $color_black !important;
      font-weight: bold;
      .logo_img {
        width: 16%;
        padding-right: $size10;
      }
    }
    .client {
      float: right ;
      text-align: center;
      .client_img {
        width: 80%;
      }
    }
  }
</style>
