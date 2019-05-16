<template>
    <el-col :span="24" class="container">
        <div class="title">
            <span class="title-font">菜单列表</span>
        </div>
        <el-col class="menu">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item :title="item.name" :name='item.id' v-for="item in menuList" :key="item.id">
                    <div class="menu-header">{{item.length}}/10</div>
                    <ul class="recipe">
                        <li class="recipe-item" v-for="item in 9" :key="item"><img src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg"></li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </el-col>
    </el-col>
</template>

<script>
export default {
    props:['list'],
    data(){
        return {
            menuList:[
                { id: 1, name: '菜单1', length: 9,
                    recipes: [ 
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                    ]
                },
                { id: 2, name: '菜单2', length: 9,
                    recipes: [ 
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                    ]
                },
                { id: 3, name: '菜单3', length: 6,
                    recipes: [ 
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                    ]
                },
                { id: 4, name: '菜单4', length: 5,
                    recipes: [ 
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                    ]
                },
                { id: 5, name: '菜单5', length: 4,
                    recipes: [ 
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                    ]
                },
                { id: 6, name: '菜单6', length: 3,
                    recipes: [ 
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                    ]
                },
                { id: 7, name: '菜单7', length: 2,
                    recipes: [ 
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                    ]
                },
                { id: 8, name: '菜单8', length: 1,
                    recipes: [ 
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                        { id:1, name: '你爸爸', },
                    ]
                },
            ],
            activeName:''
        }
    },
    created(){
        // this.menuList = this.list;
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/style.scss';
    .container{
        background-color: white;
        height: 800px;
        .title{
            width: $width100;
            height: $size60;
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
        .menu{
            padding: 20px;
            .menu-header{
                color: rgb(252, 94, 94);
                text-align: right;
            }
            .recipe{
                display: block;
                margin-top: $size10;
                width: auto;
                height: 170px;
                overflow: scroll;
                overflow-x: auto;
                white-space:nowrap;
                .recipe-item{
                    display: inline-block;
                    margin: $size0 $size2;
                    width: 160px;
                    height: 160px;
                }
                img{
                    width: 160px;
                    height: 160px;
                    border-radius: $size5;
                    padding-right: $size1;
                }
                }
        }
    }
</style>

