<template>
  <div>
    <div>
      <h5 class="mb-2">行程提醒:</h5>
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="时间：" prop="time">
          <el-time-select
            v-model="form.time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
            placeholder="选择时间"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="地点：" prop="linkId">
          <el-input
            @blur="$trimInput"
            @input="$trimInput"
            v-model="form.linkId"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addRemind">添加提醒</el-button>
        </el-form-item>
      </el-form>
      <div
        v-for="(val, key) in messageList"
        :key="key"
        style="
          border-bottom: 1px solid #ebeef5;
          padding-bottom: 5px;
          margin-bottom: 5px;
        "
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <el-checkbox v-model="val.checked">
            {{ val.time }}要去{{ val.linkId }}路段结点接客
          </el-checkbox>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteRemind(key)"
            circle
          ></el-button>
        </div>
      </div>
    </div>
    <div>
      <h5 class="mt-4">查询历史：</h5>
      <el-table :data="historyTable" style="width: 100%">
        <el-table-column
          v-for="(val, key) in historyLabel"
          :key="key"
          :prop="key"
          :label="val"
        />
      </el-table>
    </div>
    <div>
      <h5 class="mt-4">导入订单数据</h5>
      <div class="manage">
        <el-form
          :inline="true"
          ref="orderForm"
          :model="orderForm"
          :rules="orderRule"
          label-width="120px"
        >
          <el-row>
            <el-form-item label="订单号：" prop="orderid">
              <el-input
                @blur="$trimInput"
                @input="$trimInput"
                v-model="orderForm.orderid"
              ></el-input>
            </el-form-item>
            <el-form-item label="时间：" prop="dateTime">
              <el-date-picker
                v-model="orderForm.dateTime"
                type="datetime"
                placeholder="选择时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="真实行程时间：" prop="ata">
              <el-input
                @blur="$trimInput"
                @input="$trimInput"
                v-model="orderForm.ata"
              ></el-input>
            </el-form-item>
            <el-form-item label="路线距离：" prop="distance">
              <el-input
                @blur="$trimInput"
                @input="$trimInput"
                v-model="orderForm.distance"
              ></el-input>
            </el-form-item>
            <el-form-item label="平均通行时间：" prop="simpleeta">
              <el-input
                @blur="$trimInput"
                @input="$trimInput"
                v-model="orderForm.simpleeta"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="起点路段：" prop="startlink">
              <el-input
                @blur="$trimInput"
                @input="$trimInput"
                v-model="orderForm.startlink"
              ></el-input>
            </el-form-item>
            <el-form-item label="终点路段：" prop="endlink">
              <el-input
                @blur="$trimInput"
                @input="$trimInput"
                v-model="orderForm.endlink"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="ml-28" @click="importOrder"
                >导入</el-button
              >
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecord, postRecord } from "@/api";
import { formatTime } from "@/utils/formatTime";
export default {
  data() {
    return {
      orderForm: {
        orderid: "",
        driverid: "",
        ata: "",
        distance: "",
        simpleeta: "",
        dateTime: "",
        startlink: "",
        endlink: "",
      },
      orderRule: {
        orderid: [{ required: true, message: "请输入订单号", trigger: "blur" }],
      },
      form: {
        time: "",
        linkId: "",
        checked: false,
      },
      dialogVisible: false,
      messageList: null,
      queryHistory: [],
      historyLabel: {
        entranceLink: "路段起点",
        exitLink: "路段终点",
        ata: "行程时间",
        time: "日期",
        mode: "方法",
      },
    };
  },
  computed: {
    historyTable() {
      return this.queryHistory.map((item) => {
        return {
          ...item,
          time: formatTime(item.time),
          mode: item.mode === 1 ? "路段估值" : "总体估值",
        };
      });
    },
    driverId() {
      return this.$store.state.user.driverId;
    },
  },
  mounted() {
    getRecord({ driverId: this.driverId }).then((res) => {
      this.queryHistory = res.data.data.queryHistory;
    });
    this.messageList = JSON.parse(sessionStorage.getItem("Remind"));
  },
  methods: {
    addRemind() {
      if (this.form.time === "" || this.form.linkId === "") {
        this.$message.error("请完整填写表单");
      } else {
        this.$message.success("添加成功");
        let remindArray = JSON.parse(sessionStorage.getItem("Remind")) || [];
        remindArray.push(this.form);
        sessionStorage.setItem("Remind", JSON.stringify(remindArray));
        this.messageList = JSON.parse(sessionStorage.getItem("Remind"));
        this.$refs.form.resetFields();
      }
    },
    deleteRemind(key) {
      let remindArray = JSON.parse(sessionStorage.getItem("Remind"));
      remindArray.splice(key, 1);
      sessionStorage.setItem("Remind", JSON.stringify(remindArray));
      this.messageList = JSON.parse(sessionStorage.getItem("Remind"));
    },
    importOrder() {
      this.orderForm.driverid = this.driverId;
      postRecord(this.orderForm).then((res) => {
        this.$message.success("导入成功");
        // this.$refs.orderForm.resetFields();
      });
      console.log(this.orderForm);
    },
  },
};
</script>


<style scoped>
.right-align {
  flex-grow: 1;
}
</style>