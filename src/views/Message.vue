<template>
  <div>
    <div class="row">
      <div class="col">
        <div>
          <el-form :inline="true" ref="form" :model="form" label-width="80px">
            <el-form-item label="行程时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table class="mb-4" :data="orderTable" style="width: 100%">
            <el-table-column
              v-for="(val, key) in orderTableLabel"
              :key="key"
              :prop="key"
              :label="val"
            />
          </el-table>
        </div>
      </div>
      <div class="col">
        <div>
          <el-form
            :inline="true"
            ref="orderForm"
            :model="orderForm"
            label-width="80px"
          >
            <el-form-item label="行程id">
              <el-input
                @blur="$trimInput"
                @input="$trimInput"
                v-model="orderForm.orderId"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="orderSubmit">查询</el-button>
              <el-button type="primary" @click="tabTab">恢复</el-button>
            </el-form-item>
          </el-form>
          <el-table v-if="tab" :data="linkTableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in linkTableLabel"
              :key="key"
              :prop="key"
              :label="val"
            />
          </el-table>
          <el-table v-if="tab" :data="crossTableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in crossTableLabel"
              :key="key"
              :prop="key"
              :label="val"
            />
          </el-table>
        </div>
        <el-collapse v-if="!tab" v-model="activeNames" class="col">
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
  </div>
</template>

<script>
import { getOrderQuery, postOrderQuery, postCrossOrder,postLinkOrder } from "@/api";
import { formatTime } from "@/utils/formatTime";
export default {
  data() {
    return {
      form: {
        date: null,
      },
      orderForm:{
        orderId:null,
      },
      activeNames: ["1"],
      tab:false,
      orderTableLabel: {
        // 订单编号	真实行程总时间
        // 路线距离	出发时刻平均通行时间
        // 司机编号	出发时刻时间片编号	日期
        orderid: "订单编号",
        ata: "真实行程总时间",
        distance: "路线距离",
        driverid: "司机编号",
        sliceid: "出发时间",
        date: "日期",
      },
      linkTableLabel: {
        orderid: "订单编号",
        linkid: "路段编号",
        linktime: "路段通行时间",
        linkratio: "路段覆盖率",
        linkcurrentstatus: "进入时状态",
        linkarrivalstatus: "驶出时状态",
      },
      crossTableLabel: {
        orderid: "订单编号",
        crossid: "路口编号",
        crosstime: "路口通行时间",
        entranceid: "驶入路口编号",
        exitid: "驶出路口编号",
      },
      orderTableData: [],
      linkTableData: [],
      crossTableData: [],
    };
  },
  computed: {
    orderTable() {
      return this.orderTableData.map((item) => {
        return {
          ...item,
          date: formatTime(item.date),
          create_at: formatTime(item.create_at),
        };
      });
    },
    formatDate() {
      return formatTime(this.form.date);
    },
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
  mounted() {
    getOrderQuery().then((res) => {
      this.orderTableData = res.data.data;
    });
  },
  methods: {
    onSubmit() {
      if (this.form.date) {
        postOrderQuery({ formatDate: this.formatDate }).then((res) => {
          this.orderTableData = res.data.data;
        });
      } else {
        this.$message.error("请选择日期");
        getOrderQuery().then((res) => {
          this.orderTableData = res.data.data;
        });
      }
    },
    tabTab(){
      this.tab=!this.tab
    },
    orderSubmit(){
      if(this.orderForm.orderId){
        this.tab=true;
        postLinkOrder({orderId:this.orderForm.orderId}).then((res) => {
          console.log(res.data);
          this.linkTableData = res.data.data;
        })
        postCrossOrder({orderId:this.orderForm.orderId}).then((res) => {
          console.log(res.data);

          this.crossTableData = res.data.data;
        })
      }
      else{
        this.$message.error("请输入行程id");
      }
    },
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

<style scoped>
.el-collapse-item__header {
  font-size: 32px; /* 修改这个值可以调整标题文字大小 */
}

.el-collapse-item__wrap .el-collapse-item__content {
  font-size: 16px; /* 修改这个值可以调整内容文字大小 */
}
</style>
