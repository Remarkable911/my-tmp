<template>
  <div>
    <div class="grid">
      <span class="">请参考样例格式上传文件</span>
      <el-button type="primary">参考样例</el-button>
    </div>
    <el-upload drag :action="orderUploadPath" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传csv文件</div>
    </el-upload>
    <el-button type="primary">上传</el-button>
    <el-form :inline="true" ref="form" :model="form" label-width="80px">
      <el-form-item label="活动时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          :value="form.date"
          @input="updateDate"
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
import { getOrderQuery } from "@/api";
export default {
  data() {
    return {
      form: {
        date: null,
        formattedDate: null,
        orderUploadPath: "http://127.0.0.1:5000/import/order",
      },
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
    updateDate(value) {
      // 将选择的日期更新到 form.date
      this.form.date = value;
      // 获取日期字符串
      const dateStr = this.form.date;
      // 将日期字符串转换为 Date 对象
      const dateObj = new Date(dateStr);
      // 获取年、月、日信息
      const year = dateObj.getFullYear();
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
      const day = ("0" + dateObj.getDate()).slice(-2);
      // 拼接成格式化后的日期字符串
      this.form.formattedDate = `${year}-${month}-${day}`;
    },
    onSubmit() {},
  },
  mounted() {
    getOrderQuery().then((res) => {
      this.tableData = res.data.data;
    });
  },
  computed: {
    orderTable() {
      return this.tableData.map((item) => {
        // 将日期字符串转换为 Date 对象
        const dateObj = new Date(item.date);
        const create_at = new Date(item.create_at);
        // 获取年、月、日
        const dateYear = dateObj.getFullYear();
        const dateMonth = ("0" + (dateObj.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1，并且保证两位数格式
        const dateDay = ("0" + dateObj.getDate()).slice(-2); // 保证两位数格式
        const createYear = create_at.getFullYear();
        const createMonth = ("0" + (create_at.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1，并且保证两位数格式
        const createDay = ("0" + create_at.getDate()).slice(-2); // 保证两位数格式
        // 拼接成日期格式字符串
        const formattedDate = `${dateYear}-${dateMonth}-${dateDay}`;
        const createFormattedDate = `${createYear}-${createMonth}-${createDay}`;

        return {
          ...item,
          date: formattedDate,
          create_at: createFormattedDate,
        };
      });
    },
  },
};
</script>

<style lang="less">
</style>