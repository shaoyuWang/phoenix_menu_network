<template>
    <el-row class="container">
        <el-col :span="16" :offset="4">
            <el-col :span="14" :offset="2" class="main">
                <div class="title">
                    <span class="title-font">红烧牛肉盖饭</span>
                </div>
                <el-col :span="24" class="recipe-base">
                    <el-col :span="10">
                        <img class="recipe-img" src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg">
                    </el-col>
                    <el-col :span="14" class="info">
                        <ul class="effect">
                            <li class="effect-item" v-for="item in 6" :key="item"><span>舒筋活血</span></li>
                        </ul>
                        <div class="center">
                            <div class="left"><span>工艺</span><span class="font">烤</span></div>
                            <div class="right"><span>难度</span><span class="font">适中</span></div>
                        </div>
                        <div class="bottom">
                            <div class="left"><span>口味</span><span class="font">香辣</span></div>
                            <div class="right"><span>时间</span><span class="font">10分</span></div>
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24" class="recipe-info">
                    <span class="description">
                        外酥里嫩的鱼排，大人孩子都爱吃。自己在家做鱼排，用料更实惠，口口都是鱼肉。不过如果用油炸的做法，不但相对油腻，而且比较费油，油炸过的油倒掉浪费，存放久了容易氧化，食用复炸油对健康也有一定损害
                    </span>
                    <div class="material">
                        <span class="major">主料:</span>
                        <ul class="material-info">
                            <li class="material-item" v-for="item in 6" :key="item">
                                <img src="../../assets/headerbackground.jpg">
                                <span class="name">土豆</span>
                                <span class="quality">100克</span>
                            </li>
                        </ul>
                        <span class="major">辅料:</span>
                        <ul class="material-info">
                            <li class="material-item" v-for="item in 6" :key="item">
                                <img src="../../assets/headerbackground.jpg">
                                <span class="name">土豆</span>
                                <span class="quality">100克</span>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="24" class="step-info">
                    <div class="recipe-name">
                        <span>红烧牛肉盖饭的做法</span>
                    </div>
                    <ul class="step-list">
                        <li class="step-item" v-for="item in 5" :key="item">
                            <span class="step-number">{{item}}.</span>
                            <div class="step">
                                <span class="step-description">这个菜谱非常牛逼。这个步骤贼屌</span>
                                <img class="step-img" src="../../assets/headerbackground.jpg" alt="">
                            </div>
                        </li>
                    </ul>
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
            .recipe-base{
                margin-top: 20px;
                background-color: white;
                box-shadow: 0 0 3px rgba(255, 0, 0, 0.4);
                .recipe-img{
                    display: block;
                    width: 100%;
                }
                .info{
                    .effect{
                        display: block;
                        padding: 20px;
                        width: auto;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.322);
                        overflow: scroll;
                        overflow-x: auto;
                        white-space: nowrap;
                        &::-webkit-scrollbar {display:none};
                        margin-bottom: $size0;
                        .effect-item{
                            display: inline-block;
                            margin: $size0 $size4;
                            width: 80px;
                            text-align: center;
                            span{
                                background-color: rgb(42, 231, 42);
                                border: 1px solid black;
                                padding: 4px;
                                display: block;
                                width: 80px;
                                border-radius: 2px;
                                font-weight: bold;
                            }
                        }
                    }
                    .center{
                        width: 100%;
                        height: 100px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.322);
                        text-align: center;
                        div{ display: inline-block; }
                        span{
                            display: block;
                            color: #909399;
                        }
                        .font{
                            color: #f40;
                            font-size: 24px;
                        }
                        .left{
                            width: 50%;
                            height: 100px;
                            border-right: 1px solid rgba(0, 0, 0, 0.322);
                            padding-top: 30px;
                        }
                        .right{
                            width: 50%;
                            height: 100px;
                            padding-top: 30px;
                        }
                    }
                    .bottom{
                        width: 100%;
                        height: 101px;
                        text-align: center;
                        div{ display: inline-block; }
                        span{
                            display: block;
                            color: #909399;
                        }
                        .font{
                            color: #f40;
                            font-size: 24px;
                        }
                        .left{
                            width: 50%;
                            height: 100px;
                            border-right: 1px solid rgba(0, 0, 0, 0.322);
                            padding-top: 30px;
                            
                        }
                        .right{
                            width: 50%;
                            height: 100px;
                            padding-top: 30px;
                        }
                    }
                }
            }
            .recipe-info{
                margin-top: $size10;
                width: $width100;
                background-color: white;
                box-shadow: 0 0 3px rgba(255, 0, 0, 0.4);
                .description{
                    display: block;
                    padding: $size20;
                    font-size: $font_size1_5;
                    color: #606266;
                    line-height: 20px;
                    text-indent: 2rem;
                }
                .material{
                    padding-left: 20px;
                    font-size: 14px;
                    .material-info{
                        display: block;
                        padding: 20px;
                        width: auto;
                        overflow: scroll;
                        overflow-x: auto;
                        white-space: nowrap;
                        &::-webkit-scrollbar {display:none};
                        margin-bottom: $size0;
                        .material-item{
                            display: inline-block;
                            width: 240px;
                            height: 100px;
                            border-right: 1px solid rgba(0, 0, 0, 0.322);
                            border-bottom: 1px solid rgba(0, 0, 0, 0.322);
                            margin: 0 5px;
                            overflow: hidden;
                            img{ display: inline-block; padding: 10px; width: 50%; height: 100%;}
                            span{display: inline-block;}
                            .name{color:#f40;}
                            .quality{ width: 30%; color: #909399; text-align: right;}
                        }
                    }
                    .major{
                        display: block;
                        font-size: 22px;
                        padding: 10px 0;
                        border-bottom: 1px solid black;
                    }
                }
            }
            .step-info{
                margin-top: 20px;
                box-shadow: 0 0 3px rgba(255, 0, 0, 0.4);
                background-color: white;
                overflow: hidden;
                ul,li{list-style: none;}
                .recipe-name{
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.137);
                    span{ display: block; font-size: 22px; padding-left: 20px;}
                }
                .step-list{
                    .step-item{
                        width: 100%;
                        padding: 10px 0;
                        overflow: hidden;
                        span{display: block;}
                        .step-number{
                            float: left;
                            font-size: 30px;
                            width: 80px;
                            color: #f40;
                            text-align: center;
                        }
                        .step{
                            float: left;
                            .step-description{
                                font-size: 14px;
                                padding: 10px 0;
                                color: rgba(0, 0, 0, 0.267);
                            }
                            .step-img{
                                display: block;
                                width: 500px;
                                height: 300px;
                            }
                        }
                    }
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
        }
    }
</style>


