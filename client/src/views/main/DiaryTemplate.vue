<template>
    <el-row class="container">
        <el-col :span="16" :offset="4">
            <el-col :span="14" :offset="2" class="main">
                <div class="title">
                    <span class="title-font">我的日记</span>
                </div>
                <el-col :span="24" class="diary-base">
                    <div class="diary-info">
                        这东西不错。我感觉行这东西不错。我感觉行这东西不错。我感觉行这东西不错。我感觉行这东西不错。我感觉行这东西不错。我感觉行
                    </div>
                </el-col>
            </el-col>
            <el-col :span="6" class="col-right">
                <div class="user">
                    <div class="user-header">
                        <div class="user-img"><img src="../../assets/logo.jpg"></div>
                        <span class="username">中天北极紫微大帝</span>
                    </div>
                    <div class="user-info">
                        <span>菜谱:&nbsp;11</span>
                        <span>菜单:&nbsp;11</span>
                        <span>日记:&nbsp;11</span>
                        <span>收藏:&nbsp;11</span>
                    </div>
                </div>
                <div class="comment">
                    <ul class="comment-list">
                        <li class="comment-item" v-for="item in 5" :key="item">
                            <div class="comment-operation">
                                <el-button class="comment-praise" type="text">点赞 0</el-button>
                            </div>
                            <span class="comment-info">这东西不错。我感觉行</span>
                            <span class="comment-user-info">2019-01-01 19:10:10&nbsp;&nbsp;来自&nbsp;中天北极紫微大帝</span>
                        </li>
                    </ul>
                    <div class="comment-publish">
                        <span class="publish-title">发表评论</span>
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入评论" v-model="diary"></el-input>
                        <div class="operation"><el-button type="primary" plain>发表</el-button></div>
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
            diary: '',
        }
    },
    mounted(){
        console.log(this.$route.query.id);
    },
    methods:{

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