<template>
  <div>
    <el-row>
      <el-col :span="6" class="ml-1 mr-7">
        <el-card class="box-card mb-4">
          <div class="mb-2">
            <span>收录订单总数：{{ orderNum }}</span>
          </div>
          <div>
            <span>今日新增订单：{{ todayNum }}</span>
          </div>
        </el-card>
        <el-card class="box-card mb-4">
          <div>
            <span>link信息：</span>
            <div>
              <h6>id:{{ link.linkid }}</h6>
              <h6>平均用时:{{ link.linkavgtime }}</h6>
              <h6>通行状态:{{ link.avgstatus }}</h6>
            </div>
          </div>
        </el-card>
        <el-card class="box-card h-56">
          <!-- link路段的车流量统计（link表中的linkid的count值）表格 -->
          <div ref="linkTraffic" class="h-56 bg-slate-300"></div>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card class="box-card mb-4 netCard">
          <!-- 把路段表放在这儿 -->
          <div ref="linkNet" class="bg-slate-300 linkNet"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHome, getNet, postHome } from "@/api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      orderNum: "",
      todayNum: "",
      link: { linkid: "2", linkavgtime: "19.3436", avgstatus: "1" },
    };
  },
  components: {},
  computed: {},
  methods: {
    initCharts(HomeData, netTable) {
      const linkTraffic = echarts.init(this.$refs.linkTraffic);
      linkTraffic.setOption({
        title: {
          text: "link路段车流量统计",
        },
        tooltip: {},
        xAxis: {
          data: HomeData.linkFlow.map((item) => item.linkid),
        },
        yAxis: {},
        series: {
          name: "车流量统计",
          type: "bar",
          data: HomeData.linkFlow.map((item) => item.link_count),
        },
      });
      this.$set(this, "orderNum", HomeData.orderNum);
      this.$set(this, "todayNum", HomeData.todayNum);
      const linkNet = echarts.init(this.$refs.linkNet);
      linkNet.setOption({
        renderer: "canvas", // 设置渲染器为 WebGL
        // 设置图表标题
        title: {
          text: "轨迹路线图",
          top: "bottom",
          left: "right",
        },
        // 设置图表数据
        series: [
          {
            type: "graph",
            layout: "force",
            roam: true, // 开启鼠标缩放和平移漫游功能
            // 设置节点数据
            force: {
              // 调整节点之间的排斥力，从而调整密度
              repulsion: 500, // 你可以根据需要调整这个值来改变密度
            },
            data: netTable.nodes.map(function (node) {
              return {
                // 节点名称
                name: node.name,
                // 设置节点标签
                label: {
                  show: true, // 是否显示标签
                  position: "top", // 标签位置，可以是 'top'、'bottom'、'left'、'right'、'inside'、'insideLeft'、'insideRight'、'insideTop'、'insideBottom'、'insideTopLeft'、'insideBottomLeft'、'insideTopRight'、'insideBottomRight'、'leftTop'、'leftBottom'、'rightTop'、'rightBottom'
                  formatter: "{b}", // 标签内容格式器，{a}、{b}、{c} 分别表示数据系列名、数据名、数据值
                  fontSize: 12, // 标签字体大小
                  fontWeight: "bold", // 标签字体粗细，可以是 'normal'、'bold'、'bolder'、'lighter' 或数字
                },
              };
            }),
            // 设置边数据
            edges: netTable.edges,
          },
        ],
      });
      linkNet.on("click", (params) => {
        if (params.dataType == "node") {
          this.link.linkid = params.data.name;
        }
      });
    },
  },
  mounted() {
    if (
      !sessionStorage.getItem("homeData") ||
      !sessionStorage.getItem("netTable")
    ) {
      Promise.all([getHome(), getNet()]).then(([homeRes, netRes]) => {
        const HomeData = homeRes.data.data;
        const netTable = netRes.data;
        sessionStorage.setItem("homeData", JSON.stringify(HomeData));
        sessionStorage.setItem("netTable", JSON.stringify(netTable));
        this.initCharts(HomeData, netTable);
      });
    } else {
      const HomeData = JSON.parse(sessionStorage.getItem("homeData"));
      const netTable = JSON.parse(sessionStorage.getItem("netTable"));
      this.initCharts(HomeData, netTable);
    }
  },
  watch: {
    "link.linkid": function (val) {
      if (val !== undefined) {
        // 添加额外的检查
        let jsonVal = { linkid: val };
        postHome(jsonVal).then((data) => {
          this.link = data.data.data.link;
        });
      }
    },
  },
};
</script>

<style lang="less">
.linkNet {
  height: 580px;
}
</style>
