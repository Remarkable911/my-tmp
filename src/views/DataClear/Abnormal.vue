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
        <el-table :data="ataTable">
          <el-table-column
            v-for="(val, key) in orderTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              
              <el-button
                type="danger"
                @click="deleteClick(scope.row)"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="orderTable.distance.info">
        <span>{{ orderTable.distance.info }}异常数据展示（前20条）：</span>
        <el-table :data="disTable">
          <el-table-column
            v-for="(val, key) in orderTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click="deleteClick(scope.row)"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="orderTable.date.info">
        <span>{{ orderTable.date.info }}异常数据展示（前20条）：</span>
        <el-table :data="dateTable">
          <el-table-column
            v-for="(val, key) in orderTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              
              <el-button
                type="danger"
                @click="deleteClick(scope.row)"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="orderTable.simpleeta.info">
        <span>{{ orderTable.simpleeta.info }}异常数据展示（前20条）：</span>
        <el-table :data="etaTable">
          <el-table-column
            v-for="(val, key) in orderTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              
              <el-button
                type="danger"
                @click="deleteClick(scope.row)"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-else-if="fileType === 'cross'">
      <div v-if="crossTable.info">
        <span>{{ crossTable.info }}异常数据展示（前20条）：</span>
        <el-table :data="crossTablePro">
          <el-table-column
            v-for="(val, key) in crossTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              
              <el-button
                type="danger"
                @click="deleteClick(scope.row)"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-else-if="fileType === 'link'">
      <div v-if="linkTable.linktime.info">
        <span>{{ linkTable.linktime.info }}异常数据展示（前20条）：</span>
        <el-table :data="linkTimeTable">
          <el-table-column
            v-for="(val, key) in linkTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              
              <el-button
                type="danger"
                @click="deleteClick(scope.row)"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="linkTable.ratio.info">
        <span>{{ linkTable.ratio.info }}异常数据展示（前20条）：</span>
        <el-table :data="linkRatioTable">
          <el-table-column
            v-for="(val, key) in linkTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              
              <el-button
                type="danger"
                @click="deleteClick(scope.row)"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="linkTable.status.info">
        <span>{{ linkTable.status.info }}异常数据展示（前20条）：</span>
        <el-table :data="linkStatusTable">
          <el-table-column
            v-for="(val, key) in linkTableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              
              <el-button
                type="danger"
                @click="deleteClick(scope.row)"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCrossAbnormal,
  getLinkAbnormal,
  getOrderAbnormal,
  putOrder,
  putLink,
  putCross,
  deleteOrder,
  deleteLink,
  deleteCross,
} from "@/api";
import { formatTime } from "@/utils/formatTime";
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
        type: "类型",
      },
      orderTableLabel: {
        orderid: "订单编号",
        ata: "真实行程总时间",
        simpleeta: "平均通行总时间",
        distance: "路线距离",
        driverid: "司机编号",
        sliceid: "出发时间",
        startlink: "路段起点",
        endlink: "路段终点",
        date: "日期",
        type: "类型",
      },
      crossTableLabel: {
        orderid: "订单编号",
        crossid: "路口编号",
        crosstime: "路口通行时间",
        entranceid: "驶入路口编号",
        exitid: "驶出路口编号",
        type: "类型",
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
    deleteClick(row) {
      let row_json = JSON.stringify(row);
      if (this.fileType === "order") {
        deleteOrder(row_json).then((res) => {
          if (res.data.code === 404) {
            this.$message.error("删除失败");
          } else {
            this.$message.success("删除成功");
            this.getOrder();
          }
        });
      } else if (this.fileType === "link") {
        deleteLink(row_json).then((res) => {
          if (res.data.code === 404) {
            this.$message.error("删除失败");
          } else {
            this.$message.success("删除成功");
            this.getLink();
          }
        });
      } else if (this.fileType === "cross") {
        deleteCross(row_json).then((res) => {
          if (res.data.code === 404) {
            this.$message.error("删除失败");
          } else {
            this.$message.success("删除成功");
            this.getCross();
          }
        });
      }
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
  computed: {
    ataTable() {
      return this.orderTable.ata.table.map((item) => {
        return {
          ...item,
          date: formatTime(item.date),
          type:
            item.ata === null ? "真实行程总时间为空" : "真实行程总时间不合法",
        };
      });
    },
    disTable() {
      return this.orderTable.distance.table.map((item) => {
        return {
          ...item,
          date: formatTime(item.date),
          type: item.distance === null ? "路线距离为空" : "路线距离不合法",
        };
      });
    },
    dateTable() {
      return this.orderTable.date.table.map((item) => {
        return {
          ...item,
          date: formatTime(item.date),
          type: item.date === null ? "日期为空" : "日期不合法",
        };
      });
    },
    etaTable() {
      return this.orderTable.simpleeta.table.map((item) => {
        return {
          ...item,
          date: formatTime(item.date),
          type:
            item.simpleeta === null
              ? "平均通行总时间为空"
              : "平均通行总时间不合法",
        };
      });
    },
    crossTablePro() {
      return this.crossTable.table.map((item) => {
        return {
          ...item,
          type:
            item.crosstime === null ? "路口通行时间为空" : "路口通行时间不合法",
        };
      });
    },
    linkTimeTable() {
      return this.linkTable.linktime.table.map((item) => {
        return {
          ...item,
          type:
            item.linktime === null ? "路段通行时间为空" : "路段通行时间不合法",
        };
      });
    },
    linkStatusTable() {
      return this.linkTable.status.table.map((item) => {
        return {
          ...item,
          type: "路段状态不合法",
        };
      });
    },
    linkRatioTable() {
      return this.linkTable.ratio.table.map((item) => {
        return {
          ...item,
          type: "路段覆盖率不合法",
        };
      });
    },
  },
};
</script>

<style lang="less">
</style>