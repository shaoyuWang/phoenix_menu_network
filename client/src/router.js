import Vue from 'vue';
import Router from 'vue-router';
import { NotFound, NotPermission, Login } from './views/common';
import {
  Admin,
  User,
  Diary,
  Effect,
  Material,
  UserMenuComment,
  SortKind,
  Step,
  Taste,
  Technology,
  Recipe,
  Role,
  RecipeComment,
  DiaryComment,
  Sort,
  MaterialKind,
} from './views/admin';
import {
  Index,
  RecipeVideo,
  RecipeCooking,
  Navbar,
  ThreeMeals,
  FoodMenu,
  GourmetMaster,
  AllTemplate,
  FoodHealth,
  UserCenter,
  RecipeTemplate,
  DiaryTemplate,
  VideoTemplate,
} from './views/main';

import {
  UserModifyTemplate,
  UserRecipeTemplate,
  UserMenuTemplate,
  UserDiaryTemplate,
  UserCollectTemplate,
  UserAddRecipeTemplate,
} from './components';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound,
      meta: {
        title: '错误页面',
      },
    },
    {
      path: '/',
      redirect: 'request/index',
      meta: {
        title: '首页',
      },
    },
    {
      path: '/nopermisson',
      component: NotPermission,
      meta: {
        title: '无权限',
      },
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/admin',
      component: Admin,
      redirect: 'admin/user',
      children: [
        {
          path: 'user',
          component: User,
          meta: {
            title: '用户管理',
          },
        },
        {
          path: 'role',
          component: Role,
          meta: {
            title: '角色管理',
          },
        },
        {
          path: 'diary',
          component: Diary,
          meta: {
            title: '日记管理',
          },
        },
        {
          path: 'sort',
          component: Sort,
          meta: {
            title: '菜谱种类管理',
          },
        },
        {
          path: 'sortKind',
          component: SortKind,
          meta: {
            title: '菜系分类管理',
          },
        },
        {
          path: 'material',
          component: Material,
          meta: {
            title: '菜谱材料管理',
          },
        },
        {
          path: 'materialKind',
          component: MaterialKind,
          meta: {
            title: '材料分类管理',
          },
        },
        {
          path: 'userMenuComment',
          component: UserMenuComment,
          meta: {
            title: '菜单评论管理',
          },
        },
        {
          path: 'effect',
          component: Effect,
          meta: {
            title: '菜谱功效管理',
          },
        },
        {
          path: 'recipe',
          component: Recipe,
          meta: {
            title: '菜谱管理',
          },
        },
        {
          path: 'step',
          component: Step,
          meta: {
            title: '步骤管理',
          },
        },
        {
          path: 'taste',
          component: Taste,
          meta: {
            title: '口味管理',
          },
        },
        {
          path: 'Technology',
          component: Technology,
          meta: {
            title: '工艺管理',
          },
        },
        {
          path: 'recipeComment',
          component: RecipeComment,
          meta: {
            title: '菜谱评论管理',
          },
        },
        {
          path: 'diaryComment',
          component: DiaryComment,
          meta: {
            title: '日记评论管理',
          },
        },
      ],
    },
    {
      path: '/request',
      component: Navbar,
      redirect: 'request/index',
      children: [
        {
          path: 'index',
          component: Index,
          meta: {
            title: '首页',
          },
        },
        {
          path: 'recipeVideo',
          component: RecipeVideo,
          meta: {
            title: '美食视频',
          },
        },
        {
          path: 'recipeCooking',
          component: RecipeCooking,
          meta: {
            title: '菜谱大全',
          },
        },
        {
          path: 'foodHealth',
          component: FoodHealth,
          meta: {
            title: '饮食健康',
          },
        },
        {
          path: 'threeMeals',
          component: ThreeMeals,
          meta: {
            title: '一日三餐',
          },
        },
        {
          path: 'foodMenu',
          component: FoodMenu,
          meta: {
            title: '美食菜单',
          },
        },
        {
          path: 'gourmetMaster',
          component: GourmetMaster,
          meta: {
            title: '美食达人',
          },
        },
        {
          path: 'allTemplate',
          component: AllTemplate,
          meta: {
            title: '全部',
          },
        },
        {
          path: 'recipeTemplate',
          component: RecipeTemplate,
          meta: {
            title: '菜谱',
          },
        },
        {
          path: 'diaryTemplate',
          component: DiaryTemplate,
          meta: {
            title: '菜谱',
          },
        },
        {
          path: 'videoTemplate',
          component: VideoTemplate,
          meta: {
            title: '视频',
          },
        },
      ],
    },
    {
      path: '/userCenter',
      component: UserCenter,
      redirect: 'userCenter/myInfo',
      children: [
        {
          path: 'myInfo',
          component: UserModifyTemplate,
          meta: {
            title: '用户中心',
          },
        },
        {
          path: 'addRecipe',
          component: UserAddRecipeTemplate,
          meta: {
            title: '添加菜谱',
          },
        },
        {
          path: 'myRecipe',
          component: UserRecipeTemplate,
          meta: {
            title: '我的菜谱',
          },
        },
        {
          path: 'myCollection',
          component: UserCollectTemplate,
          meta: {
            title: '我的收藏',
          },
        },
        {
          path: 'myMenu',
          component: UserMenuTemplate,
          meta: {
            title: '我的菜单',
          },
        },
        {
          path: 'myDiary',
          component: UserDiaryTemplate,
          meta: {
            title: '我的日记',
          },
        },
      ],
    },
  ],
});
