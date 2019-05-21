<template>
  <el-col :span="24" class="row">
    <el-col :span="24" class="header">
      <el-button type="primary" class="add" @click="addUser()">+Add</el-button>
    </el-col>
    <el-col :span="24" class="main">
      <el-table :data="users" stripe style="width: 97%;">
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
        <el-table-column prop="email" label="Email" class-name="table_column"></el-table-column>
        <el-table-column prop="phone" label="TelePhone" class-name="table_column"></el-table-column>
        <el-table-column prop="collectionNumber" label="Collection Number" class-name="table_column"></el-table-column>
        <el-table-column prop="menuNumber" label="Menu Number" class-name="table_column"></el-table-column>
        <el-table-column prop="roles" label="Role" class-name="table_column" :formatter='formatter'></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copyUser(scope.row)" type="warning" plain>Update</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="Name" label-width="120px">
          <el-input type="name" v-model="form.name" placeholder="Please Input Passowrd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" label-width="120px">
          <el-input v-model="form.email" type="email" placeholder="Please Input Email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" label-width="120px">
          <el-input v-model="form.photo" type="email" placeholder="Please Input Email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Photo" label-width="120px">
          <el-upload
            class="upload-demo"
            action="/upload/img"
            :limit="1"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
      </el-form-item>
        <el-form-item label="Role" label-width="120px">
          <el-radio-group v-model="form.role_id">
            <el-radio-button v-for="item in roles" :label="item.id" :key="item.id" border>{{item.name}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :visible.sync="checkSubmit"  type="primary" @click="Submit()">确 定</el-button>
        <el-button type="warning" @click="Close()">取 消</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>
<script>
export default {
  data() {
    return {
      uploadUrl:'upload/img',
      title: '',
      users: [],
      roles: [],
      data: [],
      dialogFormVisible: false,
      checkSubmit: true,
      roleChecked : [],
      checkedRoleId: [],
      form: {
        name: '',
        email: '',
        phone: '',
        photo: '',
        role_id: '',
      },
      user_id: '',
    };
  },
  mounted(){
    this.getUsers();
    this.getRoles();
  },
  methods: {
    // 拼接多个roles
    formatter(row,column){
      let allRole = ''
      if(row.roles != []){
        for(var i = 0;i < row.roles.length;i++){
          allRole += row.roles[i].name + ',';
        }
        allRole = allRole.substring(0,allRole.lastIndexOf(','));
      }
      return allRole;
    },
    // 图片上传方法
    //文件上传成功的钩子函数
    handleSuccess(res, file) {
      this.$message({ type: "success", message: "图片上传成功" });
      const pathList = _.split(res.writeImage.path, "/");
      this.form.photo = pathList[ pathList.length - 1 ];
    },
    //上传的文件个数超出设定时触发的函数
    onExceed(files, fileList) {
      this.$message.error({ message: "最多只能上传一个图片" });
    },
    //文件上传前的前的钩子函数
    //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片必须是JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG) && isLt2M;
    },
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
      this.$axios({
        url: '/api/user/getAllUsers',
        method: 'get',
      }).then(res=> {
        if(res.data.code == 200){
          this.users = res.data.data.users;
        }
      })
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
  }
};
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
  @import "../../styles/variables.scss";
  .row {
    overflow: hidden;
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



