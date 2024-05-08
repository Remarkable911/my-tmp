<template>
  <div class="flex flex-col items-center h-screen bg-slate-200">
    <h2 class="text-center mt-20">欢迎使用行程管理时间系统</h2>
    <el-card class="mt-8">
      <el-form
        :inline="true"
        class="flex flex-col item-center px-16"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
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
        <el-button class="mx-16" type="primary" @click.native.prevent="login"
          >登录</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { postLogin } from "../api";
import Cookie from 'js-cookie';
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
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          postLogin(this.loginForm).then(({data})=>{
            // console.log(data)
            if(data.code === 404){
              this.$message.error("登录失败")
            }
            else if(data.data.status === 2){
              this.$message.error("该用户已被禁用")
            }
            else{
              Cookie.set('token', data.data.token)
              this.$store.commit('setMenu',data.data.menu)
              this.$store.commit('addMenu', this.$router)
              this.$store.commit('setUser', data.data.username)
              if (data.data.rule === 1){
                this.$router.push('/home')
              }
              else if (data.data.rule === 2){
                this.$router.push('/statistics')
              }
              else{
                this.$router.push('/user')
              }
            }
          })
        }
      });
    },
  },
  mounted() {
  }
};
</script>

<style>
</style>