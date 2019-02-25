<template>
  <el-container class="container">
    <el-header class="header">
      <el-button type="primary" class="add" @click="addRole()">+Add</el-button>
    </el-header>
    <el-row>
      <el-table :data="roles" stripe style="width: 100% ;">
        <el-table-column prop="id" label="ID" class-name="table_column"></el-table-column>
        <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
        <el-table-column prop="comment" label="Comment" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copyRole(scope.$index,scope.row)" type="primary" plain>Update</el-button>
            <el-button size="small" @click="deleteRole(scope.$index,scope.row)" type="danger" plain>Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
      <el-form :model="form" ref="form">
        <el-form-item label="RoleName">
          <el-input v-model="form.name" placeholder="Please Input RoleName"></el-input>
        </el-form-item>
        <el-form-item label="Comment">
          <el-input type="textarea" v-model="form.comment" placeholder="Please Input Comment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :visible.sync="checkSubmit" type="primary" @click="Submit()">确 定</el-button>
        <el-button type="warning" @click="Close()">取 消</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      roles: [],
      dialogFormVisible: false,
      checkSubmit: true,
      roleId: '',
      form: {
        name: '',
        comment: '',
      },
      testName: '',
      currentRole: [],
      RolePermission: false,
    };
  },
  mounted(){
    this.getRoles();
    // this.getUserAuthority();
  },
  methods: {
    // 提交判断
    Submit() {
      this.dialogFormVisible = false;
      if(this.checkSubmit){
        this.createRole();
      }else{
        this.updateRole();
      }
    },
    // 取消方法
    Close() {
      this.dialogFormVisible = false;
      this.resetDialog();
    },
    // 清空模态框
    resetDialog(){
      this.form.name = '';
      this.form.comment = '';
    },
    // 添加用户
    addRole() {
      this.title = 'Add Role';
      this.dialogFormVisible = true;
      this.resetDialog();
    },
    // 创建用户方法
    createRole() {
      let data = {
        name: this.form.name,
        comment: this.form.comment,
      };
      // 验证name是否重复
      this.$axios({
        url: '/api/v1/roles/' + data.name,
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          let findName = res.data.data;
          // 判断name是否为空
          if(data.name != ''){
            if(findName != 200){
              this.$axios({
                url: '/api/v1/roles',
                method: 'post',
                data: data,
              }).then(res =>{
                if(res.data.code ==200){
                  this.getRoles();
                }else{
                  this.$router.push({ path: "/nopermisson"});
                }
              })
            }else{
              this.dialogFormVisible = true;
              alert('Repeat Name, Please Input Again');
            }
          }else{
            this.dialogFormVisible = true;
            alert('Please Input Name');
          }
        }else{
          this.$router.push({ path: "/nopermisson"});
        }
      });
      
    },
    // 更新用户对话框
    copyRole(index,data) {
      this.title = 'Update Role'
      this.dialogFormVisible = true;
      this.checkSubmit = false;
      this.roleId = data.id;
      this.form.name = data.name;
      this.form.comment = data.comment;
      this.testName = data.name;
    },
    // 更新角色
    updateRole(){
      let data = {
        name: this.form.name,
        comment: this.form.comment,
      };
      // 验证name是否重复
      this.$axios({
        url: '/api/v1/roles/' + data.name,
        method: 'get',
      }).then(res =>{
        console.log(res.data);
        let findName = res.data.data;
        if(data.name != ''){
          if(!findName || this.testName == data.name){
            this.$axios({
              url: '/api/v1/roles/' + this.roleId,
              method: 'put',
              data: data,
            }).then(res =>{
              if(res.data.code == 200){
                this.getRoles();
              }else{
                this.$router.push({ path: "/nopermisson"});
              }
            });
          }else{
            this.dialogFormVisible = true;
            alert('Repeat Name,Please Input Again');
          }
        }else{
          this.dialogFormVisible = true;
          alert('Please Input Name');
        }
      });
    },
    // 删除角色
    deleteRole(index,data) {
      this.$axios({
        url: '/api/v1/roles/' + data.id,
        method: 'delete',
      }).then(res =>{
        if(res.data.code == 200){
          this.getRoles();
        }else{
          this.$router.push({ path: "/nopermisson"});
        }
      })
    },
    // 获取所有角色
    getRoles() {
      this.$axios({
        url: '/api/v1/roles',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.roles = res.data.data;
        }else{
          this.$router.push({ path: "/nopermisson"});
        }
      });
    },
    // 获取当前用户角色
    // getUserAuthority() {
    //   this.$axios({
    //     url: '/api/v1/users/userAuthority',
    //     method: 'get'
    //   }).then(res =>{
    //     // 判断当前角色权限
    //     this.RolePermission = false;
    //     for(var i = 0; i<res.data.roles.length; i++){
    //       this.currentRole[i] = res.data.roles[i].name;
    //     }
    //     console.log(this.currentRole);
    //     for(var i = 0; i<this.currentRole.length;i ++){
    //       if(this.currentRole[i] == 'admin'){
    //         this.RolePermission = true;
    //       }
    //     }
    //     // 获取所有角色
    //     if(this.RolePermission){
    //       this.$axios({
    //         url: '/api/v1/roles',
    //         method: 'get',
    //       }).then(res =>{
    //         if(res.data.code == 200){
    //           this.roles = res.data.data;
    //         }else{
    //           this.$router.push({ path: "/nopermisson"});
    //         }
    //       });
    //     }else{
    //       this.$router.push({ path: "/nopermisson"});
    //     }
    //   })
    // }
  }
};
</script>
<style lang="scss" scoped>
  @import "../../styles/style.scss";
  @import "../../styles/variables.scss";
.container {
  .header {
    text-align: right;
    padding-top: $size10;
  }
  /deep/ .table_column{
    text-align: $position_center;
  }
  .input100{
    width: 100%;
  }
}
</style>



