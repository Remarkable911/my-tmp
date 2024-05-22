<template>
  <div>
    <Download fileName="example_cross.csv"/>
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
      <el-form-item label="路口编号">
        <el-input
          @blur="$trimInput"
          @input="$trimInput"
          v-model="form.crossId"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
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
import { getCrossQuery, postCrossQuery, postCrossImport } from "@/api";
import Download from "@/components/Download";
export default {
  components:{
    Download
  },
  data() {
    return {
      form: {
        crossId: "",
      },
      fileList: [],
      tableLabel: {
        // 路口编号	路口通行时间
        // 驶入路口编号	驶出路口编号	订单编号
        orderid: "订单编号",
        crossid: "路口编号",
        crosstime: "路口通行时间",
        entranceid: "驶入路口编号",
        exitid: "驶出路口编号",
      },
      tableData: [
        {
          orderid: "96043",
          crossid: "100059_22577",
          crosstime: "39.0",
          entranceid: "100059",
          exitid: "22577",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.form.crossId) {
        postCrossQuery({ crossId: this.form.crossId }).then((res) => {
          this.tableData = res.data.data;
        });
      } else {
        this.$message.error("请输入");
        getCrossQuery().then((res) => {
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
      formData.append("crossFile", option.file);
      postCrossImport(formData)
        .then((response) => {
          console.log(response.data);
          this.$message.success(response.data.msg);
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
    getCrossQuery().then((res) => {
      this.tableData = res.data.data;
    });
  },
};
</script>

<style lang="less">
</style>