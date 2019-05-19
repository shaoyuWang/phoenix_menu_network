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
        // headers: { "Content-Type":"application/json;charset=utf-8" },
        data: data,
      }).then(res =>{
        console.log(res);
        if(res.status == 200){
          let authority = false;
          _.forEach(res.data.roles,item=>{
            if(item.id == 1){
              authority = true;
            }
          });
          // console.log(res);
          sessionStorage.setItem("user",JSON.stringify(res.data));
          console.log(JSON.parse(sessionStorage.getItem('user')));
          
          if(authority){
            this.$router.push({ path: "/admin"});
          }else{
            this.$router.push({ path: "/request/index"});
          }
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  @import '../../styles/style.scss';
  .wrapper {
    width: $size400;
    border:1px solid $color_black;
    border-radius: $size10;
    margin: $width15 auto;
    padding: $size10 $size20 $size30;
    .title {
      width: $width100;
      font-size: $size12;
      font-family: $size12;
      text-align: $position_center;
      height: $size80;
      line-height: $size80;
    }
    .main {
      /deep/ .username{
        padding: $size10 0px;
      }
      /deep/ .password{
        padding: $size10 0px;
      }
      .login {
      width: $width100;
      margin-top: $size10;
    }
    }
  }
</style>
