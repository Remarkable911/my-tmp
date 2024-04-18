<template>
  <div>
    请选择要检查的文件 一个input框 选择要检查的类型（order，link，cross）
    点击按钮
    <br />
    表格显示检查结果（原始信息，异常类型（不合法值，空值，重复值，残缺值）），后面有按钮进行编辑或者删除
    <el-upload
      ref="upload"
      multiple="false"
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选择要检查的文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >检查</el-button
      >
      <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        
      ],
    };
  },
  methods:{
    submitUpload() {
        this.$refs.upload.submit();
      },
  }
};
</script>

<style lang="less">
</style>