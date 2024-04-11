<template>
  <div>
    <el-button type="primary">更新数据</el-button>
    <div class="mt-4">
      <h2>路段估值</h2>
      <el-form :inline="true" :model="linkForm" ref="linkForm">
        <el-form-item label="路段起点">
          <el-input
            v-model="linkForm.startId"
            placeholder="路段起点"
          ></el-input>
        </el-form-item>
        <el-form-item label="路段终点">
          <el-input v-model="linkForm.endId" placeholder="路段终点"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="linkQuery">查询</el-button>
          <el-button @click="resetLinkForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="firstResult"></div>
    <div class="mt-4">
      <h2>总体估值</h2>
      <el-form :inline="true" :model="allForm" ref="allForm">
        <el-form-item label="路段起点">
          <el-input v-model="allForm.startId" placeholder="路段起点"></el-input>
        </el-form-item>
        <el-form-item label="路段终点">
          <el-input v-model="allForm.endId" placeholder="路段终点"></el-input>
        </el-form-item>
        <el-form-item label="出行时间">
          <el-time-select
            v-model="time"
            :picker-options="{
              start: '00:00',
              step: step,
              end: '24:00',
            }"
            placeholder="选择时间"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="时间片">
          <el-select v-model="timeSliceValue" placeholder="请选择"  @change="updateStep">
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
          <el-button type="primary" @click="linkQuery">查询</el-button>
          <el-button @click="resetAllForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="secondResult"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkForm: {
        startId: "",
        endId: "",
      },
      allForm: {
        startId: "",
        endId: "",
      },
      time: "08:00",
      timeSliceValue:"",
      timeSlice:[{
        value:'60',
        label:'60分钟',
      },{
        value:'30',
        label:'30分钟',
      },{
        value:'15',
        label:'15分钟',
      }]
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
      console.log("submit!");
    },
    // 将分钟数转换为 'hh:mm' 格式
    minutesToHHMM(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    },
    // 当选择的时间片变化时更新 step 值
    updateStep() {
      this.$nextTick(() => {
        // 更新 el-time-select 的 step 属性
        // 使用 this.$refs.timeSelect 更新 el-time-select 的 step 属性
        this.$refs.timeSelect.updatePickerOptions({
          step: this.step
        });
      });
    }
  },
  computed: {
    step() {
      // 根据选择的时间片值计算 step 值（格式为 'hh:mm'）
      return this.timeSliceValue ? this.minutesToHHMM(this.timeSliceValue) : '00:15';
    }
  },
};
</script>

<style lang="less">
</style>