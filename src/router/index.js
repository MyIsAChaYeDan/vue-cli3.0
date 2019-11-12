import Vue from 'vue'
import Router from 'vue-router'
import childRouter from '@/components/childRouter'
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/layout', //最大的父组件
      name: 'layout',
      component: () => import('@/components/layout'),
      meta:{title:'首页'},
      children:[
        {
          path: '/strategyManage',
          name: 'strategyManage',
          meta:{title:'策略管理',code:'1'},
          component: childRouter,
          icon:'el-icon-view',
          children:[
            {
              path: '/strategyManageList',
              name: 'strategyManageList',
              meta:{title:'策略管理列表',code:'1-1'},
              component: () => import('@/components/strategyManage/strategyManageList'),
              hidden:false,
              code:'1-1',
            },
            {
              path: '/strategyAdd',
              name: 'strategyAdd',
              meta:{title:'添加策略',code:'1-2'},
              component: () => import('@/components/strategyManage/strategyAdd'),
              hidden:true,
              code:'1-2',
            },
            {
              path: '/strategyEdit',
              name: 'strategyEdit',
              meta:{title:'编辑策略',code:'1-3'},
              component: () => import('@/components/strategyManage/strategyAdd'),
              hidden:true,
            },
            {
              path: '/updateStrategy',
              name: 'updateStrategy',
              meta:{title:'更新策略',code:'1-4'},
              component: () => import('@/components/strategyManage/updateStrategy'),
              hidden:true,
            },
          ]
        },
        {
          path: '/templateManage',
          name: 'templateManage',
          meta:{title:'模板管理',code:'2'},
          component: childRouter,
          icon:'el-icon-tickets',
          children:[
            {
              path: '/templateManageList',
              name: 'templateManageList',
              meta:{title:'模板管理列表',code:'2-1'},
              component: () => import('@/components/templateManage/templateManageList'),
              hidden:false,
              code:'2-1',
            },
            {
              path: '/templateAdd',
              name: 'templateAdd',
              meta:{title:'添加模板',code:'2-2'},
              component: () => import('@/components/templateManage/templateAdd'),
              hidden:true,
              code:'2-2',
            },
            {
              path: '/templateEdit',
              name: 'templateEdit',
              meta:{title:'编辑模板',code:'2-3'},
              component: () => import('@/components/templateManage/templateAdd'),
              hidden:true,
            },
          ]
        },
        {
          path: '/messageLog',
          name: 'messageLog',
          meta:{title:'消息日志',code:'3',},
          component: childRouter,
          icon:'el-icon-bell',
          children:[
            {
              path: '/messageLogList',
              name: 'messageLogList',
              meta:{title:'消息日志列表',code:'3-1'},
              component: () => import('@/components/messageLog/messageLogList'),
              hidden:false,
            },
            // {
            //   path: '/messageLogCount',
            //   name: 'messageLogCount',
            //   meta:{title:'消息日志统计',code:'3-2'},
            //   component: () => import('@/components/messageLog/messageLogCount'),
            //   hidden:false,
            // }
          ]
        },
      ]
    },
    {
      path: '/', //
      name: 'Login',
      component: () => import('@/components/Login'),
      meta:{title:'登录'},
    }
  ]
})
