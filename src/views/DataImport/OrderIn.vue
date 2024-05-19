<template>
  <div>
    <div class="grid">
      <span class="">请参考样例格式上传文件</span>
      <el-button type="primary" @click="download">参考样例</el-button>
    </div>
    <el-upload
      ref="upload"
      action="#"
      :before-upload="beforeUpload"
      :http-request="uploadRequest"
      :file-list="fileList"
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传csv文件</div>
    </el-upload>
    <el-button type="primary" @click="submitUpload">上传</el-button>
    <el-form :inline="true" ref="form" :model="form" label-width="80px">
      <el-form-item label="订单时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="orderTable" style="width: 100%">
      <el-table-column
        v-for="(val, key) in tableLabel"
        :key="key"
        :prop="key"
        :label="val"
      />
    </el-table>
  </div>
</template>

<script>
import { getOrderQuery, postOrderQuery, postOrderImport } from "@/api";
import { formatTime } from "@/utils/formatTime";
export default {
  data() {
    return {
      form: {
        date: null,
      },
      fileList: [],
      tableLabel: {
        // 订单编号	真实行程总时间
        // 路线距离	出发时刻平均通行时间
        // 司机编号	出发时刻时间片编号	日期
        orderid: "订单编号",
        ata: "真实行程总时间",
        distance: "路线距离",
        driverid: "司机编号",
        sliceid: "出发时间",
        date: "日期",
      },
      tableData: [
        {
          orderid: "订单编号",
          ata: "真实行程总时间",
          distance: "路线距离",
          driverid: "司机编号",
          sliceid: "出发时刻时间片编号",
          date: "日期",
        },
      ],
    };
  },
  methods: {
    download(){
      this.$message.success("下载成功")
    },
    onSubmit() {
      if (this.form.date) {
        postOrderQuery({ "formatDate": this.formatDate }).then((res) => {
          this.tableData = res.data.data;
        });
      } else {
        this.$message.error("请选择日期");
        getOrderQuery().then((res) => {
          this.tableData = res.data.data;
        });
      }
    },
    beforeUpload(file) {
      this.fileList.push(file);
      return false; // 阻止自动上传
    },
    uploadRequest(option) {
      const formData = new FormData();
      formData.append("orderFile", option.file);
      postOrderImport(formData)
        .then((response) => {
          console.log(response.data);
          this.$message.success("上传成功");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    submitUpload() {
      this.fileList.forEach((file) => {
        this.uploadRequest({ file }); // 手动调用 uploadRequest 方法
      });
    },
  },
  mounted() {
    getOrderQuery().then((res) => {
      this.tableData = res.data.data;
    });
  },
  computed: {
    orderTable() {
      return this.tableData.map((item) => {
        return {
          ...item,
          date: formatTime(item.date),
          create_at: formatTime(item.create_at),
        };
      });
    },
    formatDate() {
      return formatTime(this.form.date);
    },
  },
};
</script>

<style lang="less">
</style>