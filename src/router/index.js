import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: '/',
//       component: AppLayout,
//       children: [
//         {
//           path: '/',
//           name: 'dashboard',
//           component: () => import('@/views/Dashboard.vue')
//         },
//         {
//           path: '/uikit/formlayout',
//           name: 'formlayout',
//           component: () => import('@/views/uikit/FormLayout.vue')
//         },
//         {
//           path: '/uikit/input',
//           name: 'input',
//           component: () => import('@/views/uikit/Input.vue')
//         },
//         {
//           path: '/uikit/floatlabel',
//           name: 'floatlabel',
//           component: () => import('@/views/uikit/FloatLabel.vue')
//         },
//         {
//           path: '/uikit/invalidstate',
//           name: 'invalidstate',
//           component: () => import('@/views/uikit/InvalidState.vue')
//         },
//         {
//           path: '/uikit/button',
//           name: 'button',
//           component: () => import('@/views/uikit/Button.vue')
//         },
//         {
//           path: '/uikit/table',
//           name: 'table',
//           component: () => import('@/views/uikit/Table.vue')
//         },
//         {
//           path: '/uikit/list',
//           name: 'list',
//           component: () => import('@/views/uikit/List.vue')
//         },
//         {
//           path: '/uikit/tree',
//           name: 'tree',
//           component: () => import('@/views/uikit/Tree.vue')
//         },
//         {
//           path: '/uikit/panel',
//           name: 'panel',
//           component: () => import('@/views/uikit/Panels.vue')
//         },
//
//         {
//           path: '/uikit/overlay',
//           name: 'overlay',
//           component: () => import('@/views/uikit/Overlay.vue')
//         },
//         {
//           path: '/uikit/media',
//           name: 'media',
//           component: () => import('@/views/uikit/Media.vue')
//         },
//         {
//           path: '/uikit/menu',
//           component: () => import('@/views/uikit/Menu.vue'),
//           children: [
//             {
//               path: '/uikit/menu',
//               component: () => import('@/views/uikit/menu/PersonalDemo.vue')
//             },
//             {
//               path: '/uikit/menu/seat',
//               component: () => import('@/views/uikit/menu/SeatDemo.vue')
//             },
//             {
//               path: '/uikit/menu/payment',
//               component: () => import('@/views/uikit/menu/PaymentDemo.vue')
//             },
//             {
//               path: '/uikit/menu/confirmation',
//               component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
//             }
//           ]
//         },
//         {
//           path: '/uikit/message',
//           name: 'message',
//           component: () => import('@/views/uikit/Messages.vue')
//         },
//         {
//           path: '/uikit/file',
//           name: 'file',
//           component: () => import('@/views/uikit/File.vue')
//         },
//         {
//           path: '/uikit/charts',
//           name: 'charts',
//           component: () => import('@/views/uikit/Chart.vue')
//         },
//         {
//           path: '/uikit/misc',
//           name: 'misc',
//           component: () => import('@/views/uikit/Misc.vue')
//         },
//         {
//           path: '/blocks',
//           name: 'blocks',
//           component: () => import('@/views/utilities/Blocks.vue')
//         },
//         {
//           path: '/utilities/icons',
//           name: 'icons',
//           component: () => import('@/views/utilities/Icons.vue')
//         },
//         {
//           path: '/pages/timeline',
//           name: 'timeline',
//           component: () => import('@/views/pages/Timeline.vue')
//         },
//         {
//           path: '/pages/empty',
//           name: 'empty',
//           component: () => import('@/views/pages/Empty.vue')
//         },
//         {
//           path: '/pages/crud',
//           name: 'crud',
//           component: () => import('@/views/pages/Crud.vue')
//         },
//         {
//           path: '/documentation',
//           name: 'documentation',
//           component: () => import('@/views/utilities/Documentation.vue')
//         }
//       ]
//     },
//     {
//       path: '/landing',
//       name: 'landing',
//       component: () => import('@/views/pages/Landing.vue')
//     },
//     {
//       path: '/pages/notfound',
//       name: 'notfound',
//       component: () => import('@/views/pages/NotFound.vue')
//     },
//
//     {
//       path: '/auth/login',
//       name: 'login',
//       component: () => import('@/views/pages/auth/Login.vue')
//     },
//     {
//       path: '/auth/access',
//       name: 'accessDenied',
//       component: () => import('@/views/pages/auth/Access.vue')
//     },
//     {
//       path: '/auth/error',
//       name: 'error',
//       component: () => import('@/views/pages/auth/Error.vue')
//     }
//   ]
// });

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: AppLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/pages/auth/Login.vue'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: AppLayout,
    redirect: '/index',
    meta: { title: '首页' },
    children: [
      {
        path: '/index',
        component: () => import('@/views/Dashboard.vue'),
        name: 'Index',
        meta: { title: '看板', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: AppLayout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
];
// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: AppLayout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: AppLayout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: AppLayout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: AppLayout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: AppLayout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});
export default router;
