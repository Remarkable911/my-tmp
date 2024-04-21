export default {
    state:{
        isCollapse:false, //用于控制菜单的展开与收起
        tabList:[{
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
          }]//面包屑 
    },
    mutations:{
        // 修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse =!state.isCollapse
        },
        // 更新面包屑
        selectTab(state,val){
            
            const index=state.tabList.findIndex(item=>item.name===val.name)
            
            if(index===-1){
                state.tabList.pop()
                state.tabList.push(val)
            }
        }
    }
}