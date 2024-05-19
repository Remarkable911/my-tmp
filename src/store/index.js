// 创建Vuex中最核心的store
import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        user,
    },
    plugins: [createPersistedState()],
})