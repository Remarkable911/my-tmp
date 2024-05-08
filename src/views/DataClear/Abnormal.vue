<template>
  <div>
    <span>请先选择进行检查的数据表类型</span><br />
    <el-select v-model="fileType" placeholder="请选择">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <br />
    <div v-if="fileType === 'order'">
      <div v-if="orderTable.ata.info">
        <span>{{ orderTable.ata.info }}异常数据展示（前20条）：</span>
        <el-table :data="orderTable.ata.table">
          <el-table-column
            v-for="(val, key) in orderTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </div>
      <div v-if="orderTable.distance.info">
        <span>{{ orderTable.distance.info }}异常数据展示（前20条）：</span>
        <el-table :data="orderTable.distance.table">
          <el-table-column
            v-for="(val, key) in orderTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </div>

      <div v-if="orderTable.date.info">
        <span>{{ orderTable.date.info }}异常数据展示（前20条）：</span>
        <el-table :data="orderTable.date.table">
          <el-table-column
            v-for="(val, key) in orderTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </div>

      <div v-if="orderTable.simpleeta.info">
        <span>{{ orderTable.simpleeta.info }}异常数据展示（前20条）：</span>
        <el-table :data="orderTable.simpleeta.table">
          <el-table-column
            v-for="(val, key) in orderTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </div>
    </div>
    <div v-else-if="fileType === 'cross'">
      <div v-if="linkTable.linktime.info">
        <span>{{ linkTable.linktime.info }}异常数据展示（前20条）：</span>
        <el-table :data="linkTable.linktime.table">
          <el-table-column
            v-for="(val, key) in linkTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </div>
      <div v-if="crossTable.info">
        <span>{{ crossTable.info }}异常数据展示（前20条）：</span>
        <el-table :data="crossTable.table">
          <el-table-column
            v-for="(val, key) in crossTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </div>
    </div>
    <div v-else-if="fileType === 'link'">
      <div v-if="linkTable.linktime.info">
        <span>{{ linkTable.linktime.info }}异常数据展示（前20条）：</span>
        <el-table :data="linkTable.linktime.table">
          <el-table-column
            v-for="(val, key) in linkTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </div>
      <div v-if="linkTable.ratio.info">
        <span>{{ linkTable.ratio.info }}异常数据展示（前20条）：</span>
        <el-table :data="linkTable.ratio.table">
          <el-table-column
            v-for="(val, key) in linkTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </div>
      <div v-if="linkTable.status.info">
        <span>{{ linkTable.status.info }}异常数据展示（前20条）：</span>
        <el-table :data="linkTable.status.table">
          <el-table-column
            v-for="(val, key) in linkTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getCrossAbnormal, getLinkAbnormal, getOrderAbnormal } from "@/api";
export default {
  data() {
    return {
      typeList: [
        {
          value: "order",
          label: "order订单",
        },
        {
          value: "cross",
          label: "cross路口",
        },
        {
          value: "link",
          label: "link路段",
        },
      ],
      fileType: "",
      linkTableLabel: {
        orderid: "订单编号",
        linktime: "路段通行时间",
        linkratio: "路段覆盖率",
        linkcurrentstatus: "进入时状态",
        linkarrivalstatus: "驶出时状态",
      },
      orderTableLabel: {
        orderid: "订单编号",
        ata: "真实行程总时间",
        distance: "路线距离",
        driverid: "司机编号",
        sliceid: "出发时间",
        date: "日期",
      },
      crossTableLabel: {
        orderid: "订单编号",
        crossid: "路口编号",
        crosstime: "路口通行时间",
        entranceid: "驶入路口编号",
        exitid: "驶出路口编号",
      },
      orderTable: {
        ata: {
          info: "",
          table: [],
        },
        date: {
          info: "",
          table: [],
        },
        distance: {
          info: "",
          table: [],
        },
        simpleeta: {
          info: "",
          table: [],
        },
      },
      crossTable: { info: "", table: [] },
      linkTable: {
        linktime: {
          info: "",
          table: [],
        },
        ratio: {
          info: "",
          table: [],
        },
        status: {
          info: "",
          table: [],
        },
      },
    };
  },
  methods: {
    getOrder() {
      getOrderAbnormal().then((res) => {
        this.orderTable = res.data.data;
      });
    },
    getCross() {
      getCrossAbnormal().then((res) => {
        this.crossTable = res.data.data;
      });
    },
    getLink() {
      getLinkAbnormal().then((res) => {
        this.linkTable = res.data.data;
      });
    },
  },
  watch: {
    fileType(val) {
      if (val === "order") {
        this.getOrder();
      } else if (val === "cross") {
        this.getCross();
      } else if (val === "link") {
        this.getLink();
      }
    },
  },
};
</script>

<style lang="less">
</style>