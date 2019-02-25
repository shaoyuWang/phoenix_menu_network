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
        <el-menu-item index="#" class="logo">
          <!-- <img src="../../assets/logo.jpg" class="logo_img"/> -->
          Project Performance Review
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">Project Review</template>
          <el-menu-item index="/menu/index">Index</el-menu-item>
        </el-submenu>
        <el-submenu index="2" v-show="RoleTag">
          <template slot="title">Configuration</template>
        </el-submenu>
        <el-submenu index="#" class="client">
          <!-- <template slot="title"><img src="../../assets/client.jpg" class="client_img"></template> -->
          <el-menu-item index="/" @click="Logout()">Logout</el-menu-item>
          </el-submenu>
      </el-menu>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      currentRole: [],
      RoleTag: true,
    };
  },
  mounted() {
    // this.getUserAuthority();
  },
  methods: {
    Logout() {
      this.$router.push({ path: "/"});
      // this.$axios({
      //   url: '/auth/logout',
      //   method: 'post',
      // }).then(res =>{
      //   this.$router.push({ path: "/"});
      // })
    },
    // 用户权限判定
    // getUserAuthority() {
      // this.$axios({
      //   url: '/api/v1/users/userAuthority',
      //   method: 'get'
      // }).then(res =>{
      //   for(var i = 0; i<res.data.roles.length; i++){
      //     this.currentRole[i] = res.data.roles[i].name;
      //   }
      //   if(this.currentRole == 'user'){
      //     this.RoleTag = false;
      //   }
      // })
    // }
  },
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  @import "../../styles/variables.scss";
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
        width: 60%;
      }
    }
  }
  
</style>
