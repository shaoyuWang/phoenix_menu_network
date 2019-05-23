<template>
    <el-col :span="24" class="container">
        <div class="title">
            <span class="title-font">用户中心</span>
        </div>
        <el-form :model="form" class="infomation">
            <el-form-item label="用户名" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="form.name" placeholder="Please Input Name" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="form.email" placeholder="Please Input Email" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" label-width="120px" style="padding: 10px 0;">
                <el-input v-model="form.phone" placeholder="Please Input Telephone" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="头像" label-width="120px" style="padding: 10px 0;">
                <el-upload class="upload-demo" action="/upload/img" name="file"
                    list-type="picture" :limit="1" :on-success="handleSuccess" :on-exceed="onExceed" :before-upload="beforeUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/jepg文件，且不超过2m</div>
                </el-upload>
            </el-form-item>
            <el-form-item style="text-align:center;">
                <el-button type="success" @click="submit()">修改</el-button>
                <el-button type="primary" @click="reset()">重置</el-button>
            </el-form-item>
      </el-form>
    </el-col>
</template>

<script>
export default {
    data(){
        return {
            user: '',
            form: {
                name: '',
                email: '',
                phone: '',
                photo: '8700811558507499433.jpg',
            }
        }
    },
    created(){
        this.getUser();
    },
    methods:{
        // 图片上传方法
        //文件上传成功的钩子函数
        handleSuccess(res, file) {
            this.$message({ type: "success", message: "图片上传成功" });
            const pathList = _.split(res.writeImage.path, "/");
            this.form.photo = pathList[ pathList.length - 1 ];
            console.log(this.form.photo);
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
        submit(){
            // 邮箱格式正则
            let emailValidation = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            let data ={
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone,
                photo: this.form.photo,
            };
            console.log(data);
            if( _.isEmpty(data.name) || _.isEmpty(data.email) || _.isEmpty(data.phone)){ 
                this.$message({ message: '请输入全部信息', type: 'warning' }); 
                return false;
            };
                // 验证邮箱格式
            if(!emailValidation.test(data.email)){ 
                this.$message({ message: '邮箱格式错误', type: 'warning' }); 
                return false;
            }
            this.$axios({
                url: `/main/userCenter/updateUser/${this.user.id}`,
                method: 'post',
                data,
            }).then(res=>{
                if(res.data.code == 200){
                    this.getUser();
                    this.$message({ message: '更新用户成功', type: 'success'});
                }
            });
        },
        reset(){
            this.copyUser();
        },
        copyUser(){
            this.form.name = this.user.name;
            this.form.email = this.user.email;
            this.form.phone = this.user.phone;
        },
        getUser(){
            let userId = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user')).id;
            if(userId != ''){
                this.$axios({
                    url: `/main/userCenter/findUserById/${userId}`,
                    method: 'get',
                }).then(res=>{
                    if(res.data.code == 200){
                        this.user = res.data.data.user;
                        console.log(this.user);
                        this.copyUser();
                    }
                });
            }else{
                this.$message.error({ message: '请登录'});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/style.scss';
    .container{
        background-color: white;
        height: 1200px;
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

