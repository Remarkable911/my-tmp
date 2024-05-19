<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handlerMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <span
        class="text"
        v-for="item in tag"
        :key="item.path"
        :to="{ path: item.path }"
        >{{ item.label }}</span
      >
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img src="../assets/images/user-default.jpeg" alt="" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{username}}</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  data() {
    return {
    };
  },
  methods: {
    handlerMenu() {
      this.$store.commit("collapseMenu");
    },
    handleClick(command) {
      if (command === "logout") {
        Cookie.remove("token");
        Cookie.remove("menu");
        Cookie.remove("tabList");
        this.$router.push("/login");
      }
    },
  },
  computed: {
    ...mapState({
      tag: (state) => state.tab.tabList,
      usernameRaw: (state) => state.user.driverId,
    }),
    username(){
      if(this.usernameRaw === 1){
        return "系统管理员"
      }else if (this.usernameRaw === 2) {
      return "数据分析员";
    }
    return this.usernameRaw;
    }
  },
  mounted() {
    
  },
};
</script>

<style lang="less">
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-top: 7px;
    }
  }
}
</style>