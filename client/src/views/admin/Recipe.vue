<template>
  <el-row class="container">
    <el-row class="header">
      <el-button type="success" class="add" @click="addMaterail()" disabled="">+Add Materail</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="recipeList" stripe style="width: 97%;">
        <el-table-column type="expand">
      <template slot-scope="items" class="second">
        <!-- <span>{{items.row.MaterailSorts}}</span> -->
        <el-table :data='items.row.steps' stripe style="width: 97%">
          <el-table-column prop="id" label="ID" class-name="table_column"></el-table-column>
          <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
          <el-table-column prop="step" label="Step" class-name="table_column"></el-table-column>
          <el-table-column prop="photo" label="Photo" class-name="table_column" v-if="show=false"></el-table-column>
          <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="updateMaterail(scope.$index,scope.row)" type="warning" plain>Add</el-button>
            <el-button size="small" @click="updateMaterail(scope.$index,scope.row)" type="primary" plain>Update</el-button>
          </template>
        </el-table-column>
        </el-table>
      </template>
    </el-table-column>
        <el-table-column prop="id" label="ID" class-name="table_column"></el-table-column>
        <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
        <el-table-column prop="user.name" label="User Name" class-name="table_column"></el-table-column>
        <el-table-column prop="level" label="Level" class-name="table_column"></el-table-column>
        <el-table-column prop="time" label="Time Length" class-name="table_column"></el-table-column>
        <el-table-column prop="step_number" label="Step Number" class-name="table_column"></el-table-column>
        <el-table-column prop="evaluate" label="Evaluate" class-name="table_column"></el-table-column>
        <el-table-column prop="technology.name" label="Technology" class-name="table_column"></el-table-column>
        <el-table-column prop="taste.name" label="Taste" class-name="table_column"></el-table-column>
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
      recipeList: [
        {
          id: 1,
          name: '红烧排骨',
          level: 3,
          time: '30分',
          evaluate: '这道菜还挺好吃的',
          step_number: 3,
          finishPhoto: '',
          major_materail: [
            {id: 1, name: '猪肉'},
            {id: 2, name: '牛肉'}
          ],
          auxiliary_materail: [
            {id: 1, name: '葱'},
            {id: 2, name: '姜'},
            {id: 3, name: '蒜'},
          ],
          user:{id: 1, name: 'admin'},
          sorts: [
            {id: 1, name: '家常菜'},
            {id: 2, name: '私房菜'},
          ],
          technology: {id: 1, name: '炖'},
          taste: {id: 1, name: '甜'},
          steps: [
            {id: 1,name: '步骤一', step: 1},
            {id: 2,name: '步骤二', step: 2},
            {id: 3,name: '步骤三', step: 3}
          ]
        },
        {
          id: 2,
          name: '红烧排骨',
          level: 3,
          time: '30分',
          evaluate: '这道菜还挺好吃的',
          step_number: 3,
          finishPhoto: '',
          major_materail: [
            {id: 1, name: '猪肉'},
            {id: 2, name: '牛肉'}
          ],
          auxiliary_materail: [
            {id: 1, name: '葱'},
            {id: 2, name: '姜'},
            {id: 3, name: '蒜'},
          ],
          user:{id: 1, name: 'admin'},
          sorts: [
            {id: 1, name: '家常菜'},
            {id: 2, name: '私房菜'},
          ],
          technology: {id: 1, name: '炖'},
          taste: {id: 1, name: '甜'},
          steps: [
            {id: 1,name: '步骤一', step: 1},
            {id: 2,name: '步骤二', step: 2},
            {id: 3,name: '步骤三', step: 3}
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
      console.log(this.form.kind_id);
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
      console.log(data);
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



