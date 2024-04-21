<template>
  <div>
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
        disOrderTable,
        driverRunTable,
        linkFlowTable,
        linkTimeTable,
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
          data: crossTimeTable.desc.map((item) => item.crossid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: crossTimeTable.desc.map((item) => item.crosstime),
        },
      };
      let optionLinkTime = {
        title: {
          text: "link通行时间",
        },
        tooltip: {},
        xAxis: {
          data: linkTimeTable.desc.map((item) => item.linkid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: linkTimeTable.desc.map((item) => item.linkavgtime),
        },
      };
      let optionDisOrder = {
        title: {
          text: "order距离",
        },
        tooltip: {},
        xAxis: {
          data: disOrderTable.desc.map((item) => item.orderid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: disOrderTable.desc.map((item) => item.distance),
        },
      };
      let optionLinkFlow = {
        title: {
          text: "link车流量",
        },
        tooltip: {},
        xAxis: {
          data: linkFlowTable.desc.map((item) => item.linkid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: linkFlowTable.desc.map((item) => item.link_count),
        },
      };
      let optionDriveRun = {
        title: {
          text: "司机跑单数量",
        },
        tooltip: {},
        xAxis: {
          data: driverRunTable.desc.map((item) => item.driverid),
        },
        yAxis: {},
        series: {
          type: "bar",
          data: driverRunTable.desc.map((item) => item.drive_count),
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