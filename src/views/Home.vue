<template>
  <div>
    <el-row>
      <el-col :span="6" class="ml-1 mr-7">
        <el-card class="box-card mb-4">
          <div class="mb-2">
            <span>收录订单总数：{{ orderNum }}</span>
          </div>
          <div>
            <span>今日新增订单：{{ addOrder }}</span>
          </div>
        </el-card>
        <el-card class="box-card mb-4">
          <div>
            <span>link信息：</span>
            <div>
              <h6>id:{{ link["linkId"] }}</h6>
              <h6>平均用时:{{ link["linkTime"] }}</h6>
              <h6>通行状态:{{ link["linkStatus"] }}</h6>
            </div>
          </div>
        </el-card>
        <el-card class="box-card h-56">
          <!-- link路段的车流量统计（link表中的linkid的count值）表格 -->
          <div ref="linkTraffic" class="h-56 bg-slate-300"></div>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card class="box-card mb-4 h-96">
          <!-- 把路段表放在这儿 -->
          <div ref="linkNet" class="h-80 bg-slate-300"></div>
          <el-button type="primary">更新数据</el-button>
        </el-card>
        <el-card class="box-card">
          <div ref="weatherNet" class="h-16 bg-slate-300"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHome } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      orderNum: "",
      addOrder: "",
      link: { linkId: "", linkTime: "", linkStatus: "" },
    };
  },
  components: {},
  methods: {},
  computed: {},
  mounted() {
    getHome().then((res) => {
      // console.log(res);
      const { orderNum, addOrder, link, linkTable, netTable } = res.data.data;
      const linkTraffic = echarts.init(this.$refs.linkTraffic);
      const linkNet = echarts.init(this.$refs.linkNet);
      // 车流量柱状图
      let optionTraffic = {
        title: {
          text: "link路段车流量统计",
        },
        xAxis: {
          data: linkTable.map((item) => item.linkId),
        },
        yAxis: {},
        series: {
          name: "车流量统计",
          type: "bar",
          data: linkTable.map((item) => item.linkTraffic),
        },
      };
      // 轨迹路线图
      let optionNet = {
        renderer: "webgl", // 设置渲染器为 WebGL
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
              repulsion: 200, // 你可以根据需要调整这个值来改变密度
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
      };
      // 天气图
      // console.log(optionTraffic);
      linkTraffic.setOption(optionTraffic);
      linkNet.setOption(optionNet);
      this.$set(this, "orderNum", orderNum); //将orderNum和addOrder放到data中，这样就可以直接在页面中使用
      this.$set(this, "addOrder", addOrder);
      this.$set(this, "link", link);
      // console.log(orderNum, addOrder, link, linkTable, netTable);
    });
  },
};
</script>

<style lang="less">
</style>