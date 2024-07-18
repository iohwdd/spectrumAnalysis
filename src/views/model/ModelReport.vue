<template>

    <div class="ModelAnalysis" :class="{hidden:isHidden}">
      <el-card style="width: 1350px;height: 350px; margin-left: 0; border-radius: 8px;" shadow="always">
        <p style="font-weight: 900; margin: 0;">分析报告</p>
        <br>

      <div class="cloumn1">
        <p style="margin-bottom: 10px;margin-top: 0;">光谱名称：————</p>
        <p style="margin-bottom: 10px;margin-top: 0;">被检测物：————</p>
        <p style="margin-bottom: 10px;margin-top: 0;">波长范围：——nm——nm</p>
      </div>

      <div class="cloumn2">
        <p style="margin-bottom: 10px;margin-top: 0;">光谱类型：————</p>
        <p style="margin-bottom: 10px;margin-top: 0;">检测范围：————</p>
        <p style="margin-bottom: 10px;margin-top: 0;">分辨率：——nm</p>
      </div>

      <div class="cloumn3">
        <p style="margin-bottom: 10px;margin-top: 0;">设备型号：————</p>
        <p style="margin-bottom: 10px;margin-top: 0;">采用标准：————</p>
      </div>

      <br>
      <br>
      <br>
      <br>
      <br>
      <br>

      <p style="font-weight: 900; margin: 0;">光谱处理</p>

      <br>

      <div class="cloumn1">
        <p style="margin-bottom: 10px;margin-top: 0;">预处理：————</p>
        <p style="margin-bottom: 10px;margin-top: 0;">误差：———%</p>
      </div>

      <div class="cloumn2">
        <p style="margin-bottom: 10px;margin-top: 0;">特征选择：————</p>
      </div>

      <div class="cloumn3">
        <p style="margin-bottom: 10px;margin-top: 0;">模型选择：————</p>
      </div>

      </el-card>

    <div>

      <div class="canshu1">
        <h3 style="margin: 0">训练参数</h3>

        <el-table :data="tableData" border="true" style="width: 200px;margin-left: 100px;">
        <el-table-column prop="date" label="峰强度" width="100px" />
        <el-table-column prop="name" label="波强" width="100px" />
        </el-table>
      </div>


      <div class="canshu2">
        <h3 style="margin: 0">测试参数</h3>

        <el-table :data="tableData" border="true" style="width: 200px;margin-left: 100px;">
        <el-table-column prop="date" label="峰强度" width="100px" />
        <el-table-column prop="name" label="波强" width="100px" />
        </el-table>
      </div>



    </div>

    <div id="picture" class="spec-image"  style="width: 1000px;height:600px;"></div>
    </div>

  </template>


<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts';

const props = defineProps({
    isHidden:Boolean
})
const tableData = [
{
    date: '63',
    name: '96',
},
{
    date: '63',
    name: '96',
},
{
    date: '63',
    name: '96',
},
{
    date: '63',
    name: '96',
},
{
    date: '63',
    name: '96',
},
{
    date: '63',
    name: '96',
},
]
onMounted(() => {
    // 模拟生成光谱数据
    function generateSpectralData() {
        const data = [];
        const peakWavelength = 550; // 峰值波长
        const peakIntensity = 1000; // 峰值光强
        const stdDev = 50; // 标准差

        for (let i = 400; i <= 700; i++) {
            const intensity = peakIntensity * Math.exp(-Math.pow(i - peakWavelength, 2) / (2 * stdDev * stdDev));
            data.push(intensity);
        }

        return data;
    }
    const chartDom = document.getElementById('picture');
    const myChart = echarts.init(chartDom);
    const option = {
    title: {
        text: '光谱图',
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['光谱数据'],
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '波长 (nm)',
        data: Array.from({ length: 301 }, (_, i) => (400 + i).toString()), // 从400nm到700nm，每隔1nm
    },
    yAxis: {
        type: 'value',
        name: '光强 (a.u.)',
    },
    series: [
        {
        name: '光谱数据',
        type: 'line',
        data: generateSpectralData(),
        },
    ],
    };
    myChart.setOption(option);

  });
</script>

<style>
.hidden {
    display: none;
}
.ModelAnalysis{
        float: left;
        margin: 0;
        height: 1800px;
        width: 1380px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 8px;
}
.cloumn1{
/* border: 1px solid rgb(10, 10, 10);  */
        float: left;
        margin-left: 30px;
        height: 100px;
        width: 250px;
}
.cloumn2{
/* border: 1px solid rgb(10, 10, 10);  */
        float: left;
        margin-left: 200px;
        height: 100px;
        width: 250px;
}
.cloumn3{
/* border: 1px solid rgb(10, 10, 10);  */
        float: left;
        margin-left: 200px;
        height: 100px;
        width: 250px;
}
.canshu1{
/* border: 1px solid rgb(10, 10, 10);  */
        float: left;
        margin-left: 100px;
        margin-top: 80px;
        height: auto;
        width: auto;
}
.canshu2{
/* border: 1px solid rgb(10, 10, 10);  */
        float: left;
        margin-left: 300px;
        margin-top: 80px;
        height: auto;
        width: auto;
}
.spec-image {

}
</style>
