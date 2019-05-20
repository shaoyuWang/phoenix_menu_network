<template>
  <el-row class="container">
    <el-row class="header">
      <el-button type="primary" class="add" @click="addMaterailKind()">+Add Materail Kind</el-button>
      <el-button type="success" class="add" @click="addMaterail()">+Add Materail</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="MaterailList" stripe style="width: 97%;">
        <el-table-column type="expand">
      <template slot-scope="items" class="second">
        <!-- <span>{{items.row.MaterailSorts}}</span> -->
        <el-table :data='items.row.Materails' stripe style="width: 97%">
          <el-table-column prop="id" label="ID" class-name="table_column"></el-table-column>
          <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
          <el-table-column prop="description" label="Description" class-name="table_column"></el-table-column>
          <el-table-column prop="kind_id" label="Kind Id" class-name="table_column" v-if="show=false"></el-table-column>
          <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="updateMaterail(scope.$index,scope.row)" type="warning" plain>Update</el-button>
          </template>
        </el-table-column>
        </el-table>
      </template>
    </el-table-column>
        <el-table-column prop="id" label="ID" class-name="table_column"></el-table-column>
        <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
        <el-table-column prop="description" label="Description" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="updateMaterailKind(scope.$index,scope.row)" type="primary" plain>Update</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item label="Name" label-width="120px">
            <el-input type="name" v-model="form.name" placeholder="Please Input Name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description" label-width="120px">
            <el-input v-model="form.description" type="description" placeholder="Please Input Description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Kind" label-width="120px" :hidden="checkHidden">
            <el-radio-group v-model="form.kind_id">
              <el-radio-button v-for="(kind,index) in kinds" :label="kind.id" :key="index" border>{{kind.name}}</el-radio-button>
            </el-radio-group>
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
      dialogFormVisible: false,
      checkSubmit: true,
      addJudge: false,
      checkHidden: true,
      title: '',
      MaterailList: [
        {
          id: 1,
          name: '蔬菜',
          description: '蔬菜',
          Materails:[
            { id: 1, name: '黄瓜', description: '黄瓜', kind: { id: 1, name: '蔬菜'}},
            { id: 2, name: '辣椒', description: '辣椒', kind: { id: 1, name: '蔬菜'}},
          ]
        },
        {
          id: 2,
          name: '肉类',
          description: '肉类',
          Materails:[
            { id: 1, name: '猪肉', description: '猪肉', kind: { id: 1, name: '肉类'}},
            { id: 2, name: '牛肉', description: '牛肉', kind: { id: 1, name: '肉类'}},
          ]
        },
      ],
      kinds: [
        { id: 1, name: '蔬菜'},
        { id: 2, name: '肉类'}
      ],
      form: {
        name: '',
        kind_id: '',
        description: '',
      },
    };
  },
  mounted(){

  },
  methods: {
    // 提交点击事件
    Submit(){
      this.dialogFormVisible = false;
    },
    //取消方法
    Close(){
      this.dialogFormVisible = false;
      // this.resetDialog();
    },
    // 添加材料种类
    addMaterailKind(){
      this.dialogFormVisible = true;
      this.addJudge = true;
      this.checkHidden = true;
      this.title = '添加材料种类';
    },
    // 修改材料种类
    updateMaterailKind(index, data){
      this.dialogFormVisible = true;
      this.checkHidden = true;
      this.title = '修改材料种类';
    },
    // 添加材料
    addMaterail(){
      this.dialogFormVisible = true;
      this.addJudge = false;
      this.checkHidden = false;
      this.title = '添加材料';
    },
    // 修改材料
    updateMaterail(index, data){
      this.dialogFormVisible = true;
      this.checkHidden = false;
      this.title = '修改材料种类';
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
    }
    .main{
      .el-table{
        margin: $size20;
        border-radius: 15px;
        /deep/ .table_column{
          text-align: $position_center;
        }
      }
    }
  }
</style>



