<template>
  <div>
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
      <div class="el-upload__tip" slot="tip">只能上传txt文件</div>
    </el-upload>
    <el-button type="primary" @click="submitUpload">分割文件</el-button>
    
    <div v-if="btnShow" class=" mt-3">
      <el-button type="primary" @click="downloadOrder()">下载order文件</el-button>
    <el-button type="primary" @click="downloadLink()">下载link文件</el-button>
    <el-button type="primary" @click="downloadCross()">下载cross文件</el-button>
    </div>

  </div>
</template>

<script>
import { postSegment, getSegment } from "@/api";
export default {
  data() {
    return {
      fileList: [],
      btnShow: false,
      examType: "",
      fileName: "",
      uploadFile: "",
    };
  },
  methods: {
    beforeUpload(file) {
      this.fileList.push(file);
      return false; // 阻止自动上传
    },
    uploadRequest(option) {
      this.$message.info("上传中...");
      const formData = new FormData();
      formData.append("File", option.file);
      postSegment(formData)
        .then((response) => {
          console.log(response.data);
          this.$message.success(response.data.msg);
          this.uploadFile = response.data.filename;
          this.btnShow = true;
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
    async download() {
      try {
        const response = await getSegment({
          param: this.examType,
          filename: this.uploadFile,
        }); // 替换为实际参数
        console.log(response);
        // 创建一个URL对象并指向Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // 设置下载文件的名称
        link.setAttribute("download", this.examType);
        document.body.appendChild(link);

        // 触发下载
        link.click();

        // 移除URL对象
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading the file", error);
      }
    },
    downloadOrder(){
      this.examType = "order";
      this.download();
    },
    downloadLink(){
      this.examType = "link";
      this.download();
    },
    downloadCross(){
      this.examType = "cross";
      this.download();
    }
  },
};
</script>

<style>
</style>