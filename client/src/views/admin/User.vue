<template>
  <el-col :span="24" class="row">
    <el-col :span="24" class="header">
      <el-button type="primary" class="add" @click="addUser()">+Add</el-button>
    </el-col>
    <el-col :span="24" class="main">
      <el-table :data="users.slice((currentPage-1)*pagesize, currentPage*pagesize)" stripe style="width: 97%;">
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
        <el-table-column prop="email" label="Email" class-name="table_column"></el-table-column>
        <el-table-column prop="phone" label="TelePhone" class-name="table_column"></el-table-column>
        <el-table-column prop="roles" label="Role" class-name="table_column" :formatter='formatter'></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copyUser(scope.row)" type="warning" plain>Update</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" style="text-align: center;margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" 
          :current-page.sync="currentPage" :pager-count="5" :total="users.length">
        </el-pagination>
      </el-col>
    </el-col>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="登录账号" label-width="120px" v-show="checkSubmit">
          <el-input v-model="form.username" placeholder="Please Input Username"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" label-width="120px" v-show="checkSubmit">
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
        <!-- <el-form-item label="头像" label-width="120px">
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
      </el-form-item> -->
        <el-form-item label="Role" label-width="120px">
          <el-radio-group v-model="form.role_id">
            <el-radio-button v-for="item in roles" :label="item.id" :key="item.id" border>{{item.name}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit()">确 定</el-button>
        <el-button type="warning" @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>
<script>
export default {
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      title: '',
      users: [],
      roles: [],
      dialogFormVisible: false,
      checkSubmit: true,
      form: {
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        photo: '8700811558507499433.jpg',
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
    current_change(currentPage){  //改变当前页
      this.currentPage = currentPage
    },
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
    submit(){
      this.dialogFormVisible = false;
      if(this.checkSubmit){
        this.createUser();
      }else{
        this.updateUser();
      }
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
      this.form.role_id = '';
    },
    // 添加方法
    addUser() {
      this.title = 'Add User'
      this.resetDialog();
      this.dialogFormVisible = true;
      this.checkSubmit = true;
    },
    // 创建用户
    createUser(){
      // 邮箱格式正则
      let emailValidation = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      let roles = [];
      _.forEach(this.roles, item=>{
        if(item.id == this.form.role_id) roles.push(item);
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
          this.message({ message: '创建用户成功', type: 'success'});
          this.getUsers();
        }
      });
    },
    // 复写用户信息
    copyUser(row) {
      this.title = 'Update User'
      this.dialogFormVisible = true;
      this.checkSubmit = false;
      this.user_id = row.id;
      this.form.name = row.name;
      this.form.email = row.email;
      this.form.phone = row.phone;
      this.form.role_id = row.roles[0].id;
    },
    // 更新用户
    updateUser() {
      // 邮箱格式正则
      let emailValidation = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      let roles = [];
      _.forEach(this.roles, item=>{
        if(item.id == this.form.role_id) roles.push(item);
      })
      let data ={
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        roles,
        photo: this.form.photo,
      };
      if(_.isEmpty(data.name) || _.isEmpty(data.email) || _.isEmpty(data.phone) || _.isEmpty(data.roles)){ 
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
        url: `/api/user/updateUser/${this.user_id}`,
        method: 'post',
        data,
      }).then(res=>{
        if(res.data.code == 200){
          this.$message({ message: '更新用户成功', type: 'success'});
          this.getUsers();
        }
      });
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
      margin: $size10 $size20 $size0 $size20;
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



