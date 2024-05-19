import Cookie from "js-cookie"
export default {
    state: {
        isCollapse: false, //用于控制菜单的展开与收起
        tabList: [], //面包屑
        menu: [], //菜单
    },
    mutations: {
        // 修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        selectTab(state, val) {

            const index = state.tabList.findIndex(item => item.name === val.name)

            if (index === -1) {
                state.tabList.pop()
                state.tabList.push(val)
            }
        },
        // 设置menu的数据
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        setUser(state, val) {
            state.username = val
            Cookie.set('username', val)
        },
        // 动态注册路由
        addMenu(state, router) {
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            // console.log(menuArray)
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}