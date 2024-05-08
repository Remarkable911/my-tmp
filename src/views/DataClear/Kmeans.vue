<template>
  <div ></div>
</template>

<script>
import * as echarts from 'echarts';
// import 'echarts-gl';
import axios from 'axios';

export default {
  data() {
    return {
      ROOT_PATH: 'https://echarts.apache.org/examples',
      CHUNK_COUNT: 32,
      dataCount: 0,
      myChart: null,
      option: {
        progressive: 20000,
        backgroundColor: '#111',
        geo: {
          center: [-74.04327099998152, 40.86737600240287],
          zoom: 360,
          map: 'world',
          roam: true,
          silent: true,
          itemStyle: {
            normal: {
              color: 'transparent',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1
            }
          }
        },
        series: [
          {
            type: 'linesGL',
            coordinateSystem: 'geo',
            blendMode: 'lighter',
            dimensions: ['value'],
            data: new Float64Array(),
            polyline: true,
            large: true,
            lineStyle: {
              color: 'orange',
              opacity: 0.3
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('main'));
    this.fetchData(0);
  },
  methods: {
    async fetchData(idx) {
      if (idx >= this.CHUNK_COUNT) {
        return;
      }

      const dataURL = this.ROOT_PATH + '/data/asset/data/links-ny/links_ny_' + idx + '.bin';

      try {
        const response = await axios.get(dataURL, { responseType: 'arraybuffer' });

        var rawData = new Float32Array(response.data);
        var data = new Float64Array(rawData.length - 2);
        var offsetX = rawData[0];
        var offsetY = rawData[1];
        var off = 0;
        var addedDataCount = 0;

        for (var i = 2; i < rawData.length; ) {
          var count = rawData[i++];
          data[off++] = count;
          for (var k = 0; k < count; k++) {
            var x = rawData[i++] + offsetX;
            var y = rawData[i++] + offsetY;
            data[off++] = x;
            data[off++] = y;
            addedDataCount++;
          }
        }

        this.myChart.appendData({
          seriesIndex: 0,
          data: data
        });

        this.dataCount += addedDataCount;
        this.fetchData(idx + 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 600px;
}
</style>
