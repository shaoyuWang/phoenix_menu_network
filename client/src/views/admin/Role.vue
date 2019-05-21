<template>
  <el-row class="container">
    <el-row class="header">
      <el-button type="primary" class="add" @click="addRole()">+Add</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="roles" stripe style="width: 97%;">
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
        <el-table-column prop="description" label="Description" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copyRole(scope.row)" type="warning" plain>Update</el-button>
            <el-button size="small" @click="deleteRole(scope.row)" type="danger" plain>Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="Name" label-width="120px">
          <el-input type="name" v-model="form.name" placeholder="Please Input Name"></el-input>
        </el-form-item>
        <el-form-item label="Description" label-width="120px">
          <el-input v-model="form.description" type="description" placeholder="Please Input Description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit()">确 定</el-button>
        <el-button type="warning" @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      roles: [],
      dialogFormVisible: false,
      checkSubmit: true,
      form: {
        name: '',
        description: '',
      },
      role_id: '',
    };
  },
  mounted(){
    this.getRoles();
  },
  methods: {
    // 提交点击事件
    submit(){
      this.dialogFormVisible = false;
      if(this.checkSubmit){
        this.createRole();
      }else{
        this.updateRole();
      }
    },
    //取消方法
    close() {
      this.dialogFormVisible = false;
      this.resetDialog();
    },
    // 清空添加框
    resetDialog() {
      this.form.name = '';
      this.form.description = '';
    },
    // 添加方法
    addRole() {
      this.title = 'Add Role'
      this.dialogFormVisible = true;
      this.checkSubmit = true;
      this.resetDialog();
    },
    // 创建角色
    createRole(){
      let data = {
        name: this.form.name,
        description: this.form.description,
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.roles,item=>{
          if(item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: '/api/role/saveRole',
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '添加成功', type: 'success' });
              this.getRoles();
            }
          });
        }else{
          this.dialogFormVisible = true;
          this.$message.error({ message: '名字重复' });
        }
      }else{
        this.dialogFormVisible = true;
        this.$message.error({ message: '请填写完整信息' });
      }
    },
    // 复写角色信息
    copyRole(row) {
      this.title = 'Update Role'
      this.dialogFormVisible = true;
      this.checkSubmit = false;
      this.role_id = row.id;
      this.form.name = row.name;
      this.form.description = row.description;
    },
    // 更新角色
    updateRole() {
      let data = {
        name: this.form.name,
        description: this.form.description,
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.roles,item=>{
          if(item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: `/api/role/updateRole/${this.role_id}`,
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '修改成功', type: 'success' });
              this.getRoles();
            }
          });
        }else{
          this.dialogFormVisible = true;
          this.$message.error({ message: '名字重复' });
        }
      }else{
        this.dialogFormVisible = true;
        this.$message.error({ message: '请填写完整信息' });
      }
    },
    // 删除角色
    deleteRole(row){
      this.$axios({
        url: `/api/role/deleteRole/${row.id}`,
        method: 'post'
      }).then( res => {
        if(res.data.code == 200){
          this.$message({ message: '删除成功', type: 'success' });
          this.getRoles();
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



