<template>
  <div>
    <div class="row">
      <div class="header">
        <div class="header-logo">
          <a href="/request/index" class="logo"><img src="../../assets/logo.png" alt=""></a>
        </div>
        <div class="header-search">
          <el-autocomplete v-model="searchInfo" :fetch-suggestions="querySearch" placeholder="请输入菜谱名" style="width:400px;"></el-autocomplete>
          <el-button type="success" @click="search()" icon="el-icon-search" style="margin-left: 10px;">搜索</el-button>
        </div>
        <div class="header-login">
          <div class="header-operation" v-show="login? false : true">
            <a @click="openDialog()">注册</a>
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
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="登录账号" label-width="120px">
          <el-input v-model="form.username" placeholder="Please Input Username"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" label-width="120px">
          <el-input v-model="form.password" type="password" placeholder="Please Input Passowrd"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.name" placeholder="Please Input Name"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" label-width="120px">
          <el-input v-model="form.email" placeholder="Please Input Email"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" label-width="120px">
          <el-input v-model="form.phone" placeholder="Please Input Telephone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createUser()">确 定</el-button>
        <el-button type="warning" @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      activeIndex: '/',
      recipes:[],
      login: false,
      searchInfo: '',
      user: '',
      form: {
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        photo: '8700811558507499433.jpg',
        role_id: '',
      },
      dialogFormVisible: false,
    };
  },
  created() {
    this.currentPath();
    this.authority();
    this.getRecipes();
  },
  methods: {
    querySearch(queryString, cb) {
        let recipeList = this.recipes;
        let results = queryString ? recipeList.filter(this.createFilter(queryString)) : recipeList;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
    },
    createFilter(queryString) {
      return (recipeList) => {
        return (recipeList.value.indexOf(queryString) !== -1);
      };
    },
    handleImg(photo){
      if(!_.isEmpty(photo)){
        return require(`../../assets/imgs/${photo}`);
      }
    },
    authority(){
      this.user = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user'));
      !_.isEmpty(this.user) ? this.login = true : this.login = false;
      if(!_.isEmpty(this.user) && this.user.roles[0].id != 2){
        this.$message.error({ message: '您没有访问权限' });
        setTimeout(() => {
          this.$router.push({ path: '/login'});
        }, 2000);
      }
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
        this.$message({ message: '注销成功', type: 'success'});
        sessionStorage.clear();
        this.authority();
        this.$router.push({ path: "/"});
      })
    },
    // 获取当前页面路径
    currentPath(){
      this.activeIndex = this.$router.history.current.fullPath;
    },
    //取消方法
    close() {
      this.dialogFormVisible = false;
      this.resetDialog();
    },
    // 清空添加框
    resetDialog() {
      this.form.username = '',
      this.form.password = '',
      this.form.name = '';
      this.form.email = '';
      this.form.phone = '';
    },
    search(){
      this.$axios({
        url: `/main/index/searchRecipe/${this.searchInfo}`,
        method: 'get',
      }).then(res =>{
        console.log(res.data);
        this.$router.push({ path: "/request/allTemplate", query:{recipes: res.data.data.recipes, status: 99}});
      })
    },
    openDialog(){
      this.title = 'Add User'
      this.dialogFormVisible = true;
      this.getRoles();
    },
    // 创建用户
    createUser(){
      // 邮箱格式正则
      let emailValidation = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      let roles = [];
      _.forEach(this.roles, item=>{
        if(item.id == 2) roles.push(item);
      })
      let data ={
        username: this.form.username,
        password: this.form.password,
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        roles,
        photo: this.form.photo,
      };
      if(_.isEmpty(data.username) || _.isEmpty(data.password) || _.isEmpty(data.name) ||
         _.isEmpty(data.email) || _.isEmpty(data.phone) || _.isEmpty(data.roles)){ 
        this.$message({ message: '请输入全部信息', type: 'warning' }); 
        this.dialogFormVisible = true; 
        return false;
      };
      // 验证邮箱格式
      if(!emailValidation.test(data.email)){ 
        this.$message({ message: '邮箱格式错误', type: 'warning' }); 
        this.dialogFormVisible = true; 
        return false;
      }
      this.$axios({
        url: '/api/user/saveUser',
        method: 'post',
        data,
      }).then(res=>{
        if(res.data.code == 200){
          this.$message({ message: '创建用户成功，3秒后跳转到登录页面', type: 'success'});
          setTimeout(() => {
            this.$router.push({path: '/login'});
          }, 3000);
        }
      });
    },
    // 获取角色
    getRoles(){
      this.$axios({
        url: '/api/role/getAllRoles',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.roles = res.data.data.roles;
        }
      })
    },
    // 获取菜谱
    getRecipes(){
      this.$axios({
        url: '/api/recipe/getAllRecipes',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          _.forEach(res.data.data.recipes, item=>{
            item.value = item.name;
          })
          this.recipes = res.data.data.recipes;
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  .row{
    background-color: $color_navbar;
    .header{
      width: $width_screen;
      height: 100px;
      margin: $size0 auto;
      .header-logo{
        float: left;
        width: 200px;
        margin-top: 10px;
        .logo{
          display: block;
          text-align: $position_center;
          img{
            width: $width100;
          }
        }
      }
      .header-search{
        width: 650px;
        float: left;
        text-align: center;
        line-height: 100px;
      }
      .header-login{
        float: right;
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
          .user-photo{
            width: 40px;
            height: 40px;
            display: inline-block;
          }
          .username{
            margin-top: 5px;
            display: block;
            width: 100%;
            color: black;
            white-space:nowrap; 
            overflow:hidden; 
            text-overflow:ellipsis;
            &:hover{
              color: black;
              text-align: left;
              width: 200px
            }
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
