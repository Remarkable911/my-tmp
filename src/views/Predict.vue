<template>
  <div>
    <el-button type="primary">更新数据</el-button>
    <div class="mt-4 mb-4">
      <h2>路段估值</h2>
      <el-form
        :inline="true"
        :model="linkForm"
        ref="linkForm"
        :rules="linkRule"
      >
        <el-form-item label="路段起点" prop="startLink">
          <el-input v-model="linkForm.startLink"></el-input>
        </el-form-item>
        <el-form-item label="路段终点" prop="endLink">
          <el-input v-model="linkForm.endLink"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="linkQuery">查询</el-button>
          <el-button @click="resetLinkForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span v-if="linkRes" :model="firstResult">
        查询结果：从{{ firstResult.startLink }}到达{{
          firstResult.endLink
        }}的时间预计为{{ firstResult.linkTime }}分钟<br />
        {{ path }}
      </span>
      <span v-if="linkError"> 暂无历史数据 </span>
    </div>
    <el-divider></el-divider>
    <div class="mt-4">
      <h2>总体估值</h2>
      <el-form :inline="true" :model="allForm" ref="allForm" :rules="allRule">
        <el-form-item label="路段起点" prop="startLink">
          <el-input v-model="allForm.startLink"></el-input>
        </el-form-item>
        <el-form-item label="路段终点" prop="endLink">
          <el-input v-model="allForm.endLink"></el-input>
        </el-form-item>
        <el-form-item label="出行时间" prop="time">
          <el-time-select
            v-model="allForm.time"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00',
            }"
            placeholder="选择时间"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="时间片" prop="slice">
          <el-select
            v-model="allForm.slice"
            placeholder="请选择"
          >
            <el-option
              v-for="item in timeSlice"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="allQuery">查询</el-button>
          <el-button @click="resetAllForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span v-if="allRes" :model="secondResult">
        查询结果：从{{ secondResult.startLink }}到达{{ secondResult.endLink }}
        的时间预计为{{ secondResult.average_ata }}分钟
      </span>
      <span v-if="allError"> 暂无历史数据 </span>
    </div>
  </div>
</template>

<script>
import { postPredict1, postPredict2 } from "../api";
export default {
  data() {
    return {
      methods: 0,
      step:"00:15",
      linkForm: {
        startLink: "",
        endLink: "",
      },
      linkRule: {
        startLink: [
          {
            required: true,
            message: "请输入起点",
            trigger: "blur",
          },
        ],
        endLink: [
          {
            required: true,
            message: "请输入终点",
            trigger: "blur",
          },
        ],
      },
      firstResult: {
        startLink: "",
        endLink: "",
        linkTime: "",
        path: [],
      },
      linkRes: false,
      linkError: false,
      allForm: {
        startLink: "",
        endLink: "",
        time: "08:00",
        slice: "",
      },
      allRule: {
        startLink: [
          {
            required: true,
            message: "请输入起点",
            trigger: "blur",
          },
        ],
        endLink: [
          {
            required: true,
            message: "请输入终点",
            trigger: "blur",
          },
        ],
        time: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        slice: [
          {
            required: true,
            message: "请选择时间片",
            trigger: "blur",
          },
        ],
      },
      allRes: false,
      allError: false,
      secondResult: {
        startLink: "",
        endLink: "",
        average_ata: "",
      },
      timeSlice: [
        {
          value: "60",
          label: "60分钟",
        },
        {
          value: "30",
          label: "30分钟",
        },
        {
          value: "15",
          label: "15分钟",
        },
      ],
    };
  },
  methods: {
    resetLinkForm() {
      this.$refs.linkForm.resetFields();
    },
    resetAllForm() {
      this.$refs.allForm.resetFields();
    },
    linkQuery() {
      this.$refs.linkForm.validate((valid) => {
        if (valid) {
          postPredict1(this.linkForm).then((res) => {
            this.firstResult = res.data.data;
            if (this.firstResult.linkTime === "Infinity") {
              this.linkRes = false;
              this.linkError = true;
            } else {
              this.linkRes = true;
              this.linkError = false;
            }
          });
        }
      });
    },
    allQuery() {
      this.$refs.allForm.validate((valid) => {
        if (valid) {
          postPredict2(this.allForm).then((res) => {
            this.secondResult = res.data.data;
            console.log(res.data);
            console.log(this.secondResult);
            if (this.secondResult.average_ata === null) {
              this.allRes = false;
              this.allError = true;
            } else {
              this.allRes = true;
              this.allError = false;
            }
          });
        }
      });
    },
  },
  computed: {
    
    path() {
      return "路线为：" + this.firstResult.path.join("->");
    },
  },
};
</script>

<style lang="less">
</style>