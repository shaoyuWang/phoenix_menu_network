<template>
    <el-col :span="24" class="container">
        <div class="title">
            <span class="title-font">用户中心</span>
        </div>
        <el-form :model="user" class="infomation">
            <el-form-item label="登录账号" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="user.username" placeholder="Please Input Username" :disabled="true" autocomplete="off" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="user.username" type="password" placeholder="Please Input Password" autocomplete="off" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="修改密码" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="user.username" type="password" placeholder="Please Input Password" autocomplete="off" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="确认修改" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="user.username" type="password" placeholder="Please Input Password" autocomplete="off" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="用户名" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="user.username" placeholder="Please Input Name" autocomplete="off" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="user.username" placeholder="Please Input Email" autocomplete="off" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="user.username" placeholder="Please Input Telephone" autocomplete="off" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;">
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
      </el-form>
    </el-col>
</template>

<script>
export default {
    props:['userInfo'],
    data(){
        return {
            user:'',
        }
    },
    created(){
        this.user = this.userInfo;
    },
    methods:{
        submitForm(){

        },
        resetForm(){

        },
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/style.scss';
    .container{
        background-color: white;
        height: 800px;
        .title{
            width: 100%;
            height: 60px;
            background-color: white;
            .title-font{
                display: block;
                color:black;
                font-size: $font_size2;
                letter-spacing: 2px;
                margin-left: 20px;
                line-height: 60px;
                border-bottom: 1px solid rgb(156, 149, 149);
            }
        }
        .infomation{
            margin-top: 40px;
        }
    }
</style>

