<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <a href="/admin/user"><img src="../../assets/logo.png"></a>
      <el-dropdown class="header-login" trigger='hover' :show-timeout="100" :hide-timeout="200" placement="bottom-start" @command="checkStatus">
        <span class="username">{{_.isEmpty(user)? null : user.name}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="1">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col :span="5" class="nav">
      <el-menu :default-active="activeIndex" router class="navbar">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="user" >用户管理</el-menu-item>
            <el-menu-item index="role" >角色管理</el-menu-item>
            <el-menu-item index="diary" >日记管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>菜品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="recipe">菜谱管理</el-menu-item>
            <el-menu-item index="technology">工艺管理</el-menu-item>
            <el-menu-item index="effect">功效管理</el-menu-item>
            <el-menu-item index="taste">口味管理</el-menu-item>
            <el-menu-item index="sort">种类管理</el-menu-item>
            <el-menu-item index="material">材料管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>分类管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="sortKind">菜系分类管理</el-menu-item>
            <el-menu-item index="materialKind">材料分类管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>评论管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="recipeComment" >菜谱评论管理</el-menu-item>
            <el-menu-item index="diaryComment" >日记评论管理</el-menu-item>
            <el-menu-item index="userMenuComment" disabled>菜单评论管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="19">
      <router-view></router-view>
    </el-col>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '../main/Footer';
export default {
  components: {Footer},
  data(){
    return {
      activeIndex: '',
      collapse: false,
      user: {},
    }
  },
  mounted(){
    this.currentPath();
    this.authority();
    $('.el-menu-item').on('click',this.currentPath());
  },
  methods: {
    authority(){
      this.user = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user'));
      if(!_.isEmpty(this.user)){
        _.forEach(this.user.roles, item => {
          if(_.includes(item,{ id: 1 })){
            console.log('ok');
            // this.$router.push({ path: '/login' });
          }
        })
      }
    },
    checkStatus(status){
      if(status == 1){
        this.logout();
      }
    },
    logout() {
      this.$axios({
        url: '/auth/logout',
        method: 'post',
      }).then(res =>{
        this.$message({ message: '注销成功', type: 'success' });
        sessionStorage.clear();
        this.$router.push({ path: "/"});
      })
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
  .container{
    font-size: 14px;
    .header{
      background-color: $color_navbar;
      overflow: hidden;
      height: 50px;
      a{
        width: $size100;
        float: left;
        display: block;
        padding: $size5 $size10;
        img{
            width: $size100;
        }
      }
      .header-login{
        float: $position_right;
        padding: 0 40px;
        line-height: 50px;
        .username{
          display: block;
          color: black;
          &:hover{color: black;}
        }
      }
    }
    .nav{
      .navbar{
        height: 800px;
      }
    }
  }
</style>
