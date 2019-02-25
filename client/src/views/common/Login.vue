<template>
  <div class="wrapper">
    <div class="title">
      <h1>{{title}}</h1>
    </div>
    <div class="main">
      <el-input class="username" placeholder="Username ：" v-model="username" clearable />
      <el-input class="password" type="password" placeholder="Password ：" v-model="password" clearable />
      <el-button type="primary" class="login" @click="Login()">Login</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Login',
  data(){
    return {
      title : 'Project Performance Review',
      username : '',
      password : '',
    }
  },
  methods:{
    Login() {
      let data = {
        username: this.username,
        password: this.password
      };
      this.$axios({
        url: '/auth/login',
        method: 'post',
        data: data,
      }).then(res =>{
        // console.log(res);
        if(res.data.data.roles[0].id == 1){
          this.$router.push({ path: "/admin"});
        }else{
          this.$router.push({ path: "/performance"});
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  @import '../../styles/style.scss';
  .wrapper {
    width: 400px;
    border:1px solid $color_black;
    border-radius: $size10;
    margin: 15% auto;
    padding: 10px 20px 30px;
    .title {
      width: $width;
      font-size: $size12;
      font-family: $size12;
      text-align: $position_center;
      height: 80px;
      line-height: 80px;
    }
    .main {
      /deep/ .username{
        padding: $size10 0px;
      }
      /deep/ .password{
        padding: $size10 0px;
      }
      .login {
      width: $width;
      margin-top: $size10;
    }
    }
  }
</style>
