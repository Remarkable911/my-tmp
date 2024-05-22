<template>
  <div>
    <div class="grid">
      <span class="">请参考样例格式上传文件</span>
      <el-button type="primary" @click="download">参考样例</el-button>
    </div>
  </div>
</template>

<script>
import { getDownload } from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    fileName:{
      type:String,
      required:true,
    }
  },
  computed: {
    ...mapState({
      examType: (state) => state.tab.tabList[0].name,
    }),
  },
  methods: {
    async download() {
      try {
        const response = await getDownload({ param: this.examType }); // 替换为实际参数

        // 创建一个URL对象并指向Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // 设置下载文件的名称
        link.setAttribute("download",this.fileName);
        document.body.appendChild(link);

        // 触发下载
        link.click();

        // 移除URL对象
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading the file", error);
      }
    },
  },
};
</script>

<style lang="less">
</style>