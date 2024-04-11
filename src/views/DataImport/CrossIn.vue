<template>
  <div>
    <div class="grid">
      <span class="">请参考样例格式上传文件</span>
      <el-button type="primary">参考样例</el-button>
    </div>
    <el-upload
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传csv文件</div>
    </el-upload>
    <el-button type="primary">上传</el-button>
    <el-form inline="true" ref="form" :model="form" label-width="80px">
      <el-form-item label="订单编号">
        <el-input v-model="form.orderId"></el-input>
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
export default {
  data() {
    return {
      form: {
        orderId: "",
      },
      tableLabel: {
        // 路口编号	路口通行时间
        // 驶入路口编号	驶出路口编号	订单编号
        orderId: "订单编号",
        crossId: "路口编号",
        crossTime: "路口通行时间",
        inCrossId: "驶入路口编号",
        outCrossId: "驶出路口编号",
      },
      tableData: [
        {
          orderId: "96043",
          crossId: "100059_22577",
          crossTime: "39.0",
          inCrossId: "100059",
          outCrossId: "22577",
        },
      ],
    };
  },
};
</script>

<style lang="less">
</style>