<template>
  <div class="container">
    <el-row class="nav">
      <el-menu :default-active="activeIndex" router class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="user" >用户管理<i class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="role" >角色管理<i class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="diary" >日记管理<i class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="userMenuComment" >菜单评论管理<i class="el-icon-arrow-right"></i></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>菜品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="recipe">菜谱管理<i class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="technology">菜谱工艺管理<i class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="effect">菜谱功效管理<i class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="taste">菜谱口味管理<i class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="sortKind">菜系种类管理<i class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="materailMenu">材料分类管理<i class="el-icon-arrow-right"></i></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>菜单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="recipe">菜单管理<i class="el-icon-arrow-right"></i></el-menu-item>
            <el-menu-item index="menu">菜单评论管理<i class="el-icon-arrow-right"></i></el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
      </el-menu>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      activeIndex: '',
      collapse: false,
    }
  },
  mounted(){
    this.currentPath();
    $('.el-menu-item').on('click',this.currentPath());
  },
  methods: {
    Logout() {
    this.$router.push({path: '/'});
    },
    // 获取当前页面路径
    currentPath(){
      this.activeIndex = this.$router.history.current.fullPath.substring(7);
    },
  }
};
</script>

<style lang="scss" scoped>
  @import '../../styles/style.scss';

  .nav{
    position: fixed;
    left: 0;
    display: block;
    width: 20%;
    .el-menu-item{
      width: 100%;
      .el-icon-arrow-right{
        float: right;
        line-height: 50px;
      }
    }
  }
</style>
