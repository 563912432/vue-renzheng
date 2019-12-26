import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import home from '@/components/home'
import material from '@/components/material'
import teacher from '@/components/teacher'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: '404',
      path: '/404',
      component:  reslove => {require(['@/components/404'], reslove)}
    },
    // {path: '/parse/:company_id?', name: 'parse', component: index},
    // {path: '/account/:company_id?', name: 'account', component: index},
    {
      path: '/home',
      name: 'home',
      meta: {requireAuth: true},
      component: home,
      children: [
        {path: '/home/indexcertificate',component: reslove => {require(['@/components/subpage/indexcertificate'], reslove)},meta: {requireAuth: true}},
        {path: '/home/check',component: reslove => {require(['@/components/subpage/check'], reslove)},meta: {requireAuth: true}},
        {path: '/home/deduction',component: reslove => {require(['@/components/subpage/deduction-check'], reslove)},meta: {requireAuth: true}},
        {path: '/home/upload',component: reslove => {require(['@/components/subpage/upload'], reslove)},meta: {requireAuth: true}},
        {path: '/home/confirm',component: reslove => {require(['@/components/subpage/confirm'], reslove)},meta: {requireAuth: true}},
        {path: '/home/select',component: reslove => {require(['@/components/subpage/select'], reslove)},meta: {requireAuth: true}},
        {path: '/home/count',component: reslove => {require(['@/components/subpage/count'], reslove)},meta: {requireAuth: true}},
        {path: '/home/info',component: reslove => {require(['@/components/subpage/info'], reslove)},meta: {requireAuth: true}},
      ]
    },
    // { path:'/admin', name:'material', component: material},
    // { path:'/teacher', name:'teacher', component: teacher},
    { path: '/:company_id?', name: 'index', component: index },
  ]
})
