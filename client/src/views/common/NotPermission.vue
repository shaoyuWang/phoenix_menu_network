<template>
  <el-container class="container">
    <el-row>
      <h1>sorry you dont have permissions,please login</h1>
      <el-button @click="Login()">login</el-button>
    </el-row>
  </el-container>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    Login() {
      this.$router.push({ path: "/"});
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
