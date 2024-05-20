<template>
  <div>
    <div ref="itineraryNum" class="net bg-slate-300"></div>

    <div ref="itineraryInfo" class="net bg-slate-300"></div>
  </div>
</template>

<script>
import { getItinerary } from "../../api";
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  computed: {
    itineraryData() {
      return JSON.parse(sessionStorage.getItem("itineraryData"));
    },
  },
  methods: {
    initCharts(data) {
      const itineraryNum = echarts.init(this.$refs.itineraryNum);
      const itineraryInfo = echarts.init(this.$refs.itineraryInfo);

      itineraryNum.setOption({
        title: {
          text: "全天各时间段行程数量变化",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.itineraryData.map((item) => item.sliceTime),
        },
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "行程数量",
            data: this.itineraryData.map((item) => item.orderNum),
            type: "line",
            areaStyle: {},
          },
        ],
      });
      itineraryInfo.setOption({
        title: {
          text: "全天时间段行程平均时间与平均距离",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: [
          {
            type: "value",
            name: "平均时间",
            alignTicks: true,
            axisLine: {
              show: true,
              
            },
            axisLabel: {
              formatter: "{value} s",
            },
            boundaryGap: [0, 0.01],
          },
          {
            type: "value",
            name: "平均距离",
            alignTicks: true,
            axisLine: {
              show: true,
              
            },
            axisLabel: {
              formatter: "{value} m",
            },
            boundaryGap: [0, 0.01],
          },
        ],
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          
          data: this.itineraryData.map((item) => item.sliceTime),
        },
        series: [
          {
            name: "平均时间",
            type: "bar",
            yAxisIndex: 0,
            data: this.itineraryData.map((item) => item.avgAta),
          },
          {
            name: "平均距离",
            type: "bar",
            yAxisIndex: 1,
            data: this.itineraryData.map((item) => item.avgDis),
          },
        ],
      });
    },
  },
  mounted() {
    if (!sessionStorage.getItem("itineraryData")) {
      getItinerary().then((res) => {
        const itineraryData = res.data.data;
        sessionStorage.setItem("itineraryData", JSON.stringify(itineraryData));
      });
    }
    this.initCharts(this.itineraryData);
  },
};
</script>

<style>
.net {
  width: 100%;
  height: 320px;
}
</style>