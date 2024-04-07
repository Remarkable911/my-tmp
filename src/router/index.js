import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.创建路由组件
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Clear from '../views/Clear.vue'
import LinkIn from '../views/LinkIn.vue'
import OrderIn from '../views/OrderIn.vue'
import Predict from '../views/Predict.vue'
import Process from '../views/Process.vue'
import Statistics from '../views/Statistics.vue'
import WeatherIn from '../views/WeatherIn.vue'
import Custom from '../views/Custom.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)
// 2.将路由与组件进行映射
const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: Home
            },
            {
                path: 'user',
                component: User
            },
            {
                path: 'clear',
                component: Clear
            },
            {
                path: 'link',
                component: LinkIn
            },
            {
                path: 'order',
                component: OrderIn
            },
            {
                path: 'predict',
                component: Predict
            },
            {
                path: 'process',
                component: Process
            },
            {
                path: 'statistics',
                component: Statistics
            },
            {
                path: 'weather',
                component: WeatherIn
            },
            {
                path: 'order',
                component: OrderIn
            },
            {
                path: 'custom',
                component: Custom
            }

        ]
    },
    {
        path: '/login',
        component: Login
    },
    

]
// 3.创建路由实例
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router