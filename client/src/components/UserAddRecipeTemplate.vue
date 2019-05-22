<template>
    <el-col :span="24" class="container">
        <div class="title">
            <span class="title-font">添加菜谱</span>
        </div>
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
    </el-col>
</template>

<script>
export default {
    data(){
        return {
            user: '',
            material: [],
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
        }
    },
    created(){
        this.user = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user'));
        this.getBaseInfo();
    },
    methods:{
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
        submit(){
            let taste = _.filter(this.baseInfo.tastes, { id: this.form.tasteId});
            let technology = _.filter(this.baseInfo.technologys, { id: this.form.technologyId});
            let sort = _.filter(this.baseInfo.sorts, { id: this.form.sortId});
            let effects = [];
            _.forEach(this.form.effect, item=>{
                let effect = _.filter(this.baseInfo.effects, {id: _.toNumber(item)});
                effects.push(effect[0]);
            })
            let data = {
                name: this.form.name,
                evaluate: this.form.evaluate,
                timeType: this.form.timeType,
                level: this.form.level,
                time: _.toNumber(this.form.time),
                technology: technology[0],
                taste: taste[0],
                sort: sort[0],
                effects,
                finishPhoto:'1244871558486759794.jpg',
                majorMaterials: this.form.majorMaterials,
                auxiliaryMaterials: this.form.auxiliaryMaterials,
                steps: [],
                user: this.user,
            }
            console.log(data);
            this.$axios({
                url: `/main/userCenter/saveRecipe`,
                method: 'post',
                data,
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({ message: '添加菜谱成功', type: 'success'});
                    this.cancelForm();
                }
            });
        },
        cancelForm(){
            this.form.name = '';
            this.form.evaluate = '';
            this.form.timeType = '';
            this.form.level = '';
            this.form.time = '';
            this.form.technologyId = '';
            this.form.tasteId = '';
            this.form.sortId = '';
            this.form.effect = [];
            this.form.majorMaterials = [];
            this.form.auxiliaryMaterials = [];
            this.form.steps = [];
        },
        getBaseInfo(){
            this.$axios({
                url: `/main/userCenter/getRecipeBaseInfo`,
                method: 'get',
            }).then(res=>{
                if(res.data.code == 200){
                    this.baseInfo = res.data.data;
                }
            });
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

