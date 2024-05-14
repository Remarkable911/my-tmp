<template>
  <div>
    <h2>接单提醒：(需要vuex进行跨界面显示)</h2>
    <h5>查询历史：</h5>
    <el-table :data="historyTable" style="width: 100%">
      <el-table-column
        v-for="(val, key) in historyLabel"
        :key="key"
        :prop="key"
        :label="val"
      />
    </el-table>
    <el-button type="primary" class=" mt-6 ">导入订单数据</el-button>
  </div>
</template>

<script>
import { getRecord } from "@/api";
import { formatTime } from '@/utils/formatTime'
export default {
  data() {
    return {
        driverId: 1,
      queryHistory: [],
      historyLabel:{
        entranceLink:"路段起点",
        exitLink:"路段终点",
        "ata":"行程时间",
        time:"日期",
        mode:"方法"
      }
    };
  },
  computed: {
    historyTable(){
      return this.queryHistory.map(item=>{
        return {
          ...item,
          time:formatTime(item.time),
          mode:item.mode===1?"路段估值":"总体估值",
        }
      })
    }
  },
  mounted() {
    getRecord({ driverId: this.driverId }).then((res) => {
      console.log(res.data.data.queryHistory);
      this.queryHistory = res.data.data.queryHistory;
    });
  },
};
</script>


<style scoped>
</style>