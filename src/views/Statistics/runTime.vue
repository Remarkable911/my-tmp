<template>
  <div>
    一天内路段车流量前三分析:
    <div ref="linkFlow" class="net bg-slate-300"></div>
    全路段状况信息：
    <div ref="linkStatus" class="net bg-slate-300"></div>
  </div>
</template>

<script>
import { postFlow, getLinkStatus } from "../../api";
import * as echarts from "echarts";

export default {
  data() {
    return {
      isDataLoaded: false, // 用于跟踪数据是否已加载
    };
  },
  computed: {
    flowId() {
      return JSON.parse(sessionStorage.getItem("statisticsData"))
        .linkFlowTable.desc.slice(0, 3)
        .map((link) => String(link.linkid));
    },
    flowData() {
      return JSON.parse(sessionStorage.getItem("flowData")) || [];
    },
    flowChartData() {
      const linkCounts = [];

      for (const key in this.flowData) {
        if (Object.hasOwnProperty.call(this.flowData, key)) {
          const rangeData = this.flowData[key];
          const counts = rangeData.map((item) => item.link_count);
          linkCounts.push(counts);
        }
      }
      return linkCounts;
    },
    statusData() {
      return JSON.parse(sessionStorage.getItem("LinkStatus")) || [];
    },
    statusChartData() {
      return this.statusData.map((item) => {
        let status = "";
        switch (item.avgstatus) {
          case 0:
            status = "未知";
            break;
          case 1:
            status = "畅通";
            break;
          case 2:
            status = "缓行";
            break;
          case 3:
            status = "拥堵";
            break;
          case 4:
            status = "异常值";
            break;
        }
        return {
          ...item,
          status,
        };
      });
    },
  },
  methods: {
    initCharts() {
      const linkFlow = echarts.init(this.$refs.linkFlow);
      const linkStatus = echarts.init(this.$refs.linkStatus);

      linkFlow.setOption({
        title: {
          text: "路段车流量",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.flowId,
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
          data: ["8:00", "11:00", "14:00", "17:00", "20:00", "23:00"],
        },
        yAxis: {
          type: "value",
        },
        series: this.flowId.map((id, index) => ({
          name: id,
          type: "line",
          stack: "Total",
          data: this.flowChartData[index] || [],
        })),
      });

      linkStatus.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.statusChartData.map((item) => ({
              name: item.status, // 正确的键值对应关系
              value: item.status_count, // 正确的键值对应关系
            })),
          },
        ],
      });
    },
  },
  mounted() {
    if (!sessionStorage.getItem("flowData")  ||!sessionStorage.getItem("linkStatus")) {
      postFlow(this.flowId).then((res) => {
        const flowData = res.data.data;
        sessionStorage.setItem("flowData", JSON.stringify(flowData));
        this.isDataLoaded = true; // 数据加载完成后设置为 true
      });
      getLinkStatus().then((res) => {
        const LinkStatus = res.data.data;
        console.log(LinkStatus);
        sessionStorage.setItem("LinkStatus", JSON.stringify(LinkStatus));
        this.isDataLoaded = true; // 数据加载完成后设置为 true
      });
    } else {
      this.isDataLoaded = true;
    }

  },
  watch: {
    isDataLoaded(newVal) {
      if (newVal) {
        this.initCharts(); // 当数据加载完成后初始化图表
      }
    },
  },
};
</script>

<style scoped>
.net {
  width: 100%;
  height: 300px;
}
</style>
