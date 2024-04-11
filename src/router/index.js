import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'
// 1.创建路由组件
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Abnormal from '../views/DataClear/Abnormal.vue'
import Merge from '../views/DataClear/Merge.vue'
import Kmeans from '../views/DataClear/Kmeans.vue'
import LinkIn from '../views/DataImport/LinkIn.vue'
import OrderIn from '../views/DataImport/OrderIn.vue'
import Predict from '../views/Predict.vue'
import Process from '../views/Process.vue'
import Statistics from '../views/Statistics.vue'
import WeatherIn from '../views/DataImport/WeatherIn.vue'
import Cross from '../views/DataImport/CrossIn.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)
// 2.将路由与组件进行映射
const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [{
                path: 'home',
                name: 'home',
                component: Home
            },
            {
                path: 'user',
                name: 'user',
                component: User
            },
            {
                path: 'abnormal',
                name: 'abnormal',
                component: Abnormal
            },
            {
                path: 'merge',
                name: 'merge',
                component: Merge
            },
            {
                path: 'kmeans',
                name: 'kmeans',
                component: Kmeans
            },
            {
                path: 'link',
                name: 'link',
                component: LinkIn
            },
            {
                path: 'order',
                name: 'order',
                component: OrderIn
            },
            {
                path: 'predict',
                name: 'predict',
                component: Predict
            },
            {
                path: 'process',
                name: 'process',
                component: Process
            },
            {
                path: 'statistics',
                name: 'statistics',
                component: Statistics
            },
            {
                path: 'weather',
                name: 'weather',
                component: WeatherIn
            },
            {
                path: 'order',
                name: 'order',
                component: OrderIn
            },
            {
                path: 'cross',
                name: 'cross',
                component: Cross
            }

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