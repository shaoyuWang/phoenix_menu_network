<template>
  <el-row class="container">
    <el-row class="header">
      <div class="search">
        <el-select v-model="searchInfo" filterable placeholder="请选择" style="width: 300px;">
          <el-option v-for="item in materials" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" circle style="margin-left: 10px;" @click="search()"></el-button>
        <el-button icon="el-icon-delete" circle style="margin-left:10px;" @click="cancel()" type="danger" ></el-button>
      </div>
      <el-button type="primary" class="add" @click="addMaterial()">+Add</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="materials.slice((currentPage-1)*pagesize, currentPage*pagesize)" stripe style="width: 97%;">
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="name" label="名字" class-name="table_column"></el-table-column>
        <el-table-column prop="description" label="描述" class-name="table_column"></el-table-column>
        <el-table-column prop="kind.name" label="分类" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copyMaterial(scope.row)" type="warning" plain>Update</el-button>
            <!-- <el-button size="small" @click="deleteMaterial(scope.row)" type="danger" plain>Delete</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" style="text-align: center; margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" 
          :current-page.sync="currentPage" :pager-count="5" :total="materials.length">
        </el-pagination>
      </el-col>
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
          <el-select v-model="searchMaterialKindId" default-first-option filterable placeholder="请选择">
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
      pagesize: 10,
      currentPage: 1,
      title: '',
      materials: [],
      kinds: [],
      temp: [],
      searchInfo: '',
      searchMaterialKindId: '',
      dialogFormVisible: false,
      checkSubmit: true,
      form: {
        name: '',
        description: '',
      },
      material_id: '',
    };
  },
  mounted(){
    this.getMaterials();
    this.getKinds();
  },
  methods: {
    current_change(currentPage){  //改变当前页
      this.currentPage = currentPage
    },
    search(){
      this.temp = this.materials;
      this.materials = _.filter(this.materials, { name: this.searchInfo });
    },
    cancel(){
      this.materials = this.temp;
      this.searchInfo = '';
    },
    // 提交点击事件
    submit(){
      this.dialogFormVisible = false;
      if(this.checkSubmit){
        this.createMaterial();
      }else{
        this.updateMaterial();
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
    addMaterial() {
      this.title = 'Add Material'
      this.dialogFormVisible = true;
      this.checkSubmit = true;
      this.resetDialog();
    },
    // 创建材料
    createMaterial(){
      let kind = _.filter(this.kinds, { id: this.searchMaterialKindId});
      let data = {
        name: this.form.name,
        description: this.form.description,
        kind: kind[0],
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.materials,item=>{
          if(item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: '/api/material/saveMaterial',
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '添加成功', type: 'success' });
              this.searchMaterialKindId = '';
              this.getMaterials();
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
    // 复写材料信息
    copyMaterial(row) {
      this.title = 'Update Material'
      this.dialogFormVisible = true;
      this.checkSubmit = false;
      this.material_id = row.id;
      this.form.name = row.name;
      this.form.description = row.description;
      this.searchMaterialKindId = row.kind.id;
    },
    // 更新材料
    updateMaterial() {
      let kind = _.filter(this.kinds, { id: this.searchMaterialKindId});
      let data = {
        name: this.form.name,
        description: this.form.description,
        kind: kind[0],
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.materials,item=>{
          if(item.id != this.material_id && item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: `/api/material/updateMaterial/${this.material_id}`,
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '修改成功', type: 'success' });
              this.material_id = '';
              this.searchMaterialKindId = '';
              this.getMaterials();
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
    // // 删除材料
    // deleteMaterial(row){
    //   this.$axios({
    //     url: `/api/material/deleteMaterial/${row.id}`,
    //     method: 'post'
    //   }).then( res => {
    //     if(res.data.code == 200){
    //       this.$message({ message: '删除成功', type: 'success' });
    //       this.getMaterials();
    //     }
    //   });
    // },
    // 获取材料
    getMaterials(){
      this.$axios({
        url: '/api/material/getAllMaterials',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.materials = res.data.data.materials;
        }
      })
    },
    // 获得菜系分类
    getKinds(){
      this.$axios({
        url: '/api/material/getAllMaterialKinds',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.kinds = res.data.data.kinds;
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



