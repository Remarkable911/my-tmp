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
              <h6>平均用时:{{link["linkTime"]}}</h6>
              <h6>通行状态:{{ link["linkStatus"] }}</h6>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          link路段的车流量统计（link表中的linkid的count值）表格
          
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card class="box-card mb-4" >
          把路段表放在这儿
        </el-card>
        <el-card class="box-card">
          天气表
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNum: 123,
      addOrder: 123,
      link: { linkId: 123, linkTime: 123, linkStatus: 1 },
    };
  },
  components:{

  },
  methods:{

  },
  computed:{

  }
};
</script>

<style lang="less">
</style>