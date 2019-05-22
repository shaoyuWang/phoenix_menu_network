<template>
  <el-row class="container">
    <el-row class="header">
      <el-button type="primary" class="add" @click="addEffect()">+Add</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="effects" stripe style="width: 97%;">
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
        <el-table-column prop="description" label="Description" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copyEffect(scope.row)" type="warning" plain>Update</el-button>
            <!-- <el-button size="small" @click="deleteEffect(scope.row)" type="danger" plain>Delete</el-button> -->
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
      effects: [],
      dialogFormVisible: false,
      checkSubmit: true,
      form: {
        name: '',
        description: '',
      },
      effect_id: '',
    };
  },
  mounted(){
    this.getEffects();
  },
  methods: {
    // 提交点击事件
    submit(){
      this.dialogFormVisible = false;
      if(this.checkSubmit){
        this.createEffect();
      }else{
        this.updateEffect();
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
    addEffect() {
      this.title = 'Add Effect'
      this.dialogFormVisible = true;
      this.checkSubmit = true;
      this.resetDialog();
    },
    // 创建功效
    createEffect(){
      let data = {
        name: this.form.name,
        description: this.form.description,
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.effects,item=>{
          if(item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: '/api/effect/saveEffect',
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '添加成功', type: 'success' });
              this.getEffects();
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
    // 复写功效信息
    copyEffect(row) {
      this.title = 'Update Effect'
      this.dialogFormVisible = true;
      this.checkSubmit = false;
      this.effect_id = row.id;
      this.form.name = row.name;
      this.form.description = row.description;
    },
    // 更新功效
    updateEffect() {
      let data = {
        name: this.form.name,
        description: this.form.description,
      }
      let judge = false ;
      if(data.name && data.description){
        _.forEach(this.effects,item=>{
          if(item.id != this.effect_id && item.name == _.trim(data.name)) judge = true;
        })
        if(!judge){
          this.$axios({
            url: `/api/effect/updateEffect/${this.effect_id}`,
            method: 'post',
            data,
          }).then(res=>{
            if(res.data.code == 200){
              this.$message({ message: '修改成功', type: 'success' });
              this.effect_id = '';
              this.getEffects();
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
    // // 删除功效
    // deleteEffect(row){
    //   this.$axios({
    //     url: `/api/effect/deleteEffect/${row.id}`,
    //     method: 'post'
    //   }).then( res => {
    //     if(res.data.code == 200){
    //       this.$message({ message: '删除成功', type: 'success' });
    //       this.getEffects();
    //     }
    //   });
    // },
    // 获取功效
    getEffects(){
      this.$axios({
        url: '/api/effect/getAllEffects',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.effects = res.data.data.effects;
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



