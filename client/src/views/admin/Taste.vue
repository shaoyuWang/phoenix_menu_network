<template>
  <el-row class="container">
    <el-row class="header">
      <div class="search">
        <el-select v-model="searchInfo" filterable placeholder="请选择" style="width: 300px;">
          <el-option v-for="item in tastes" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" circle style="margin-left: 10px;" @click="search()"></el-button>
        <el-button icon="el-icon-delete" circle style="margin-left:10px;" @click="cancel()" type="danger" ></el-button>
      </div>
      <el-button type="primary" class="add" @click="addTaste()">+Add</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="tastes.slice((currentPage-1)*pagesize, currentPage*pagesize)" stripe style="width: 97%;">
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
        <el-table-column prop="description" label="Description" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copyTaste(scope.row)" type="warning" plain>Update</el-button>
            <!-- <el-button size="small" @click="deleteTaste(scope.row)" type="danger" plain>Delete</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" style="text-align: center; margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" 
          :current-page.sync="currentPage" :pager-count="5" :total="tastes.length">
        </el-pagination>
      </el-col>
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
      pagesize: 10,
      currentPage: 1,
      title: '',
      tastes: [],
      temp: [],
      searchInfo: '',
      dialogFormVisible: false,
      checkSubmit: true,
      form: {
        name: '',
        description: '',
      },
      taste_id: '',
    };
  },
  mounted(){
    this.getTastes();
  },
  methods: {
    current_change(currentPage){  //改变当前页
      this.currentPage = currentPage
    },
    search(){
      this.temp = this.tastes;
      this.tastes = _.filter(this.tastes, { name: this.searchInfo });
    },
    cancel(){
      this.tastes = this.temp;
      this.searchInfo = '';
    },
    // 提交点击事件
    submit(){
      this.dialogFormVisible = false;
      if(this.checkSubmit){
        this.createTaste();
      }else{
        this.updateTaste();
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
    addTaste() {
      this.title = 'Add Taste'
      this.dialogFormVisible = true;
      this.checkSubmit = true;
      this.resetDialog();
    },
    // 创建口味
    createTaste(){
      let data = {
        name: this.form.name,
        description: this.form.description,
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.tastes,item=>{
          if(item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: '/api/taste/saveTaste',
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '添加成功', type: 'success' });
              this.getTastes();
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
    // 复写口味信息
    copyTaste(row) {
      this.title = 'Update Taste'
      this.dialogFormVisible = true;
      this.checkSubmit = false;
      this.taste_id = row.id;
      this.form.name = row.name;
      this.form.description = row.description;
    },
    // 更新口味
    updateTaste() {
      let data = {
        name: this.form.name,
        description: this.form.description,
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.tastes,item=>{
          if(item.id != this.taste_id && item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: `/api/taste/updateTaste/${this.taste_id}`,
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '修改成功', type: 'success' });
              this.taste_id = '';
              this.getTastes();
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
    // // 删除口味
    // deleteTaste(row){
    //   this.$axios({
    //     url: `/api/taste/deleteTaste/${row.id}`,
    //     method: 'post'
    //   }).then( res => {
    //     if(res.data.code == 200){
    //       this.$message({ message: '删除成功', type: 'success' });
    //       this.getTastes();
    //     }
    //   });
    // },
    // 获取口味
    getTastes(){
      this.$axios({
        url: '/api/taste/getAllTastes',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.tastes = res.data.data.tastes;
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



