<template>
  <div>
    <h1>Statistics</h1>
    通行时间最久，最短的cross
    <br />
    通行时间最久，最短的link
    <br />
    距离最长，最短的order
    <br />
    车流量最高的link
    <br />
    司机跑单最多

    <div class="row mb-4">
      <el-card class="col">
        <div ref="crossTime" class="h-56 bg-slate-300"></div>
      </el-card>
      <el-card class="col">
        <div ref="linkTime" class="h-56 bg-slate-300"></div>
      </el-card>
      <el-card class="col">
        <div ref="disOrder" class="h-56 bg-slate-300"></div>
      </el-card>
    </div>
    <div class="row">
      <el-card class="col">
        <div ref="linkFlow" class="h-56 bg-slate-300"></div>
      </el-card>
      <el-card class="col">
        <div ref="driverRun" class="h-56 bg-slate-300"></div>
      </el-card>
      <el-card class="col"></el-card>
    </div>
  </div>
</template>

<script>
import { getStatistics } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    getStatistics().then((res) => {
      const {
        crossTimeTable,
        linkTimeTable,
        disOrderTable,
        linkFlowTable,
        driverRunTable,
      } = res.data.data;
      const crossTime = echarts.init(this.$refs.crossTime);
      const linkTime = echarts.init(this.$refs.linkTime);
      const disOrder = echarts.init(this.$refs.disOrder);
      const linkFlow = echarts.init(this.$refs.linkFlow);
      const driverRun = echarts.init(this.$refs.driverRun);
      let optionCrossTime = {
        title: {
          text: "cross通行时间",
        },
        tooltip: {},
        xAxis: {
          data: crossTimeTable.map(item=>item.item.crossId),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: crossTimeTable.map(item=>item.time),
        },
      };
      let optionLinkTime = {
        title: {
          text: "link通行时间",
        },
        tooltip: {},
        xAxis: {
          data: linkTimeTable.map(item=>item.item.linkId),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: linkTimeTable.map(item=>item.time),
        },
      };
      let optionDisOrder = {
        title: {
          text: "order距离",
        },
        tooltip: {},
        xAxis: {
          data: disOrderTable.map(item=>item.item.orderId),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: disOrderTable.map(item=>item.distance),
        },
      };
      let optionLinkFlow = {
        title: {
          text: "link车流量",
        },
        tooltip: {},
        xAxis: {
          data: linkFlowTable.map(item=>item.linkId),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: linkFlowTable.map(item=>item.flow),
        },
      };
      let optionDriveRun = {
        title: {
          text: "司机跑单数量",
        },
        tooltip: {},
        xAxis: {
          data: driverRunTable.map(item=>item.driverId),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: driverRunTable.map(item=>item.run),
        },
      };
      crossTime.setOption(optionCrossTime);
      linkTime.setOption(optionLinkTime);
      disOrder.setOption(optionDisOrder);
      linkFlow.setOption(optionLinkFlow);
      driverRun.setOption(optionDriveRun);
    });
  },
};
</script>

<style lang="less">
</style>