<template>
  <div>
    <!-- 表单控件（栅格化）：用户名，账号，性别（下拉选项），手机号，邮箱，角色（下拉选项），用户状态（按钮） -->
    <el-form ref="form" :model="form" label-width="80px">
      <div class="row">
        <el-form-item label="用户名：" prop="username" class="col mb-2">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="account" class="col mb-2">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender" class="col mb-2">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone" class="col mb-2">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="邮箱：" prop="email" class="col mb-2">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="rule" class="col mb-2">
          <el-select v-model="form.rule" placeholder="请选择">
            <el-option value="普通用户" label="普通用户"></el-option>
            <el-option value="权限管理员" label="权限管理员"></el-option>
            <el-option value="超级管理员" label="超级管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户状态：" prop="status" class="col mb-2">
          <el-radio-group v-model="form.status">
            <el-radio label="正常"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="col mb-2">
          <el-button type="
          " @click="addUser">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 表格控件（无边框，可悬停，有切换页码） -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(val, key) in tableLabel"
        :key="key"
        :prop="key"
        :label="val"
        width="160"
      />

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUser, postUser } from "../api";
export default {
  data() {
    return {
      form: {
        username: "",
        account: "",
        gender: "",
        phone: "",
        email: "",
        rule: "",
        status: "",
      },
      tableLabel: {
        username: "用户名",
        account: "账号",
        gender: "性别",
        phone: "手机号",
        email: "邮箱",
        rule: "角色",
        status: "状态",
      },
      userTable: [],
    };
  },
  methods: {
    addUser() {
      postUser(this.form).then(({ data }) => {
        if (data.code === 404) {
          this.$message.error("添加失败");
        } else {
          this.$message.success("添加成功");
          getUser().then((res) => {
            this.userTable  = res.data.data;
          });
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    handleClick(row) {
      console.log(row);
    },
  },
  mounted() {
    getUser().then((res) => {
      const { userTable } = res.data.data;
      this.tableData = userTable;
    });
  },
  computed:{
    tableData(){
      return this.userTable.map(item=>{
        let rule = '';
      switch (item.rule) {
        case 1:
          rule = '系统管理员';
          break;
        case 2:
          rule = '权限管理员';
          break;
        case 3:
          rule = '用户';
          break;
        default:
          rule = '未知';
          break;
      }
        return {
          ...item,
          gender: item.gender === 1 ? "男" : "女",
          rule: rule,
        }
      })
    }
  }
};
</script>

<style lang="less">
</style>