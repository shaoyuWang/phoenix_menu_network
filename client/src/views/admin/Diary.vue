<template>
  <el-row class="container">
    <el-row class="header">
      <el-button type="primary" class="add" @click="addDiary()">+Add</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="diarys" stripe style="width: 97%;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="table-drop-down">
              <span class="table-drop-down-title">内容</span>
              <span class="table-drop-down-info">{{props.row.info}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="title" label="标题" class-name="table_column"></el-table-column>
        <el-table-column label="图片" class-name="table_column"  width="100">
          <template slot-scope="scope">
            <img class="table-img" :src="handleImg(scope.row.photo)">
          </template>
        </el-table-column>
        <el-table-column label="操作" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="copyDiary(scope.row)" type="warning" plain>Update</el-button>
            <el-button size="small" @click="deleteDiary(scope.row)" type="danger" plain>Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 模态框 -->
    <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="form.title" placeholder="Please Input Title"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="120px">
          <el-input v-model="form.info" type="textarea" placeholder="Please Input Information"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <el-upload class="upload-demo" action="/upload/img" 
            name="file"
            list-type="picture" :limit="1" :on-success="handleSuccess" :on-exceed="onExceed" :before-upload="beforeUpload">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jepg文件，且不超过2m</div>
        </el-upload>
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
      diarys: [],
      dialogFormVisible: false,
      checkSubmit: true,
      form: {
        name: '',
        info: '',
        photo: '1659891558276303303.jpg',
      },
      diaryId: '',
    };
  },
  mounted(){
    this.getDiarys();
  },
  methods: {
    // 图片上传方法
    //文件上传成功的钩子函数
    handleSuccess(res, file) {
      this.$message({ type: "success", message: "图片上传成功" });
      const pathList = _.split(res.writeImage.path, "/");
      this.form.photo = pathList[ pathList.length - 1 ];
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
    handleImg(photo){
      if(!_.isEmpty(photo)){
        return require(`../../assets/imgs/${photo}`);
      }
    },
    // 提交点击事件
    submit(){
      this.dialogFormVisible = false;
      if(this.checkSubmit){
        this.createDiary();
      }else{
        this.updateDiary();
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
    addDiary() {
      this.title = 'Add Diary'
      this.dialogFormVisible = true;
      this.checkSubmit = true;
      this.resetDialog();
    },
    // 创建日记
    createDiary(){
      let data = {
        title: this.form.title,
        info: this.form.info,
        photo: this.form.photo,
        user_id:  _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null : JSON.parse(sessionStorage.getItem('user')).id,
      }
      if(data.title || data.info || data.photo){
        this.$axios({
          url: '/api/diary/saveDiary',
          method: 'post',
          data,
        }).then(res=>{
          if(res.data.code == 200){
            this.$message({ message: '添加成功', type: 'success' });
            this.getDiarys();
          }
        });
      }else{
        this.dialogFormVisible = true;
        this.$message.error({ message: '请填写完整信息' });
      }
    },
    // 复写日记信息
    copyDiary(row) {
      this.title = 'Update Diary'
      this.dialogFormVisible = true;
      this.checkSubmit = false;
      this.diaryId = row.id;
      this.form.photo = row.photo;
      this.form.name = row.name;
      this.form.description = row.description;
    },
    // 更新日记
    updateDiary() {
      let data = {
        title: this.form.title,
        info: this.form.info,
        photo: this.form.photo,
      }
      if(data.title || data.info || data.photo){
        this.$axios({
          url: `/api/diary/updateDiary/${this.diaryId}`,
          method: 'post',
          data,
        }).then(res=>{
          if(res.data.code == 200){
            this.$message({ message: '修改成功', type: 'success' });
            this.getDiarys();
          }
        });
      }else{
        this.dialogFormVisible = true;
        this.$message.error({ message: '请填写完整信息' });
      }
    },
    // 删除日记
    deleteDiary(row){
      this.$axios({
        url: `/api/diary/deleteDiary/${row.id}`,
        method: 'post',
      }).then( res => {
        if(res.data.code == 200){
          this.$message({ message: '删除成功', type: 'success' });
          this.getDiarys();
        }
      });
    },
    // 获取日记
    getDiarys(){
      this.$axios({
        url: '/api/diary/getAllDiarys',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.diarys = res.data.data.diarys;
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



