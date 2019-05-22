<template>
  <el-row class="container">
    <el-row class="header">
      <div class="search">
        <el-select v-model="searchInfo" filterable placeholder="请选择" style="width: 300px;">
          <el-option v-for="item in materialKinds" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" circle style="margin-left: 10px;" @click="search()"></el-button>
        <el-button icon="el-icon-delete" circle style="margin-left:10px;" @click="cancel()" type="danger" ></el-button>
      </div>
      <el-button type="primary" class="add" @click="addMaterialKind()">+Add</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="materialKinds" stripe style="width: 97%;">
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
        <el-table-column prop="description" label="Description" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copyMaterialKind(scope.row)" type="warning" plain>Update</el-button>
            <!-- <el-button size="small" @click="deleteMaterialKind(scope.row)" type="danger" plain>Delete</el-button> -->
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
      materialKinds: [],
      temp: [],
      searchInfo: '',
      dialogFormVisible: false,
      checkSubmit: true,
      form: {
        name: '',
        description: '',
      },
      materialKind_id: '',
    };
  },
  mounted(){
    this.getMaterialKinds();
  },
  methods: {
    search(){
      this.temp = this.materialKinds;
      this.materialKinds = _.filter(this.materialKinds, { name: this.searchInfo });
    },
    cancel(){
      this.materialKinds = this.temp;
      this.searchInfo = '';
    },
    // 提交点击事件
    submit(){
      this.dialogFormVisible = false;
      if(this.checkSubmit){
        this.createMaterialKind();
      }else{
        this.updateMaterialKind();
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
    addMaterialKind() {
      this.title = 'Add MaterialKind'
      this.dialogFormVisible = true;
      this.checkSubmit = true;
      this.resetDialog();
    },
    // 创建材料分类
    createMaterialKind(){
      let data = {
        name: this.form.name,
        description: this.form.description,
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.materialKinds,item=>{
          if(item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: '/api/materialKind/saveMaterialKind',
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '添加成功', type: 'success' });
              this.getMaterialKinds();
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
    // 复写材料分类信息
    copyMaterialKind(row) {
      this.title = 'Update MaterialKind'
      this.dialogFormVisible = true;
      this.checkSubmit = false;
      this.materialKind_id = row.id;
      this.form.name = row.name;
      this.form.description = row.description;
    },
    // 更新材料分类
    updateMaterialKind() {
      let data = {
        name: this.form.name,
        description: this.form.description,
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.materialKinds,item=>{
          if(item.id != this.materialKind_id && item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: `/api/materialKind/updateMaterialKind/${this.materialKind_id}`,
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '修改成功', type: 'success' });
              this.materialKind_id = '';
              this.getMaterialKinds();
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
    // // 删除材料分类
    // deleteMaterialKind(row){
    //   this.$axios({
    //     url: `/api/materialKind/deleteMaterialKind/${row.id}`,
    //     method: 'post'
    //   }).then( res => {
    //     if(res.data.code == 200){
    //       this.$message({ message: '删除成功', type: 'success' });
    //       this.getMaterialKinds();
    //     }
    //   });
    // },
    // 获取材料分类
    getMaterialKinds(){
      this.$axios({
        url: '/api/materialKind/getAllMaterialKinds',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.materialKinds = res.data.data.materialKinds;
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
      overflow: hidden;
      .search{
        float: left;
      }
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



