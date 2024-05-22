<template>
  <div>
    <div class="manage">
      <el-dialog
        title="编辑用户"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form
          :inline="true"
          ref="editForm"
          :model="editForm"
          :rules="userRule"
          label-width="80px"
        >
          <el-row>
            <el-form-item label="账号：" prop="driverid">
              <el-input
                @blur="$trimInput"
                @input="$trimInput"
                v-model="editForm.driverid"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名：" prop="username" class="col">
                <el-input
                  @blur="$trimInput"
                  @input="$trimInput"
                  v-model="editForm.username"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="gender" class="col">
                <el-radio-group v-model="editForm.gender">
                  <el-radio value="1" label="男"></el-radio>
                  <el-radio value="2" label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号：" prop="phone">
                <el-input
                  @blur="$trimInput"
                  @input="$trimInput"
                  v-model="editForm.phone"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="email">
                <el-input
                  @blur="$trimInput"
                  @input="$trimInput"
                  v-model="editForm.email"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="角色：" prop="rule">
                <el-select v-model="editForm.rule" placeholder="请选择">
                  <el-option value="1" label="普通用户"></el-option>
                  <el-option value="2" label="数据管理员"></el-option>
                  <el-option value="3" label="系统管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态：" prop="status">
                <el-radio-group v-model="editForm.status">
                  <el-radio value="1" label="正常"></el-radio>
                  <el-radio value="2" label="禁用"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="editSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 表单控件（栅格化）：用户名，账号，性别（下拉选项），手机号，邮箱，角色（下拉选项），用户状态（按钮） -->
    <el-form ref="form" :model="form" :rules="userRule" label-width="80px">
      <div class="row">
        <el-form-item label="用户名：" prop="username" class="col mb-2">
          <el-input
            @blur="$trimInput"
            @input="$trimInput"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="driverid" class="col mb-2">
          <el-input
            @blur="$trimInput"
            @input="$trimInput"
            v-model="form.driverid"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender" class="col mb-2">
          <el-radio-group v-model="form.gender">
            <el-radio value="1" label="男"></el-radio>
            <el-radio value="2" label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone" class="col mb-2">
          <el-input
            @blur="$trimInput"
            @input="$trimInput"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
      </div>
      <div class="row mt-4">
        <el-form-item label="邮箱：" prop="email" class="col mb-2">
          <el-input
            @blur="$trimInput"
            @input="$trimInput"
            v-model="form.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="rule" class="col mb-2">
          <el-select v-model="form.rule" placeholder="请选择">
            <el-option value="1" label="普通用户"></el-option>
            <el-option value="2" label="数据管理员"></el-option>
            <el-option value="3" label="系统管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态：" prop="status" class="col mb-2">
          <el-radio-group v-model="form.status">
            <el-radio value="1" label="正常"></el-radio>
            <el-radio value="2" label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="col mb-2">
          <el-button type="primary" @click="addUser">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 表格控件（无边框，可悬停，有切换页码） -->
    <el-table :data="tableData" class="mt-2" style="width: 100%">
      <el-table-column
        v-for="(val, key) in tableLabel"
        :key="key"
        :prop="key"
        :label="val"
        width="155"
      />

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="editClick(scope.row)" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteClick(scope.row)" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUser, postUser, putUser, deleteUser } from "../api";
export default {
  data() {
    return {
      form: {
        username: "",
        driverid: "",
        gender: "",
        phone: "",
        email: "",
        rule: "",
        status: "",
      },
      editForm: {
        username: "",
        driverid: "",
        gender: "",
        phone: "",
        email: "",
        rule: "",
        status: "",
      },
      tableLabel: {
        username: "用户名",
        driverid: "账号",
        gender: "性别",
        phone: "手机号",
        email: "邮箱",
        rule: "角色",
        status: "状态",
      },
      userTable: [],
      userRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        driverid: [{ required: true, message: "请输入账号", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        rule: [{ required: true, message: "请选择角色", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      dialogVisible: false,
    };
  },
  methods: {
    getList() {
      getUser().then((res) => {
        this.userTable = res.data.data.userTable;
      });
    },
    addUser() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          postUser(this.form).then(({ data }) => {
            if (data.code === 404) {
              this.$message.error("添加失败,账号重复");
            } else {
              this.$message.success("添加成功");
              this.$refs.form.resetFields();
              getUser().then((res) => {
                this.userTable = res.data.data.userTable;
              });
            }
          });
        }
      });
    },
    handleClose() {
      this.$refs.editForm.resetFields();
      this.dialogVisible = false;
    },
    editSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          putUser(this.editForm).then((data) => {
            if (data.code === 404) {
              this.$message.error("修改失败");
            } else {
              this.$message.success("修改成功");
              this.getList();
            }
            this.dialogVisible = false;
          });
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    editClick(row) {
      this.dialogVisible = true;
      this.editForm = JSON.parse(JSON.stringify(row));
    },
    deleteClick(row) {
      let driverid = { driverid: row.driverid };
      driverid = JSON.stringify(driverid);
      deleteUser(driverid).then((data) => {
        if (data.code === 404) {
          this.$message.error("删除失败");
        } else {
          this.$message.success("删除成功");
          this.getList();
        }
      });
    },
    cancel() {
      this.handleClose();
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.getList();
  },
  computed: {
    tableData() {
      return this.userTable.map((item) => {
        let rule = "";

        switch (item.rule) {
          case 1:
            rule = "用户";
            break;
          case 2:
            rule = "权限管理员";
            break;
          case 3:
            rule = "系统管理员";
            break;
          default:
            rule = "未知";
            break;
        }
        return {
          ...item,
          gender: item.gender === 1 ? "男" : "女",
          status: item.status === 1 ? "正常" : "禁用",
          rule,
        };
      });
    },
  },
};
</script>

<style lang="less">
</style>