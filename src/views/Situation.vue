<template>
  <div>
    <el-card class=" mb-4">
      路段
      <span v-for="(item, key) in linkFlow" :key="key">
        {{ item.linkid }},
      </span>
      车流量较多，注意安全
    </el-card>
    <el-card class=" mb-4">
      路段<span v-for="(item, key) in linkTime" :key="key">
        {{ item.linkid }}, </span
      >通行时间较长，推荐绕行
    </el-card>
    <el-card class=" mb-4">
      路口<span v-for="(item, key) in crossTime" :key="key">
        {{ item.crossid }}, </span
      >通行时间较长，推荐绕行
    </el-card>
    <el-card class=" mb-4">
      用户<span v-for="(item, key) in driverRun" :key="key">
        {{ item.driverid }}, </span
      >上传行程较多，即将获得数据分析员资格
    </el-card>
    <el-card class=" mb-4">
      行程<span v-for="(item, key) in disOrder" :key="key">
        {{ item.orderid }}, </span
      >距离较长， <br />用户
      <span v-for="(item, key) in disOrder" :key="key">
        {{ item.driverid }},
      </span>
      切勿疲劳驾驶
    </el-card>
  </div>
</template>

<script>
import { getStatistics } from "../api";
export default {
  data() {
    return {};
  },
  computed: {
    statisticsData() {
      return JSON.parse(sessionStorage.getItem("statisticsData"));
    },
    linkFlow() {
      return this.statisticsData.linkFlowTable.desc;
    },
    linkTime() {
      return this.statisticsData.linkTimeTable.desc;
    },
    crossTime() {
      return this.statisticsData.crossTimeTable.desc;
    },
    driverRun() {
      return this.statisticsData.driverRunTable.desc;
    },
    disOrder() {
      return this.statisticsData.disOrderTable.desc;
    },
  },
  mounted() {
    if (!sessionStorage.getItem("statisticsData")) {
      // 如果不存在，则获取数据并存储到sessionStorage中
      getStatistics().then((res) => {
        const statisticsData = res.data.data;
        // 存储到sessionStorage中
        sessionStorage.setItem(
          "statisticsData",
          JSON.stringify(statisticsData)
        );
      });
    }
  },
};
</script>

<style>
</style>