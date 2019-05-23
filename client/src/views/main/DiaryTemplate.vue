<template>
    <el-row class="container">
        <el-col :span="16" :offset="4">
            <el-col :span="14" :offset="2" class="main">
                <div class="title">
                    <span class="title-font">{{diary.title}}</span>
                </div>
                <el-col :span="24" class="diary-base">
                    <img :src="handleImg(diary.photo)" alt="" style="padding:10px; display: block; width: 100%;">
                    <div class="diary-info">
                        {{diary.info}}
                    </div>
                </el-col>
            </el-col>
            <el-col :span="6" class="col-right">
                <div class="user">
                    <div class="user-header">
                        <div class="user-img"><img :src="handleImg(user.photo)"></div>
                        <span class="username">{{user.name}}</span>
                    </div>
                    <div class="user-info">
                        <span>菜谱:&nbsp;{{user.recipeLength}}</span>
                        <span>菜单:&nbsp;{{user.menuLength}}</span>
                        <span>日记:&nbsp;{{user.diaryLength}}</span>
                        <span>收藏:&nbsp;{{user.collectionLength}}</span>
                    </div>
                </div>
                <div class="comment">
                    <ul class="comment-list">
                        <li class="comment-item" v-for="item in diary.comments" :key="item.id">
                            <div class="comment-operation">
                                <el-button class="comment-praise" @click="praise(item.id)" type="text">点赞 {{item.praise}}</el-button>
                            </div>
                            <span class="comment-info">{{item.comment}}</span>
                            <span class="comment-user-info">
                                {{handleDate(item.createDate)}}&nbsp;&nbsp;来自&nbsp;
                                <span class="comment-user-name">{{item.username}}</span>
                                </span>
                        </li>
                    </ul>
                    <div class="comment-publish">
                        <span class="publish-title">发表评论</span>
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入评论" v-model="comment"></el-input>
                        <div class="operation"><el-button @click="publishComment()" type="primary" plain>发表</el-button></div>
                    </div>
                </div>
            </el-col>
        </el-col>
        <Footer></Footer>
    </el-row>
</template>

<script>
    import Footer from './Footer.vue';
export default {
    components:{Footer},
    data(){
        return {
            comment: '',
            diary: '',
            user: '',
            diaryId: '',
        }
    },
    mounted(){
        this.getList();
    },
    methods:{
        handleImg(photo){
            if(!_.isEmpty(photo)){
            return require(`../../assets/imgs/${photo}`);
            }
        },
        handleDate(date){
            return this.moment(date).format('YYYY-MM-DD hh:mm:ss');
        },
        getUserName(item){
            if(!_.isEmpty(item.user)){
                return item.user.name;
            }
        },
        publishComment(){
            if(_.isEmpty(this.user)) { this.$message.error({ message: '请登录' }); this.comment = ''; return false;};
            let user = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user'));
            let data = {
                comment:this.comment,
                praise: 0,
                diary:this.diary,
                userId: _.isEmpty(user)? null : user.id,
                username: _.isEmpty(user)? '': user.name,
            }
            if(!_.isEmpty(data.comment)){
                this.$axios({
                    url:`/main/diaryTemplate/publishComment`,
                    method: 'post',
                    data: data,
                }).then(res=>{
                    if(res.data.code == 200){
                        this.comment = '';
                        this.getList();
                    }
                });
            }else{
                this.$message({
                    message: '请输入评论信息',
                    type: 'warning'
                });
            }
        },
        praise(commentId){
            let data = {commentId};
            this.$axios({
                url:`/main/diaryTemplate/praiseComment`,
                method: 'post',
                data: data,
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: '点赞成功',
                        type: 'success'
                    });
                    this.getList();
                }
            });
        },
        getList(){
            this.diaryId = _.toNumber(this.$route.query.id);
            this.$axios({
                url:`/main/diaryTemplate/findDiaryById/${this.diaryId}`,
                method: 'get',
            }).then(res=>{
                if(res.data.code == 200){
                    this.diary = res.data.data.diary;
                    this.getUserInfo();
                }
            });
        },
        getUserInfo(){
            let userId = this.diary.user.id;
            this.$axios({
                url:`/main/diaryTemplate/findUserById/${userId}`,
                method: 'get',
            }).then(res=>{
                if(res.data.code == 200){
                    this.user = res.data.data.user;
                    this.user.menuLength = this.user.menus.length;
                    this.user.diaryLength = this.user.diarys.length;
                    this.user.collectionLength = this.user.collections.length;
                    this.user.recipeLength = this.user.recipes.length;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
    .container{
        .main{
            .title{
                border-bottom: 1px solid black;
                .title-font{
                    display: inline-block;
                    padding: 20px 10px;
                    font-size: $font_size2_5;
                    font-weight: bold;
                }
            }
            .diary-base{
                margin-top: 20px;
                height: 400px;
                background-color: white;
                overflow: hidden;
                box-shadow: 0 0 3px rgba(255, 0, 0, 0.4);
                .diary-info{
                    width: 100%;
                    text-indent: $font_size2;
                    line-height: 30px;
                    padding: 20px;
                    color: #606266;
                }
            }
        }
        .col-right{
            margin-top: 40px;
            margin-left: 10px;
            .user{
                background-color: rgb(255, 255, 255);
                .user-header{
                    width: $width100;
                    padding: 50px 0;
                    border-bottom: 1px dashed rgba(53, 50, 50, 0.575);
                    background-image: url('../../assets/headerbackground.jpg');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    overflow: hidden;
                    .user-img{
                        margin: 0 auto;
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                        overflow: hidden;
                        img{ width: 70px; display: block; background-color: black;}
                    }
                    .username{
                        padding: 20px 0;
                        display: block;
                        text-align: center;
                        color: black;
                    }
                }
                .user-info{
                    margin: 20px 0;
                    text-align: center;
                    span{
                        display: block;
                        margin: 5px 0;
                        font-size: 14px;
                        color: rgba(48, 45, 45, 0.548);
                    }
                }
            }
            .comment{
                background-color: white;
                ul,li{list-style: none;}
                .comment-list{
                    padding: 10px;
                    margin: 0;
                    .comment-item{
                        padding: 10px 0;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.274);
                        .comment-operation{
                            text-align: right;
                            .comment-praise{color: rgba(12, 141, 12, 0.329); &:hover{color: #f40;}}
                        }
                        .comment-info{ 
                            display: block; 
                            padding-left: $size5; 
                            text-indent: 
                            $font_size2;
                        }
                        .comment-user-info{ 
                            display: block; 
                            text-align: right; 
                            padding-top: $size10; 
                            font-size: 12px;
                            .comment-user-name{
                                color: rgba(0, 0, 0, 0.548);
                            }
                        }
                    }
                }
                .comment-publish{
                    padding: 10px;
                    .publish-title{
                        display: block;
                        font-size: 18px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.267);
                    }
                    .el-textarea{
                        margin: 10px 0;
                    }
                    .operation{
                        text-align: right;
                        .el-button{
                            padding: 8px 12px;
                        }
                    }
                }
            }
        }
    }
</style>