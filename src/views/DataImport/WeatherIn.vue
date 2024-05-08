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
    <el-form :inline="true" ref="form" :model="form" label-width="80px">
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
import { getWeatherQuery } from "@/api"
export default {
  data() {
    return {
      form: {
        date: "",
      },
      tableLabel: {
        // 日期	天气情况	最高气温	最低气温
        date:"日期",
        weather:"天气情况",
        hightemp:"最高气温",
        lowtemp:"最低气温"
      },
      tableData: [
        {
        date:"2020-09-03",
        weather:"rainstorm",
        hightemp:"28",
        lowtemp:"26"
      }
      ],
    };
  },
  methods:{
    onsubmit(){

    }
  },
  mounted(){
    getWeatherQuery().then(res=>{
      this.tableData = res.data.data
    })
  },
  computed:{
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
  }
};
</script>

<style lang="less">
</style>