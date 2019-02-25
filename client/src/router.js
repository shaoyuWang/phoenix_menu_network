import Vue from 'vue';
import Router from 'vue-router';
import { NotFound, NotPermission, Login } from './views/common'
import { Admin, User, Diary, Effect, Materail, Photo, Sort, Step, Taste, Technology, Recipe, Role, Kind } from './views/admin';
import { Navbar, AllRecipe } from './views/main';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound,
    },
    // {
    //   path: '/',
    //   redirect: '/login',
    // },
    {
      path: '/nopermisson',
      component: NotPermission,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Navbar,
      redirect: '/index',
      children: [
        {
          path: 'index',
          component: RequestList
        },
        {
          path: 'allRecipe',
          component: AllRecipe
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
        },
        {
          path: 'role',
          component: Role,
        },
        {
          path: 'kind',
          component: Kind,
        },
        {
          path: 'diary',
          component: Diary,
        },
        {
          path: 'effect',
          component: Effect,
        },
        {
          path: 'materail',
          component: Materail,
        },
        {
          path: 'photo',
          component: Photo,
        },
        {
          path: 'recipe',
          component: Recipe,
        },
        {
          path: 'sort',
          component: Sort,
        },
        {
          path: 'step',
          component: Step,
        },
        {
          path: 'taste',
          component: Taste,
        },
        {
          path: 'Technology',
          component: Technology,
        },
      ],
    }
  ],
});
