<template>
  <el-row class="container">
    <el-row class="header">
      <div class="search">
        <el-select v-model="searchInfo" filterable placeholder="请选择" style="width: 300px;">
          <el-option v-for="item in sorts" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" circle style="margin-left: 10px;" @click="search()"></el-button>
        <el-button icon="el-icon-delete" circle style="margin-left:10px;" @click="cancel()" type="danger" ></el-button>
      </div>
      <el-button type="primary" class="add" @click="addSort()">+Add</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="sorts" stripe style="width: 97%;">
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="name" label="名字" class-name="table_column"></el-table-column>
        <el-table-column prop="description" label="描述" class-name="table_column"></el-table-column>
        <el-table-column prop="kind.name" label="分类" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copySort(scope.row)" type="warning" plain>Update</el-button>
            <!-- <el-button size="small" @click="deleteSort(scope.row)" type="danger" plain>Delete</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="名字" label-width="120px">
          <el-input v-model="form.name" placeholder="Please Input Name"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="form.description" placeholder="Please Input Description"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="120px">
          <el-select v-model="searchSortKindId" default-first-option filterable placeholder="请选择">
            <el-option v-for="item in kinds" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
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
      sorts: [],
      kinds: [],
      temp: [],
      searchInfo: '',
      searchSortKindId: '',
      dialogFormVisible: false,
      checkSubmit: true,
      form: {
        name: '',
        description: '',
      },
      sort_id: '',
    };
  },
  mounted(){
    this.getSorts();
    this.getKinds();
  },
  methods: {
    search(){
      this.temp = this.sorts;
      this.sorts = _.filter(this.sorts, { name: this.searchInfo });
    },
    cancel(){
      this.sorts = this.temp;
      this.searchInfo = '';
    },
    // 提交点击事件
    submit(){
      this.dialogFormVisible = false;
      if(this.checkSubmit){
        this.createSort();
      }else{
        this.updateSort();
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
    addSort() {
      this.title = 'Add Sort'
      this.dialogFormVisible = true;
      this.checkSubmit = true;
      this.resetDialog();
    },
    // 创建菜谱种类
    createSort(){
      let kind = _.filter(this.kinds, { id: this.searchSortKindId});
      let data = {
        name: this.form.name,
        description: this.form.description,
        kind: kind[0],
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.sorts,item=>{
          if(item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: '/api/sort/saveSort',
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '添加成功', type: 'success' });
              this.searchSortKindId = '';
              this.getSorts();
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
    // 复写菜谱种类信息
    copySort(row) {
      this.title = 'Update Sort'
      this.dialogFormVisible = true;
      this.checkSubmit = false;
      this.sort_id = row.id;
      this.form.name = row.name;
      this.form.description = row.description;
      this.searchSortKindId = row.kind.id;
    },
    // 更新菜谱种类
    updateSort() {
      let kind = _.filter(this.kinds, { id: this.searchSortKindId});
      let data = {
        name: this.form.name,
        description: this.form.description,
        kind: kind[0],
      }
      console.log(data);
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.sorts,item=>{
          if(item.id != this.sort_id && item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: `/api/sort/updateSort/${this.sort_id}`,
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '修改成功', type: 'success' });
              this.sort_id = '';
              this.searchSortKindId = '';
              this.getSorts();
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
    // // 删除菜谱种类
    // deleteSort(row){
    //   this.$axios({
    //     url: `/api/sort/deleteSort/${row.id}`,
    //     method: 'post'
    //   }).then( res => {
    //     if(res.data.code == 200){
    //       this.$message({ message: '删除成功', type: 'success' });
    //       this.getSorts();
    //     }
    //   });
    // },
    // 获取菜谱种类
    getSorts(){
      this.$axios({
        url: '/api/sort/getAllSorts',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.sorts = res.data.data.sorts;
          // _.sortBy(this.sorts, function(o){ return o.id });
          console.log(this.sorts);
        }
      })
    },
    // 获得菜系分类
    getKinds(){
      this.$axios({
        url: '/api/sort/getAllSortKinds',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.kinds = res.data.data.kinds;
          console.log(this.kinds);
        }
      })
    }
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



