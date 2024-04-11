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
      <el-form-item label="活动时间">
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
        date: "",
      },
      tableLabel: {
        // 订单编号	真实行程总时间
        // 路线距离	出发时刻平均通行时间
        // 司机编号	出发时刻时间片编号	日期
        orderId:"订单编号",
        realTime:"真实行程总时间",
        routeDistance:"路线距离",
        driverId:"司机编号",
        timeTicket:"出发时刻时间片编号",
        date:"日期",
      },
      tableData: [
        {
        orderId:"订单编号",
        realTime:"真实行程总时间",
        routeDistance:"路线距离",
        driverId:"司机编号",
        timeTicket:"出发时刻时间片编号",
        date:"日期",
      }
      ],
    };
  },
};
</script>

<style lang="less">
</style>