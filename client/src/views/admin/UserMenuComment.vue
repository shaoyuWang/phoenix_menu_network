<template>
  <el-row class="container">
    <el-row class="header">
      <el-button type="primary" class="add" @click="addComment()" disabled="">+Add</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="commentList" stripe style="width: 97%;">
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="comment" label="Comment" class-name="table_column"></el-table-column>
        <el-table-column prop="date" label="Date" class-name="table_column"></el-table-column>
        <el-table-column prop="user.name" label="Username" class-name="table_column"></el-table-column>
        <el-table-column prop="recipe.name" label="Recipe Name" class-name="table_column"></el-table-column>
        <el-table-column prop="praise" label="Praise Number" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="deleteComment(scope.$index,scope.row)" type="danger" plain>Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="Title" label-width="120px">
          <el-input v-model="form.title" type="title" placeholder="Please Input Title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Information" label-width="120px">
          <el-input v-model="form.info" type="textarea" placeholder="Please Input Information" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :visible.sync="checkSubmit"  type="primary" @click="Submit()">确 定</el-button>
        <el-button type="warning" @click="Close()">取 消</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      commentList: [
        {
          id: 1,
          comment: '这是一条评论',
          praise: 1,
          date: '2018-12-12',
          user: { id: 1, name: 'admin'},
          recipe: {id: 1, name: '红烧排骨'}
        },
        {
          id: 2,
          comment: '这是一条评论',
          praise: 3,
          date: '2018-12-13',
          user: { id: 1, name: 'admin'},
          recipe: {id: 1, name: '红烧排骨'}
        },
      ],
      dialogFormVisible: false,
      checkSubmit: true,
      roleChecked : [],
      checkedRoleId: [],
      form: {
        name: '',
        description: '',
      },
      role_id: '',
    };
  },
  mounted(){
    // this.getUsers();
    // this.getRoles();
  },
  methods: {
    // 提交点击事件
    Submit(){
      this.dialogFormVisible = false;
      // if(this.checkSubmit){
      //   this.createUser();
      // }else{
      //   this.updateUser();
      // }
    },
    //取消方法
    Close() {
      this.dialogFormVisible = false;
      // this.resetDialog();
    },
    // 清空添加框
    resetDialog() {
      // this.form.username = '';
      // this.form.password = '';
      // this.form.englishName = '';
      // this.form.chinesehName = '';
      // this.form.email = '';
      // this.form.role_id = [];
      // this.form.comment = '';
    },
    // 添加方法
    addUser() {
      // this.title = 'Add User'
      this.dialogFormVisible = true;
      // this.resetDialog();
    },
    // 创建用户
    createUser(){
      // // 邮箱格式正则
      // let emailValidation = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      // let roles_id = [];
      // for(var i = 0; i< this.form.role_id.length; i++){
      //   roles_id.push({id: this.form.role_id[i]});
      // }
      // let data ={
      //   username: this.form.username,
      //   password: this.form.password,
      //   englishName: this.form.englishName,
      //   chinesehName: this.form.chinesehName,
      //   email: this.form.email,
      //   roles: roles_id,
      //   comment: this.form.comment,
      // };
      // this.$axios({
      //   url: '/api/v1/users/' + data.username,
      //   method: 'get',
      // }).then(res =>{
      //   if(res.data.code == 200){
      //     let findName = res.data.data;
      //     // 判断关键值是否为空
      //     if(data.username && data.password && data.email != ''){
      //       // 判断是否有重复用户名
      //       if(findName != 200){
      //         // 验证邮箱格式
      //         if(emailValidation.test(data.email)){
      //           this.$axios({
      //             url: '/api/v1/users',
      //             method: 'post',
      //             data: data,
      //           }).then(res=>{
      //             if(res.data.code == 200){
      //               this.getUsers();
      //             }else{
      //               this.$router.push({ path: "/nopermisson"});
      //             }
      //           });
      //         }else{
      //           this.dialogFormVisible = true;
      //           alert('Please Input Correct Email Format')
      //         }
      //       }else{
      //         this.dialogFormVisible = true;
      //         alert('Repeat Username, Please Input Again');
      //       }
      //     }else{
      //       this.dialogFormVisible = true;
      //       alert('please Input All Data');
      //     }
      //   }else{
      //     this.$router.push({ path: "/nopermisson"});
      //   }
      // });
    },
    // 复写用户信息
    copyUser(index,data) {
      // this.title = 'Update User'
      this.dialogFormVisible = true;
      // this.checkSubmit = false;
      // this.user_id = data.id;
      // this.form.englishName = data.englishName;
      // this.form.chinesehName = data.chinesehName;
      // this.form.email = data.email;
      // this.roleChecked = data.roles;
      // this.form.comment = data.comment;
      // // 选择角色
      // var role_id = []
      // for(var i = 0;i<data.roles.length;i++){
      //   role_id.push(data.roles[i].id)
      // }
      // this.form.role_id=role_id;
    },
    // 更新用户
    updateUser() {
      // // 邮箱格式正则
      // let emailValidation = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      // let roles_id = [];
      // for(var i = 0; i< this.form.role_id.length; i++){
      //   roles_id.push({id: this.form.role_id[i]});
      // }
      // let data = {
      //   password: this.form.password,
      //   englishName: this.form.englishName,
      //   chinesehName: this.form.chinesehName,
      //   email: this.form.email,
      //   roles: roles_id,
      //   comment: this.form.comment,
      // };
      // if(data.email != ''){
      //   // 验证邮箱格式
      //   if(emailValidation.test(data.email)){
      //     this.$axios({
      //       url: '/api/v1/users/' + this.user_id,
      //       method: 'put',
      //       data: data,
      //     }).then(res=>{
      //       if(res.data.code == 200){
      //         this.getUsers();
      //       }else{
      //         this.$router.push({ path: "/nopermisson"});
      //       }
      //     });
      //   }else{
      //     this.dialogFormVisible = true;
      //     alert('Please Input Correct Email Format');
      //   }
      // }else{
      //   this.dialogFormVisible = true;
      //   alert('please Input All Data');
      // }
    },
    // 获取用户
    getUsers() {
      // this.$axios({
      //   url: '/api/v1/users',
      //   method: 'get',
      // }).then(res=> {
      //   if(res.data.code == 200){
      //     this.users = res.data.data;
      //   }else{
      //     this.$router.push({ path: "/nopermisson"});
      //   }
      // })
    },
    // 获取角色
    getRoles(){
      // this.$axios({
      //   url: '/api/v1/roles',
      //   method: 'get',
      // }).then(res =>{
      //   if(res.data.code == 200){
      //     this.roles = res.data.data;
      //   }else{
      //     this.$router.push({ path: "/nopermisson"});
      //   }
      // })
    },
  }
};
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  @import "../../styles/variables.scss";
  .container {
    position: absolute;
    right: 0;
    overflow: scroll;
    width: 80%;
    .header {
      text-align: right;
      margin: $size20;
      border-radius: 15px;
      padding: $size20;
      padding-right: $size60;
      background-color: rgba(153, 153, 153, 0.4);
    }
    .el-table{
      margin: $size20;
      border-radius: 15px;
      /deep/ .table_column{
        text-align: $position_center;
      }
      .input100{
        width: 100%;
      }
    }
  }
</style>



