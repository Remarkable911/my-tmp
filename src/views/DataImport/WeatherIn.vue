<template>
  <div>
    <div class="grid"></div>
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
      <el-form-item label="时间">
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
import { getWeatherQuery, postWeatherQuery, postWeatherImport } from "@/api";
import { formatTime } from "@/utils/formatTime";
export default {
  data() {
    return {
      form: {
        date: null,
      },
      fileList: [],
      tableLabel: {
        // 日期	天气情况	最高气温	最低气温
        date: "日期",
        weather: "天气情况",
        hightemp: "最高气温",
        lowtemp: "最低气温",
      },
      tableData: [
        {
          date: "2020-09-03",
          weather: "rainstorm",
          hightemp: "28",
          lowtemp: "26",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.form.date) {
        console.log(this.form.date);
        console.log(this.formatDate);
        postWeatherQuery({ formatDate: this.formatDate }).then((res) => {
          this.tableData = res.data.data;
        });
      } else {
        this.$message.error("请选择日期");
        getWeatherQuery().then((res) => {
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
      formData.append("weatherFile", option.file);
      postWeatherImport(formData)
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
    getWeatherQuery().then((res) => {
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