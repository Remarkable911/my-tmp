<template>
  <div>
    <div class="row">
      <div class="col">
        生成数据分析报告
      </div>
      <el-collapse v-model="activeNames" class="col">
        <el-collapse-item title="据数据统计，通行时间较长的路口有：" name="1">
          <div v-for="(item, key) in crossTimeList" :key="key">
            id:{{ item.crossid }}, 通行时间:{{ item.crosstime }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="据数据统计，通行时间较长的路段有：" name="2">
          <div v-for="(item, key) in LinkTimeList" :key="key">
            id:{{ item.linkid }}, 通行时间:{{ item.linkavgtime }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="据数据统计，车流量较大的路段有：" name="3">
          <div v-for="(item, key) in linkFlowList" :key="key">
            id:{{ item.linkid }}, 流量总计:{{ item.link_count }}
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="据数据统计，积极上传行程信息的司机有："
          name="4"
        >
          <div v-for="(item, key) in driverRunList" :key="key">
            id:{{ item.driverid }}, 上传数量:{{ item.drive_count }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="据数据统计，驾驶距离较长的行程有：" name="5">
          <div v-for="(item, key) in disOrderList" :key="key">
            用户id:{{ item.driverid }},行程id:{{ item.orderid }}, 行程距离:{{
              item.distance
            }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"],
    };
  },
  computed: {
    messageList() {
      return JSON.parse(sessionStorage.getItem("statisticsData"));
    },
    crossTimeList() {
      return this.messageList.crossTimeTable["desc"];
    },
    LinkTimeList() {
      return this.messageList.linkTimeTable["desc"];
    },
    disOrderList() {
      return this.messageList.disOrderTable["desc"];
    },
    driverRunList() {
      return this.messageList.driverRunTable["desc"];
    },
    linkFlowList() {
      return this.messageList.linkFlowTable["desc"];
    },
  },
  methods: {
    commitLinkTime() {
      this.$store.commit("setLinkTime", this.LinkTimeList);
    },
    commitCrossTime() {
      this.$store.commit("setCrossTime", this.crossTimeList);
    },
    commitLinkFlow() {
      this.$store.commit("setLinkFlow", this.linkFlowList);
    },
    commitDriverRun() {
      this.$store.commit("setDriverRun", this.driverRunList);
    },
    commitDisOrder() {
      this.$store.commit("setDisOrder", this.disOrder);
    },
    commitOtherMessage() {
      this.$store.commit("setOtherMessage", this.otherMessage);
    },
  },
};
</script>

<style>
</style>