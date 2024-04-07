<template>
  <div class="flex flex-col items-center h-screen bg-slate-200">
    <h2 class="text-center mt-20">欢迎使用行程管理时间系统</h2>
    <el-card class="mt-8">
      <el-form
        :inline="true"
        class="flex flex-col item-center px-16"
        :model="loginForm"
        :rules="loginRules"
      >
        <span class="loginTitle text-center mb-4 text-lg">登录页面</span>
        <el-form-item label="用户名:" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item class="ml-3" label="密码:" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
          <el-button class="mx-16" type="primary" @click.native.prevent="login">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Mock from "mockjs";
export default {
  data() {
    
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 登录
    login() {
      // token信息
      const token = Mock.Random.guid();
      console.log(token);
    },
  },
};
</script>

<style>

</style>