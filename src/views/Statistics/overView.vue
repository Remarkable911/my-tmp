<template>
  <div>
    <div class="row mb-4">
      <el-card body-style="padding:0px " class="col">
        <div ref="linkTime" class="net bg-slate-300"></div>
      </el-card>
      <el-card body-style="padding:0px" class="col">
        <div ref="crossTime" class="net bg-slate-300"></div>
      </el-card>
    </div>
    <div class="row mb-4">
      <el-card body-style="padding:0px" class="col">
        <div ref="timeOrder" class="net bg-slate-300"></div>
      </el-card>
      <el-card body-style="padding:0px" class="col">
        <div ref="linkFlow" class="net bg-slate-300"></div>
      </el-card>
    </div>
    <div class="row mb-4">
      <el-card body-style="padding:0px" class="col">
        <div ref="driverRun" class="net bg-slate-300"></div>
      </el-card>
      <el-card body-style="padding:0px" class="col">
        <div ref="disOrder" class="net bg-slate-300"></div>
      </el-card>
    </div>
    <div class="row mb-4"></div>
  </div>
</template>

<script>
import { getStatistics } from "../../api";
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    // 检查sessionStorage中是否已经存在数据
    if (!sessionStorage.getItem("statisticsData")) {
      // 如果不存在，则获取数据并存储到sessionStorage中
      getStatistics().then((res) => {
        const statisticsData = res.data.data;
        // 存储到sessionStorage中
        sessionStorage.setItem(
          "statisticsData",
          JSON.stringify(statisticsData)
        );
        // 数据加载完成后初始化图表
        this.initCharts(statisticsData);
      });
    } else {
      // 如果数据已存在于sessionStorage中，则直接初始化图表
      const statisticsData = JSON.parse(
        sessionStorage.getItem("statisticsData")
      );
      this.initCharts(statisticsData);
    }
  },
  methods: {
    initCharts(statisticsData) {
      const crossTime = echarts.init(this.$refs.crossTime);
      const linkTime = echarts.init(this.$refs.linkTime);
      const disOrder = echarts.init(this.$refs.disOrder);
      const linkFlow = echarts.init(this.$refs.linkFlow);
      const driverRun = echarts.init(this.$refs.driverRun);
      const timeOrder = echarts.init(this.$refs.timeOrder);

      crossTime.setOption({
        title: {
          text: "路口通行时间",
        },
        tooltip: {},
        xAxis: {
          data: statisticsData.crossTimeTable.desc.map((item) => item.crossid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: statisticsData.crossTimeTable.desc.map(
            (item) => item.crosstime
          ),
        },
      });

      linkTime.setOption({
        title: {
          text: "路段通行时间",
        },
        tooltip: {},
        xAxis: {
          data: statisticsData.linkTimeTable.desc.map((item) => item.linkid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: statisticsData.linkTimeTable.desc.map(
            (item) => item.linkavgtime
          ),
        },
      });

      disOrder.setOption({
        title: {
          text: "行程距离",
        },
        tooltip: {},
        xAxis: {
          data: statisticsData.disOrderTable.desc.map((item) => item.orderid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: statisticsData.disOrderTable.desc.map((item) => item.distance),
        },
      });
      timeOrder.setOption({
        title: {
          text: "行程时间",
        },
        tooltip: {},
        xAxis: {
          data: statisticsData.timeOrderTable.desc.map((item) => item.orderid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: statisticsData.timeOrderTable.desc.map((item) => item.ata),
        },
      });

      linkFlow.setOption({
        title: {
          text: "路段车流量",
        },
        tooltip: {},
        xAxis: {
          data: statisticsData.linkFlowTable.desc.map((item) => item.linkid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: statisticsData.linkFlowTable.desc.map(
            (item) => item.link_count
          ),
        },
      });

      driverRun.setOption({
        title: {
          text: "司机上传记录数量",
        },
        tooltip: {},
        xAxis: {
          data: statisticsData.driverRunTable.desc.map((item) => item.driverid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: statisticsData.driverRunTable.desc.map(
            (item) => item.drive_count
          ),
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.net {
  width: 100%;
  height: 300px;
}
</style>
