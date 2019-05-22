<template>
  <el-row class="container">
    <el-row class="header">
      <el-button type="primary" class="add" @click="addComment()" disabled>+Add</el-button>
    </el-row>
    <el-row class="main">
      <el-table :data="comments.slice((currentPage-1)*pagesize, currentPage*pagesize)" stripe style="width: 97%;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="table-drop-down">
              <span class="table-drop-down-title">评论</span>
              <span class="table-drop-down-info">{{props.row.comment}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" class-name="table_column" width="70"></el-table-column>
        <el-table-column prop="praise" label="点赞数" class-name="table_column"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" class-name="table_column" :formatter='handleDate'></el-table-column>
        <el-table-column prop="userId" label="用户ID" class-name="table_column"></el-table-column>
        <el-table-column prop="username" label="用户名" class-name="table_column"></el-table-column>
        <el-table-column label="Operation" class-name="table_column">
          <template slot-scope="scope">
            <el-button size="small" @click="deleteComment(scope.row)" type="danger" plain>Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" style="text-align: center; margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" 
          :current-page.sync="currentPage" :pager-count="5" :total="comments.length">
        </el-pagination>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      title: '',
      comments: [],
    };
  },
  mounted(){
    this.getComments();
  },
  methods: {
    current_change(currentPage){  //改变当前页
      this.currentPage = currentPage
    },
    handleDate(row){
        return this.moment(row.createDate).format('YYYY-MM-DD hh:mm:ss');
    },
    // 删除评论
    deleteComment(row){
      this.$axios({
        url: `/api/recipeComment/deleteComment/${row.id}`,
        method: 'post'
      }).then( res => {
        if(res.data.code == 200){
          this.$message({ message: '删除成功', type: 'success' });
          this.getComments();
        }
      });
    },
    // 获取评论
    getComments(){
      this.$axios({
        url: '/api/recipeComment/getAllComments',
        method: 'get',
      }).then(res =>{
        if(res.data.code == 200){
          this.comments = res.data.data.comments;
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



