<template>
    <el-row>
        <el-col class="main" :span="16" :offset="4">
            <div class="title">
                <span class="title-font">红烧牛肉盖饭</span>
            </div>
            <video class="recipe-video" controls="controls" src="../../assets/videos/4340221558310640979.mp4"></video>
            <div class="user-info">
                <div class="header">
                    <img class="user-header" src="../../assets/imgs/8700811558507499433.jpg" />
                </div>
                <div class="info">
                    <span class="username">发表人:&nbsp;&nbsp;user</span>
                    <span class="video-time"><i class="el-icon-date"></i>&nbsp;&nbsp;2018-09-10 19:18:18</span>
                </div>
            </div>
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
            video: '',
        }
    },
    mounted(){
        
    },
    methods:{
        handleVideo(video){
            return require(`../../assets/videos/${video}`);
        },
    }
}
</script>


<style lang="scss" scoped>
    @import '../../styles/style.scss';
    .main{
        text-align: center;
        .title{
            text-align: left;
            border-bottom: 1px solid black;
            .title-font{
                display: inline-block;
                padding: 20px 10px;
                font-size: $font_size2_5;
                font-weight: bold;
            }
        }
        .recipe-video{
            width: 80%;
            margin: 10px;
        }
        .user-info{
            width: 100%;
            background-color: rgba(0, 0, 0, 0.247);
            overflow: hidden;
            .header{
                float: left;
                width: 40%;
                height: 200px;
                text-align: center;
                .user-header{
                    margin: 20px 0;
                    display: inline-block;
                    width: 200px;
                    border-radius: 50%;
                }
                border-right: 1px solid yellow;
            }
            .info{
                float: right;
                width: 60%;
                height: 200px;
                overflow: hidden;
                span{display: block;}
                .username{
                    text-align: left;
                    float: left;
                    line-height: 200px;
                    margin-left: 50px;
                    font-size: $font_size2;
                }
                .video-time{
                    text-align: right;
                    float: right;
                    margin-top: 170px;
                    margin-right: 20px;
                }
            }
        }
    }
</style>

