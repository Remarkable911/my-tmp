<template>
  <div>
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="日期：" prop="date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          :value="searchForm.date"
          @input="updateDate"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="司机编号：" prop="driveid">
        <el-input
          @blur="$trimInput"
          @input="$trimInput"
          v-model="searchForm.driveid"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="manage">
      <el-dialog
        title="合并路线图"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose"
      >
        <el-button @click="mergeOption"> 点击合并 </el-button>
        <div>
          <div
            ref="orderLinkChart"
            class="bg-slate-300"
            style="width: 1020px; height: 500px"
          ></div>
        </div>
      </el-dialog>
    </div>
    <el-table :data="orderTable" class="mt-2" style="width: 100%">
      <el-table-column
        v-for="(val, key) in tableLabel"
        :key="key"
        :prop="key"
        :label="val"
        width="155"
      />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="mergeLink(scope.row)" size="mini"
            >查看合并路线</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMerge, postMerge, postMergeQuery } from "@/api";
import * as echarts from "echarts";
import { formatTime } from "@/utils/formatTime";
export default {
  data() {
    return {
      searchForm: {
        date: null,
        formattedDate: null,
        driveid: null,
      },
      tableLabel: {
        orderid: "订单编号",
        ata: "真实行程总时间",
        distance: "路线距离",
        driverid: "司机编号",
        sliceid: "出发时间",
        date: "日期",
      },
      tableData: [
        {
          orderid: "订单编号",
          ata: "真实行程总时间",
          distance: "路线距离",
          driverid: "司机编号",
          sliceid: "出发时刻时间片编号",
          date: "日期",
        },
      ],
      dialogVisible: false,
      linkList: [],
      categories: [],
    };
  },
  methods: {
    updateDate(value) {
      // 将选择的日期更新到 form.date
      this.searchForm.date = value;
      // 获取日期字符串
      const dateStr = this.searchForm.date;
      // 将日期字符串转换为 Date 对象
      const dateObj = new Date(dateStr);
      // 获取年、月、日信息
      const year = dateObj.getFullYear();
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
      const day = ("0" + dateObj.getDate()).slice(-2);
      // 拼接成格式化后的日期字符串
      this.searchForm.formattedDate = `${year}-${month}-${day}`;
    },
    query() {
      if (this.searchForm.date || this.searchForm.driveid) {
        postMergeQuery(this.searchForm).then((res) => {
          console.log(res);
          this.tableData = res.data.data.order;
        });
      } else {
        this.$message.error("请选择日期或司机编号");
        getMerge().then((res) => {
          this.tableData = res.data.data.order;
        });
      }
    },
    mergeLink(row) {
      let orderid = row.orderid;
      postMerge({ orderid: orderid }).then((res) => {
        this.linkList = res.data.data.link;
        for (let i = 0; i < this.linkList.length / 5; i++) {
          this.categories.push({ name: (i + 1).toString() });
        }
        const linesData = this.linkList
          .map((item, index) => {
            if (index < this.linkList.length - 1) {
              return {
                source: item.linkid.toString(),
                target: this.linkList[index + 1].linkid.toString(),
              };
            }
            return null;
          })
          .filter((item) => item !== null);
        this.dialogVisible = true;
        this.$nextTick(() => {
          // 在下一次 DOM 更新循环结束之后执行初始化图表
          const myChart = echarts.init(this.$refs.orderLinkChart);
          const option = {
            renderer: "canvas",
            title: {
              text: "合并前轨迹图",
              top: "bottom",
              left: "right",
            },
            tooltip: {
              formatter: function (params) {
                const data = params.data;
                return (
                  "Link ID: " +
                  data.name +
                  "<br>" +
                  "Link Time: " +
                  data.linkTime
                );
              },
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: {},
              },
            },
            series: [
              {
                type: "graph",
                layout: "force",
                force: {
                  repulsion: 100,
                },
                data: this.linkGraphList.map((item) => ({
                  name: item.linkid,
                  linkTime: item.linktime,
                  category: item.sequence,
                  label: {
                    show: true,
                    position: "top",
                    formatter: "{b}",
                    fontSize: 12,
                    fontWeight: "bold",
                  },
                })),
                edges: linesData,
                categories: this.categories,
              },
            ],
          };
          // 使用配置项绘制图表
          myChart.setOption(option);
        });
      });
    },

    mergeOption() {
      const mergeLinesData = this.mergedLinkGraphList
        .map((item, index) => {
          if (index < this.mergedLinkGraphList.length - 1) {
            return {
              source: item.id.toString(),
              target: this.mergedLinkGraphList[index + 1].id.toString(),
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      this.$nextTick(() => {
        // 在下一次 DOM 更新循环结束之后执行初始化图表
        const myChart = echarts.init(this.$refs.orderLinkChart);
        const option = {
          renderer: "canvas",
          title: {
            text: "合并后轨迹图",
            top: "bottom",
            left: "right",
          },
          tooltip: {
            formatter: function (params) {
              const data = params.data;
              return (
                "Link ID: " + data.name + "<br>" + "Link Time: " + data.linkTime
              );
            },
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {},
            },
          },
          series: [
            {
              type: "graph",
              layout: "force",
              force: {
                repulsion: 100,
              },
              data: this.mergedLinkGraphList.map((item) => ({
                name: item.id,
                linkTime: item.linktime,
                label: {
                  show: true,
                  position: "top",
                  formatter: "{b}",
                  fontSize: 12,
                  fontWeight: "bold",
                },
              })),
              edges: mergeLinesData,
            },
          ],
        };
        // 使用配置项绘制图表
        myChart.setOption(option);
      });
      this.$message.success("合并成功");
      this.clickOk = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
  mounted() {
    getMerge().then((res) => {
      this.tableData = res.data.data.order;
    });
  },
  computed: {
    orderTable() {
      return this.tableData.map((item) => {
        // 将日期字符串转换为 Date 对象
        const dateObj = new Date(item.date);
        const create_at = new Date(item.create_at);
        // 获取年、月、日
        const dateYear = dateObj.getFullYear();
        const dateMonth = ("0" + (dateObj.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1，并且保证两位数格式
        const dateDay = ("0" + dateObj.getDate()).slice(-2); // 保证两位数格式
        const createYear = create_at.getFullYear();
        const createMonth = ("0" + (create_at.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1，并且保证两位数格式
        const createDay = ("0" + create_at.getDate()).slice(-2); // 保证两位数格式
        // 拼接成日期格式字符串
        const formattedDate = `${dateYear}-${dateMonth}-${dateDay}`;
        const createFormattedDate = `${createYear}-${createMonth}-${createDay}`;

        return {
          ...item,
          date: formattedDate,
          create_at: createFormattedDate,
        };
      });
    },
    linkGraphList() {
      return this.linkList.map((item) => {
        return {
          ...item,
          sequence: Math.floor(item.sequence / 5),
        };
      });
    },
    mergedLinkGraphList() {
      const mergedMap = new Map();
      // 遍历 linkGraphList，将 sequence 相同的对象进行合并
      this.linkGraphList.forEach((item) => {
        const id = item.sequence;
        if (mergedMap.has(id)) {
          // 如果已经存在相同 id 的对象，则将对应项求和
          const mergedItem = mergedMap.get(id);
          mergedItem.linktime += item.linktime;
        } else {
          // 如果不存在相同 id 的对象，则直接添加到 mergedMap 中
          const newItem = {
            id: item.sequence,
            linktime: item.linktime,
          };
          mergedMap.set(id, newItem);
        }
      });
      // 将 mergedMap 转换成数组返回
      return Array.from(mergedMap.values());
    },
  },
};
</script>

<style>
/* .manage{
  width: 900px;
} */
</style>