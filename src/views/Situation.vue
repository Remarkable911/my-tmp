<template>
  <div>
    <div ref="linkTime" class="net " style="width: 100%; height: 130px;"></div>
    <div ref="crossTime" class="net" style="width: 100%; height: 130px;"></div>
    <div ref="linkFlow" class="net" style="width: 100%; height: 130px;"></div>
    <div ref="driverRun" class="net" style="width: 100%; height: 130px;"></div>
    <el-card>
      行程
      <span v-for="(item, key) in disOrder" :key="key">
        {{ item.orderid }},
      </span>
      距离较长，
      <el-divider></el-divider>
      用户
      <span v-for="(item, key) in disOrder" :key="key">
        {{ item.driverid }},
      </span>
      切勿疲劳驾驶
    </el-card>
  </div>
</template>

<script>
import { getStatistics } from "../api";
import * as echarts from "echarts";

export default {
  data() {
    return {
      statisticsData: null,
    };
  },
  methods: {
    initCharts() {
      this.$nextTick(() => {
        const crossTime = echarts.init(this.$refs.crossTime);
        const linkTime = echarts.init(this.$refs.linkTime);
        const linkFlow = echarts.init(this.$refs.linkFlow);
        const driverRun = echarts.init(this.$refs.driverRun);

        crossTime.setOption({

          series: [
            {
              type: "tree",
              id: 0,
              name: "tree1",
              data: [
                {
                  name: "通行时间较长的路口",
                  children: this.crossTime.map(item => ({ name: item.crossid }))
                }
              ],
              top: "10%",
              left: "20%",
              bottom: "22%",
              right: "20%",
              edgeShape: "polyline",
              lineStyle: {
                width: 3,
                color: "#000",
              },
              label: {
                color: "#5470c6",
                backgroundColor: "#fff",
                position: "left",
                verticalAlign: "middle",
                align: "right",
              },
              leaves: {
                label: {
                  color: "#91cc75",
                  position: "right",
                  verticalAlign: "middle",
                  align: "left",
                },
              },
              emphasis: {
                focus: "descendant",
              },
            },
          ],
        });
        linkTime.setOption({
          series: [
            {
              type: "tree",
              id: 0,
              name: "tree1",
              data: [
                {
                  name: "通行时间较长的路段",
                  children: this.linkTime.map(item => ({ name: item.linkid }))
                }
              ],
              top: "10%",
              left: "20%",
              bottom: "22%",
              right: "20%",
              edgeShape: "polyline",
              lineStyle: {
                width: 3,
                color: "#000",
              },
              label: {
                color: "#5470c6",
                backgroundColor: "#fff",
                position: "left",
                verticalAlign: "middle",
                align: "right",
              },
              leaves: {
                label: {
                  color: "#91cc75",
                  position: "right",
                  verticalAlign: "middle",
                  align: "left",
                },
              },
              emphasis: {
                focus: "descendant",
              },
            },
          ],
        });
        linkFlow.setOption({
          series: [
            {
              type: "tree",
              id: 0,
              name: "tree1",
              data: [
                {
                  name: "车流量较多的路段",
                  children: this.linkFlow.map(item => ({ name: item.linkid }))
                }
              ],
              top: "10%",
              left: "20%",
              bottom: "22%",
              right: "20%",
              edgeShape: "polyline",
              lineStyle: {
                width: 3,
                color: "#000",
              },
              label: {
                color: "#5470c6",
                backgroundColor: "#fff",
                position: "left",
                verticalAlign: "middle",
                align: "right",
              },
              leaves: {
                label: {
                  color: "#91cc75",
                  position: "right",
                  verticalAlign: "middle",
                  align: "left",
                },
              },
              emphasis: {
                focus: "descendant",
              },
            },
          ],
        });
        driverRun.setOption({
          series: [
            {
              type: "tree",
              id: 0,
              name: "tree1",
              data: [
                {
                  name: "上传行程较多的用户",
                  children: this.driverRun.map(item => ({ name: item.driverid }))
                }
              ],
              top: "10%",
              left: "20%",
              bottom: "22%",
              right: "20%",
              edgeShape: "polyline",
              lineStyle: {
                width: 3,
                color: "#000",
              },
              label: {
                color: "#5470c6",
                backgroundColor: "#fff",
                position: "left",
                verticalAlign: "middle",
                align: "right",
              },
              leaves: {
                label: {
                  color: "#91cc75",
                  position: "right",
                  verticalAlign: "middle",
                  align: "left",
                },
              },
              emphasis: {
                focus: "descendant",
              },
            },
          ],
        });
      });
    },
  },
  computed: {
    linkFlow() {
      return this.statisticsData ? this.statisticsData.linkFlowTable.desc : [];
    },
    linkTime() {
      return this.statisticsData ? this.statisticsData.linkTimeTable.desc : [];
    },
    crossTime() {
      return this.statisticsData ? this.statisticsData.crossTimeTable.desc : [];
    },
    driverRun() {
      return this.statisticsData ? this.statisticsData.driverRunTable.desc : [];
    },
    disOrder() {
      return this.statisticsData ? this.statisticsData.disOrderTable.desc : [];
    },
  },
  async mounted() {
    let data = sessionStorage.getItem("statisticsData");
    if (data) {
      this.statisticsData = JSON.parse(data);
    } else {
      try {
        const res = await getStatistics();
        this.statisticsData = res.data.data;
        sessionStorage.setItem(
          "statisticsData",
          JSON.stringify(this.statisticsData)
        );
      } catch (error) {
        console.error("Failed to fetch statistics data:", error);
      }
    }
    this.initCharts();
  },
};
</script>

<style>
.mb-4 {
  margin-bottom: 1rem;
}
</style>
