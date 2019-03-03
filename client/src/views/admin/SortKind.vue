<template>
  <el-row class="container">
    <el-row class="header">
      <el-button type="primary" class="add" @click="addKind()">+Add Kind</el-button>
      <el-button type="success" class="add" @click="addSort()">+Add Sort</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="kindList" stripe style="width: 97%;">
        <el-table-column type="expand">
      <template slot-scope="items" class="second">
        <el-table :data='items.row.sorts' stripe style="width: 97%">
          <el-table-column prop="id" label="ID" class-name="table_column"></el-table-column>
          <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
          <el-table-column prop="description" label="Description" class-name="table_column"></el-table-column>
          <el-table-column prop="kind_id" label="Kind Id" class-name="table_column" v-if="show=false"></el-table-column>
          <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="updateSort(scope.$index,scope.row)" type="warning" plain>Update</el-button>
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
            <el-button size="small" @click="updateKind(scope.$index,scope.row)" type="primary" plain>Update</el-button>
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
      kindList: [
        {
          id: 1,
          name: '家常菜谱',
          description: '家常菜谱',
          sorts:[
            { id: 1, name: '家常菜', description: '家常菜', kind: { id: 1, name: '家常菜谱'}},
            { id: 2, name: '私房菜', description: '私房菜', kind: { id: 1, name: '家常菜谱'}},
          ]
        },
        {
          id: 2,
          name: '中华菜系',
          description: '中华菜系',
          sorts:[
            { id: 1, name: '东北菜', description: '东北菜', kind: { id: 2, name: '中华菜系'}},
            { id: 2, name: '川菜', description: '川菜', kind: { id: 2, name: '中华菜系'}},
          ]
        },
      ],
      kinds: [
        { id: 1, name: '家常菜谱'},
        { id: 2, name: '中华菜系'}
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
      console.log(this.form.kind_id);
    },
    //取消方法
    Close(){
      this.dialogFormVisible = false;
      // this.resetDialog();
    },
    // 添加菜谱种类
    addKind(){
      this.dialogFormVisible = true;
      this.addJudge = true;
      this.checkHidden = true;
      this.title = '添加菜谱种类';
    },
    // 修改菜谱种类
    updateKind(index, data){
      this.dialogFormVisible = true;
      this.checkHidden = true;
      this.title = '修改菜谱种类';
      console.log(data);
    },
    // 添加菜谱分类
    addSort(){
      this.dialogFormVisible = true;
      this.addJudge = false;
      this.checkHidden = false;
      this.title = '添加菜谱分类';
    },
    // 修改菜谱分类
    updateSort(index, data){
      this.dialogFormVisible = true;
      this.checkHidden = false;
      this.title = '修改菜谱分类';
      console.log(data);
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



