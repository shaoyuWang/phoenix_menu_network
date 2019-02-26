import Vue from 'vue';
import Router from 'vue-router';
import { NotFound, NotPermission, Login } from './views/common'
import { Admin, User, Diary, Effect, Materail, Photo, Sort, Step, Taste, Technology, Recipe, Role, Kind } from './views/admin';
import {Index, HotRecommend, AllRecipe, Navbar, HealthFood, FoodMenu, GourmetMaster} from './views/main';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound,
      meta: {
        title: '错误页面'
      }
    },
    {
      path: '/',
      redirect: 'request/index',
      meta: {
        title: '首页'
      }
    },
    {
      path: '/nopermisson',
      component: NotPermission,
      meta: {
        title: '无权限'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/request',
      component: Navbar,
      children: [
        {
          path: 'index',
          component: Index,
          meta: {
            title: '首页'
          }
        },
        {
          path: 'hotRecommend',
          component: HotRecommend,
          meta: {
            title: '热点推荐'
          }
        },
        {
          path: 'allRecipe',
          component: AllRecipe,
          meta: {
            title: '菜谱大全'
          }
        },
        {
          path: 'healthFood',
          component: HealthFood,
          meta: {
            title: '健康饮食'
          }
        },
        {
          path: 'foodMenu',
          component: FoodMenu,
          meta: {
            title: '美食菜单'
          }
        },
        {
          path: 'gourmetMaster',
          component: GourmetMaster,
          meta: {
            title: '美食达人'
          }
        },
      ]
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
            title: '用户管理'
          }
        },
        {
          path: 'role',
          component: Role,
          meta: {
            title: '角色管理'
          }
        },
        {
          path: 'kind',
          component: Kind,
          meta: {
            title: '种类管理'
          }
        },
        {
          path: 'diary',
          component: Diary,
          meta: {
            title: '日记管理'
          }
        },
        {
          path: 'effect',
          component: Effect,
          meta: {
            title: '效果管理'
          }
        },
        {
          path: 'materail',
          component: Materail,
          meta: {
            title: '材料管理'
          }
        },
        {
          path: 'photo',
          component: Photo,
          meta: {
            title: '照片管理'
          }
        },
        {
          path: 'recipe',
          component: Recipe,
          meta: {
            title: '菜谱管理'
          }
        },
        {
          path: 'sort',
          component: Sort,
          meta: {
            title: '分类管理'
          }
        },
        {
          path: 'step',
          component: Step,
          meta: {
            title: '步骤管理'
          }
        },
        {
          path: 'taste',
          component: Taste,
          meta: {
            title: '口味管理'
          }
        },
        {
          path: 'Technology',
          component: Technology,
          meta: {
            title: '工艺管理'
          }
        },
      ],
    }
  ],
});
