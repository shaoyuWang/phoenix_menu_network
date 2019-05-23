<template>
  <el-container class="container">
    <el-row>
      <h1>sorry you dont have permissions,please login</h1>
      <el-button @click="login()">login</el-button>
    </el-row>
  </el-container>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  mounted(){
    sessionStorage.clear();
    this.$message({ message: '您没有访问权限，请重新登录', type: 'warning'});
  },
  methods: {
    login() {
      this.$router.push({ path: "/login"});
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/style.scss';
  .container {
    text-align: $position_center;
  }
</style>
