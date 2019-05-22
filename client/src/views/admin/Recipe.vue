<template>
  <el-row class="container">
    <el-row class="header">
      <el-button type="success" class="add" @click="addRecipe()">+Add Recipe</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="recipeList.slice((currentPage-1)*pagesize, currentPage*pagesize)" stripe style="width: 97%;">
        <el-table-column type="expand">
      <template slot-scope="items" class="second">
        <el-table :data='items.row.steps' stripe style="width: 97%">
          <el-table-column prop="id" label="ID" class-name="table_column"></el-table-column>
          <el-table-column prop="name" label="Name" class-name="table_column"></el-table-column>
          <el-table-column prop="step" label="Step" class-name="table_column"></el-table-column>
          <el-table-column prop="photo" label="Photo" class-name="table_column" v-if="show=false"></el-table-column>
          <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="updateRecipe(scope.$index,scope.row)" type="primary" plain>Update</el-button>
          </template>
        </el-table-column>
        </el-table>
      </template>
    </el-table-column>
        <el-table-column prop="id" label="ID" class-name="table_column"></el-table-column>
        <el-table-column prop="name" label="菜谱名" class-name="table_column"></el-table-column>
        <el-table-column prop="level" label="难度" class-name="table_column"></el-table-column>
        <el-table-column prop="time" label="时长" class-name="table_column"></el-table-column>
        <el-table-column prop="evaluate" label="简介" class-name="table_column"></el-table-column>
        <el-table-column prop="effects" label="功效" class-name="table_column" :formatter='formatter'></el-table-column>
        <el-table-column prop="technology.name" label="工艺" class-name="table_column"></el-table-column>
        <el-table-column prop="taste.name" label="口味" class-name="table_column"></el-table-column>
        <el-table-column prop="user.name" label="上传人" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="updateRecipeKind(scope.$index,scope.row)" type="primary" plain>Update</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" style="text-align: center; margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" 
          :current-page.sync="currentPage" :pager-count="5" :total="recipeList.length">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
        <el-form :model="form" class="infomation">
            <el-form-item label="名字" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="form.name" placeholder="Please Input Name" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="简介" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="form.evaluate" placeholder="Please Input Email" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="饮食时间" label-width="120px" style="display:inline-block;">
                <el-select v-model="form.timeType" default-first-option filterable placeholder="请选择">
                    <el-option v-for="item in threeMeals" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="制作难度" label-width="120px" style="display:inline-block;">
                <el-select v-model="form.level" default-first-option filterable placeholder="请选择">
                    <el-option v-for="item in level" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工艺" label-width="120px" style="display:inline-block;">
                <el-select v-model="form.technologyId" default-first-option filterable placeholder="请选择">
                    <el-option v-for="item in baseInfo.technologys" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="口味" label-width="120px" style="display:inline-block;">
                <el-select v-model="form.tasteId" default-first-option filterable placeholder="请选择">
                    <el-option v-for="item in baseInfo.tastes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类" label-width="120px" style="display:inline-block;">
                <el-select v-model="form.sortId" default-first-option filterable placeholder="请选择">
                    <el-option v-for="item in baseInfo.sorts" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="功效" label-width="120px" style="display:inline-block;">
                <el-select v-model="form.effect" multiple default-first-option filterable placeholder="请选择">
                    <el-option v-for="item in baseInfo.effects" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主料" label-width="120px">
                <el-select v-model="tempMajorMaterial.id" default-first-option filterable placeholder="请选择">
                    <el-option v-for="item in baseInfo.materials" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-input v-model="tempMajorMaterial.quality" placeholder="请输入重量" style="width: 200px;margin-left:10px;"></el-input>
                <el-button type="success" @click="addMajor()" plain style="margin-left:10px;">添加</el-button>
            </el-form-item>
            <el-form-item label="辅料" label-width="120px">
                <el-select v-model="tempAuxiliaryMaterial.id" default-first-option filterable placeholder="请选择">
                    <el-option v-for="item in baseInfo.materials" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-input v-model="tempAuxiliaryMaterial.quality" placeholder="请输入重量" style="width: 200px;margin-left:10px;"></el-input>
                <el-button type="success" @click="addAuxiliary()" plain style="margin-left:10px;">添加</el-button>
            </el-form-item>
            <el-form-item label="制作时长" label-width="120px" style="padding: 10px 0;">
                <el-input v-model.number="form.time" :min='1' :max='240' placeholder="Please Input Telephone" style="width: 90%;">
                    <template slot="append">分钟</template>
                </el-input>
            </el-form-item>
            <el-form-item label="添加步骤" label-width="120px">
                <el-select v-model="tempStep.step" default-first-option filterable placeholder="请选择">
                    <el-option v-for="item in step" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <div style="display:inline-block; margin-left:10px;">
                    <el-upload action="/upload/img" :limit="1" :on-success="handleSuccess" :on-exceed="onExceed" :before-upload="beforeUpload">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <div slot="tip" style="display:inline-block; margin-left: 20px;font-size:12px;">只能上传jpg/jepg文件，且不超过2m</div>
                </el-upload>
                </div>
                <el-button type="success" @click="addStep()" plain style="margin-left:10px;">添加</el-button>
                <el-input v-model="tempStep.info" type="textarea" placeholder="请输入内容" style="width:500px; margin-top: 10px;"></el-input>
            </el-form-item>
            <el-form-item label="成果图" label-width="120px" style="padding: 10px 0;">
                <el-upload action="/upload/img" :limit="1" :on-success="handleSuccess" :on-exceed="onExceed" :before-upload="beforeUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" style="display:inline-block; margin-left: 10px;">只能上传jpg/jepg文件，且不超过2m</div>
                </el-upload>
            </el-form-item>
            <el-form-item style="text-align:center;">
                <el-button type="success" @click="submit()">添加</el-button>
                <el-button type="primary" @click="reset()">取消</el-button>
            </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button :visible.sync="checkSubmit"  type="primary" @click="submit()">确 定</el-button>
          <el-button type="warning" @click="close()">取 消</el-button>
        </div>
      </el-dialog>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      pagesize: 5,
      currentPage: 1,
      dialogFormVisible: false,
      checkSubmit: true,
      addJudge: false,
      checkHidden: true,
      title: '',
      recipeList: [],
      tempMajorMaterial:{
        id: '',
        quality: '',
      },
      tempAuxiliaryMaterial:{
        id: '',
        quality: '',
      },
      tempStep:{
        info: '',
        step: '',
        photo: '',
      },
      form: {
        name: '',
        evaluate: '',
        timeType: '',
        level: '',
        time: '',
        technologyId: '',
        tasteId: '',
        effect: [],
        sortId: '',
        majorMaterials: [],
        auxiliaryMaterials: [],
        steps: [],
      },
      baseInfo: '',
      threeMeals:[
        { id: 1, name: '早餐'},
        { id: 2, name: '午餐'},
        { id: 3, name: '晚餐'},
      ],
      level:[
        { id: 1, name: '轻松' },
        { id: 2, name: '适中' },
        { id: 3, name: '中等' },
        { id: 4, name: '较难' },
        { id: 5, name: '困难' },
      ],
      step:[
        { id: 1, name: '第一步' },
        { id: 2, name: '第二步' },
        { id: 3, name: '第三步' },
        { id: 4, name: '第四步' },
        { id: 5, name: '第五步' },
        { id: 6, name: '第六步' },
        { id: 7, name: '第七步' },
        { id: 8, name: '第八步' },
        { id: 9, name: '第九步' },
        { id: 10, name: '第十步' },
      ]
    };
  },
  mounted(){
    this.getRecipe();
  },
  methods: {
    current_change(currentPage){  //改变当前页
      this.currentPage = currentPage
    },
    // 拼接多个roles
    formatter(row,column){
      let allRole = ''
      if(row.roles != []){
        for(var i = 0;i < row.effects.length;i++){
          allRole += row.effects[i].name + ',';
        }
        allRole = allRole.substring(0,allRole.lastIndexOf(','));
      }
      return allRole;
    },
    addMajor(){
      if(this.tempMajorMaterial.id == ''){ this.$message.error({ message: '请选择材料'}); return false;};
      if(this.tempMajorMaterial.quality == ''){ this.$message.error({ message: '请输入重量'}); return false;};
      let material = _.filter(this.baseInfo.materials, { id: this.tempMajorMaterial.id });
      let data = {
          materialId: material[0].id,
          name: material[0].name,
          quality: this.tempMajorMaterial.quality,
          photo: material[0].photo,
      }
      this.form.majorMaterials.push(data);
      this.tempMajorMaterial.id = '';
      this.tempMajorMaterial.quality = '';
      this.$message({ message: '添加成功', type: 'success'});
    },
    addAuxiliary(){
      if(this.tempAuxiliaryMaterial.id == ''){ this.$message.error({ message: '请选择材料'}); return false;};
      if(this.tempAuxiliaryMaterial.quality == ''){ this.$message.error({ message: '请输入重量'}); return false;};
      let material = _.filter(this.baseInfo.materials, { id: this.tempAuxiliaryMaterial.id });
      let data = {
        materialId: material[0].id,
        name: material[0].name,
        quality: this.tempAuxiliaryMaterial.quality,
        photo: material[0].photo,
      };
      this.form.auxiliaryMaterials.push(data);
      this.tempAuxiliaryMaterial.id = '';
      this.tempAuxiliaryMaterial.quality = '';
      this.$message({ message: '添加成功', type: 'success'});
    },
    addStep(){

    },
    // 图片上传方法
    //文件上传成功的钩子函数
    handleSuccess(res, file) {
        this.$message({ type: "success", message: "图片上传成功" });
        console.log(file);
        // const pathList = _.split(res.writeImage.path, "/");
        // this.form.photo = pathList[ pathList.length - 1 ];
    },
    //上传的文件个数超出设定时触发的函数
    onExceed(files, fileList) {
        this.$message.error({ message: "最多只能上传一个图片" });
    },
    //文件上传前的前的钩子函数
    //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    beforeUpload(file) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$message.error("上传图片必须是JPG 格式!");
        }
        if (!isLt2M) {
            this.$message.error("上传图片大小不能超过 2MB!");
        }
        return (isJPG) && isLt2M;
    },
    // 提交点击事件
    submit(){
      this.dialogFormVisible = false;
    },
    //取消方法
    close(){
      this.dialogFormVisible = false;
      // this.resetDialog();
    },
    // 添加材料种类
    addRecipeKind(){
      this.dialogFormVisible = true;
      this.addJudge = true;
      this.checkHidden = true;
      this.title = '添加材料种类';
    },
    // 修改材料种类
    updateRecipeKind(index, data){
      this.dialogFormVisible = true;
      this.checkHidden = true;
      this.title = '修改材料种类';
    },
    // 添加材料
    addRecipe(){
      this.dialogFormVisible = true;
      this.addJudge = false;
      this.checkHidden = false;
      this.title = '添加材料';
    },
    // 修改材料
    updateRecipe(index, data){
      this.dialogFormVisible = true;
      this.checkHidden = false;
      this.title = '修改材料种类';
    },
    getRecipe(){
      this.$axios({
        url: '/api/recipe/getAllRecipes',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.recipeList = res.data.data.recipes;
          console.log(this.recipeList)
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
    }
    .main{
      .el-table{
        margin: $size10 $size20 $size0 $size20;
        border-radius: 15px;
        /deep/ .table_column{
          text-align: $position_center;
        }
      }
    }
  }
</style>



