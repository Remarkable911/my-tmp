export default {
    state:{
        isCollapse:false, //用于控制菜单的展开与收起
        title:''
    },
    mutations:{
        // 修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse =!state.isCollapse
        }
    }
}