import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'
// 1.创建路由组件
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)
// 2.将路由与组件进行映射
const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        name: 'Main',
        children: [
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },

]
// 3.创建路由实例
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 判断Cookie中是否存在token
    const token = Cookie.get('token')
    if (!token && to.name !== 'login') {
        next({
            path: '/login'
        })
    } else if (token && to.name === 'login') {
        next({
            path: '/'
        })
    }
    else{
        next()
    }
})
export default router