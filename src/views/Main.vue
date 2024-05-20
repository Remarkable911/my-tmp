<template>
  <div>
    <el-container>
      <el-aside width="250px" class="aside-fixed">
        <common-aside />
      </el-aside>
      <el-container class="main-container">
        <el-header class="header-fixed">
          <common-header />
        </el-header>
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'

export default {
  components: {
    CommonAside,
    CommonHeader,
  }
};
</script>

<style lang="less">
.el-header {
  padding: 0;
}

.el-menu {
  border-right: 0;
}

.aside-fixed {
  position: fixed;
  height: 100vh;
  overflow: hidden;
  background-color: #28495A;
}

.main-container {
  margin-left: 250px; /* Same as aside width */
  width: calc(100% - 250px);
}

.main-content {
  height: calc(100vh - 64px); /* Adjust based on the height of the header */
  overflow: auto;
}
</style>
