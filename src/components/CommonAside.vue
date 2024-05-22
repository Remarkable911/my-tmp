<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#28495A"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>行程时间管理系统</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">
          <i :class="`el-icon-${subItem.icon}`"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 100vh;
}

.el-menu {
  height: 100vh;
  overflow: auto;
  background-color: #28495A;
  
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>

<script>
import Cookie from 'js-cookie';

export default {
  data() {
    return {};
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    // 点击菜单
    clickMenu(item) {
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === '/home' && item.path === '/')
      ) {
        this.$router.push(item.path);
      }
      this.$store.commit('selectTab', item);
      console.log(item)
    },
  },
  computed: {
    // 有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    // 无子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    menuData() {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu;
    },
    activeMenu(){
      return this.$store.state.tab.activeMenu
    }
  },
};
</script>
