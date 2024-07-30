<template>
  <!-- 第一个页面 -->
  <div class="ModelAnalysis" :class="{ hidden1: isHidden1 }">
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拉到此处或 <em> 点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">仅支持XLSX文件类型</div>
      </template>
    </el-upload>

    <el-button
      type="primary"
      @click="toModelAnalysis2()"
      style="margin-left: 600px; margin-top: 50px; width: 160px; height: 50px"
      >开始建模分析</el-button
    >
  </div>

  <!-- 第二个页面 -->
  <div class="ModelAnalysis" :class="{ hidden2: isHidden2 }">
    <!-- <el-cascader :options="options">
  <template #default="{ node, data }">
    <span>{{ data.label }}</span>
    <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
  </template>
</el-cascader> -->

    <!-- <el-cascader-panel style="width: fit-content; margin-left: 100px; margin-top: 50px;" :options="options" /> -->
    <div class="header">
      请选择模型：
      <el-cascader
        :options="options"
        v-model="selectedValue"
        @change="handleChange"
      />
      <!--
    结果选择：
    <el-cascader :options="options2" clearable />       -->
    </div>

    <div class="left">
      <el-button
        type="primary"
        @click="dialog = true"
        plain
        style="height: 300px; width: 40px; margin: 0"
      >
        <h5 style="writing-mode: vertical-rl; text-align-last: justify">
          查看全部模型
        </h5></el-button
      >

      <el-drawer
        v-model="dialog"
        title="光谱模型"
        :before-close="handleClose"
        direction="ltr"
        class="demo-drawer"
      >
        <div class="demo-drawer__content">
          <div class="left-left-demo">
            <div class="left-left-demo-header">
              <p style="margin: 0; font-weight: 700">
                <el-icon><Star /></el-icon>1 &nbsp;&nbsp;树
              </p>
            </div>

            <div class="left-left-demo-main">
              <p style="margin: 0">上次更改：&nbsp;精细树</p>
            </div>
          </div>

          <div class="left-left-demo">
            <div class="left-left-demo-header">
              <p style="margin: 0; font-weight: 700">
                <el-icon><Star /></el-icon>2 &nbsp;&nbsp;线性回归
              </p>
            </div>

            <div class="left-left-demo-main">
              <p style="margin: 0">上次更改：&nbsp;线性</p>
            </div>
          </div>

          <div class="left-left-demo">
            <div class="left-left-demo-header">
              <p style="margin: 0; font-weight: 700">
                <el-icon><Star /></el-icon>3 &nbsp;&nbsp;神经网络
              </p>
            </div>

            <div class="left-left-demo-main">
              <p style="margin: 0">上次更改：&nbsp;中型神经网络</p>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>

    <div class="main">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="参数一：">
          <el-input v-model="formInline.user" placeholder="请输入" clearable />
        </el-form-item>

        <el-form-item label="参数二：">
          <el-select v-model="formInline.region" placeholder="请选择" clearable>
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label="参数三：">
          <el-input v-model="formInline.user" placeholder="请输入" clearable />
        </el-form-item>

        <el-form-item label="参数四：">
          <el-input v-model="formInline.user" placeholder="请输入" clearable />
        </el-form-item>

        <el-form-item style="margin-top: 50px; margin-left: 550px">
          <el-button type="primary" @click="toModelAnalysis3()">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <!-- 第三个页面 -->
  <div class="ModelAnalysis" :class="{ hidden2: isHidden3 }">
    <div class="header-3">
      <div style="margin-left: 400px">
        结果选择：
        <el-cascader
          @change="handleChange"
          v-model="selectedOptions"
          :options="options2"
        />
      </div>

      <el-button
        type="primary"
        @click="toModelAnalysis3_2()"
        style="margin-left: 950px; width: 100px; margin-top: 20px"
        >新建模型</el-button
      >
    </div>

    <div class="left-3">
      <el-button
        type="primary"
        @click="dialog3 = true"
        plain
        style="height: 300px; width: 40px; margin: 0"
      >
        <h5 style="writing-mode: vertical-rl; text-align-last: justify">
          查看全部模型
        </h5></el-button
      >

      <el-drawer
        v-model="dialog3"
        title="光谱模型"
        direction="ltr"
        class="demo-drawer"
      >
        <div class="demo-drawer__content">
          <div class="left-left-demo-3">
            <div class="left-left-demo-header-3">
              <p style="margin: 0; font-weight: 700">
                <el-icon><Star /></el-icon>1 &nbsp;&nbsp;树
              </p>
            </div>

            <div class="left-left-demo-main-3">
              <p style="margin: 0">上次更改：&nbsp;精细树</p>
            </div>
          </div>

          <div class="left-left-demo-3">
            <div class="left-left-demo-header-3">
              <p style="margin: 0; font-weight: 700">
                <el-icon><Star /></el-icon>2 &nbsp;&nbsp;线性回归
              </p>
            </div>

            <div class="left-left-demo-main-3">
              <p style="margin: 0">上次更改：&nbsp;线性</p>
            </div>
          </div>

          <div class="left-left-demo-3">
            <div class="left-left-demo-header-3">
              <p style="margin: 0; font-weight: 700">
                <el-icon><Star /></el-icon>3 &nbsp;&nbsp;神经网络
              </p>
            </div>

            <div class="left-left-demo-main-3">
              <p style="margin: 0">上次更改：&nbsp;中型神经网络</p>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>

    <div
      id="chart"
      :class="{ hidden1: isHidden3_1 }"
      style="
        width: 800px;
        height: 500px;
        margin-left: 150px;
        margin-top: 100px;
        position: absolute;
      "
    ></div>

    <div
      id="chart2"
      :class="{ hidden2: isHidden3_2 }"
      style="
        width: 800px;
        height: 500px;
        margin-left: 150px;
        margin-top: 100px;
        position: absolute;
      "
    ></div>

    <div class="cardDAta">
      <div class="cardDAta-header-left">
        <h3 style="margin: 0">模型&nbsp;2:</h3>
      </div>

      <div class="cardDAta-header-right">
        <p style="margin: 0">线性回归</p>
      </div>

      <br />
      <br />

      &nbsp;&nbsp;&nbsp;&nbsp;状态：已训练

      <div class="cardDAta-xunlian">
        <h3 style="color: cornflowerblue; margin: 0">训练结果</h3>

        <div class="cardDAta-xunlian-demo1-left">
          <p style="margin: 0">RMSE(Validation)</p>
          <p style="margin: 0">R方(验证)</p>
          <p style="margin: 0">MSE(Validation)</p>
          <p style="margin: 0">MAE(Validation)</p>
          <p style="margin: 0">预测速度</p>
          <p style="margin: 0">训练时间</p>
        </div>

        <div class="cardDAta-xunlian-demo1-right">
          <p style="margin: 0">27.976</p>
          <p style="margin: 0">-4.77</p>
          <p style="margin: 0">782.63</p>
          <p style="margin: 0">14.409</p>
          <p style="margin: 0">~85obs/sec</p>
          <p style="margin: 0">6.1194秒</p>
        </div>
      </div>

      <div class="cardDAta-test">
        <h3 style="color: cornflowerblue; margin: 0">测试结果</h3>

        <div class="cardDAta-xunlian-demo1-left">
          <p style="margin: 0">RMSE(Test)</p>
          <p style="margin: 0">R方(测试)</p>
          <p style="margin: 0">MSE(Test)</p>
          <p style="margin: 0">MAE(Test)</p>
        </div>

        <div class="cardDAta-xunlian-demo1-right">
          <p style="margin: 0">3.9595</p>
          <p style="margin: 0">0.90</p>
          <p style="margin: 0">15.678</p>
          <p style="margin: 0">3.4686</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
const isHidden1 = ref(false)
const isHidden2 = ref(true)
const isHidden3 = ref(true)

//第一个页面信息
function toModelAnalysis2() {
  console.log(isHidden1)
  isHidden1.value = !isHidden1.value
  isHidden2.value = !isHidden2.value
  console.log(isHidden1)
}
function toModelAnalysis3() {
  console.log(isHidden1)
  isHidden2.value = !isHidden2.value
  isHidden3.value = !isHidden3.value
  console.log(isHidden1)
}
function toModelAnalysis3_2() {
  console.log(isHidden1)
  isHidden3.value = !isHidden3.value
  isHidden2.value = !isHidden2.value
  console.log(isHidden1)
}

//第二个页面信息
const selectedValue = ref([])

const options = ref([
  {
    value: 'guide',
    label: '线性回归模型',
    children: [
      {
        value: 'test01',
        label: '线性'
      },
      {
        value: 'test02',
        label: '交互效应线性'
      },
      {
        value: 'test03',
        label: '稳健线性'
      },
      {
        value: 'test04',
        label: '逐步线性'
      },
      {
        value: 'test05',
        label: '全部线性'
      }
    ]
  },
  {
    value: 'component',
    label: '回归树',
    children: [
      {
        value: 'basic',
        label: '精细树'
      },
      {
        value: 'form',
        label: '中等树'
      },
      {
        value: 'data',
        label: '粗略树'
      },
      {
        value: 'notice',
        label: '全部树'
      },
      {
        value: 'navigation',
        label: '可优化树'
      }
    ]
  },
  {
    value: 'resource',
    label: '支持向量机',
    children: [
      {
        value: 'axure',
        label: '线性SVM'
      },
      {
        value: 'sketch',
        label: '二次SVM'
      },
      {
        value: 'docs',
        label: '三次SVM'
      },
      {
        value: 'docs',
        label: '精细高斯SVM'
      },
      {
        value: 'docs',
        label: '中等高斯SVM'
      },
      {
        value: 'docs',
        label: '粗略高斯SVM'
      },
      {
        value: 'docs',
        label: '全部SVM'
      },
      {
        value: 'docs',
        label: '可优化SVM'
      }
    ]
  },
  {
    value: 'resource',
    label: '高斯过程回归模型',
    children: [
      {
        value: 'axure',
        label: '二次有理'
      },
      {
        value: 'sketch',
        label: '平方指数'
      },
      {
        value: 'docs',
        label: 'Matern5/2'
      },
      {
        value: 'docs',
        label: '指数'
      },
      {
        value: 'docs',
        label: '全部GPR'
      },
      {
        value: 'docs',
        label: '可优化GPR'
      }
    ]
  },
  {
    value: 'resource',
    label: '核逼近回归模型',
    children: [
      {
        value: 'axure',
        label: 'SVM核'
      },
      {
        value: 'sketch',
        label: '最小二乘核回归'
      },
      {
        value: 'docs',
        label: '所有核'
      }
    ]
  },
  {
    value: 'resource',
    label: '树集成',
    children: [
      {
        value: 'axure',
        label: '提升树'
      },
      {
        value: 'sketch',
        label: '装袋树'
      },
      {
        value: 'docs',
        label: '全部集成'
      },
      {
        value: 'docs',
        label: '可优化集成'
      }
    ]
  },
  {
    value: 'resource',
    label: '神经网络',
    children: [
      {
        value: 'axure',
        label: '窄神经网络'
      },
      {
        value: 'sketch',
        label: '中型神经网络'
      },
      {
        value: 'docs',
        label: '宽神经网络'
      },
      {
        value: 'docs',
        label: '双层神经网络'
      },
      {
        value: 'docs',
        label: '三层神经网络'
      },
      {
        value: 'docs',
        label: '所有神经网络'
      },
      {
        value: 'docs',
        label: '可优化的神经网络'
      }
    ]
  }
])

// function handleChange(value) {
//   console.log('Selected value:', value.value); // 用户选择的value
// }

const formInline = reactive({
  user: '',
  region: '',
  date: ''
})

const test = () => {}

// 抽屉信息
import { ElDrawer, ElMessageBox } from 'element-plus'

const formLabelWidth = '80px'
let timer

const dialog = ref(false)

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const onClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    dialog.value = false
  }, 400)
}

const cancelForm = () => {
  loading.value = false
  dialog.value = false
  clearTimeout(timer)
}

//第三个页面的信息
// 图表
import * as echarts from 'echarts'
import { onMounted, onUnmounted } from 'vue'
import ecStat from 'echarts-stat'
// 你可以使用 ref 来存储 ECharts 实例，以便在需要时访问或销毁它
const chartRef = ref(null)

onMounted(() => {
  console.log('组件已挂载！')
  // 确保 DOM 元素存在
  const chartDom = document.getElementById('chart')
  if (chartDom) {
    // 初始化 ECharts 实例
    chartRef.value = echarts.init(chartDom)
    echarts.registerTransform(ecStat.transform.regression)
    // 设置图表选项
    chartRef.value.setOption({
      title: {
        text: '实际值-预测值'
      },
      xAxis: {
        type: 'value',
        name: '真实响应',
        min: -5, // 设置 x 轴的最小值为 -5
        max: 45 // 设置 x 轴的最大值为 45
      },
      yAxis: {
        type: 'value',
        name: '预测响应',
        min: -5, // 设置 x 轴的最小值为 -5
        max: 45 // 设置 x 轴的最大值为 45
      },
      series: [
        {
          symbolSize: 20,
          data: [
            [2, -2],
            [4, 0],
            [12.0, 11.2],
            [15.8, 18.81],
            [22.2, 25.6],
            [28, 33.3],
            [30, 35],
            [33, 33]
          ],
          type: 'scatter'
        },
        // y = x 的线系列
        {
          type: 'line',
          // 设置线条样式
          lineStyle: {
            color: 'green', // 线条颜色
            width: 2 // 线条宽度
          },
          // 由于 y = x 是一条过原点的直线，我们只需要两个点来确定它
          // 这里我们使用图表的 x 轴和 y 轴的最小值和最大值来确定线的范围
          data: (function () {
            // 假设 xAxis 和 yAxis 的最小值和最大值可以通过 option 中的其他配置获得
            // 这里我们只是假设它们为某个值
            var xAxisMin = 0
            var xAxisMax = 20
            var yAxisMin = 0
            var yAxisMax = 20

            // 返回线的数据点
            return [
              [-5, -5],
              [45, 45]
            ]
          })(),
          // 隐藏标记点（如果需要的话）
          symbol: 'none',
          // 隐藏提示框（如果需要的话）
          tooltip: {
            trigger: 'none'
          }
        }
      ]
    })
  }

  const chartDom2 = document.getElementById('chart2')
  if (chartDom) {
    // 初始化 ECharts 实例
    chartRef.value = echarts.init(chartDom2)
    echarts.registerTransform(ecStat.transform.regression)
    // 设置图表选项
    chartRef.value.setOption({
      title: {
        text: '验证残差图'
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 40,
        name: '真实响应'
      },
      yAxis: {
        type: 'value',
        min: -100,
        max: 100,
        name: '残差（Ytrain）'
      },
      series: [
        {
          symbolSize: 20,
          data: [
            [2, -2],
            [4, 0],
            [12.0, 11.2],
            [15.8, 18.81],
            [22.2, 25.6],
            [28, 33.3],
            [30, 35],
            [33, 33]
          ],
          type: 'scatter',
          markLine: {
            silent: true, // 是否响应和触发鼠标事件，默认为false，即响应和触发鼠标事件
            data: [
              { yAxis: 0 } // y=0 的线
            ],
            lineStyle: {
              color: 'green', // 线的颜色
              type: 'dashed' // 线的类型，这里设置为虚线
            }
          }
        }
      ]
    })
  }
})

const options2 = [
  {
    value: 'demo01',
    label: '验证结果',
    children: [
      {
        value: 'test01',
        label: '实际值-预测值（验证）'
      },
      {
        value: 'test02',
        label: '残差（验证）'
      }
    ]
  },
  {
    value: 'demo02',
    label: '测试结果',
    children: [
      {
        value: 'test03',
        label: '实际值-预测值（测试）'
      },
      {
        value: 'test04',
        label: '残差（测试）'
      }
    ]
  }
]

// 结果选择中根据用户的选择来选择性的展示图表
const selectedOptions = ref([]) // 绑定的值，存储用户的选择
const isHidden3_1 = ref(true)
const isHidden3_2 = ref(true)
function handleChange(value) {
  // 根据 value 的值来决定是否显示 div
  // 例如，如果 value 包含某个特定的值，就显示 div
  // console.log(value.includes('test01'))
  isHidden3_1.value = !value.includes('test01')
  isHidden3_2.value = !value.includes('test02')
  // debugger
  // console.log(isHidden1.value)
}

const dialog3 = ref(false)
</script>

<style lang="scss" scoped>
.hidden1 {
  display: none;
}
.hidden2 {
  display: none;
}
.ModelAnalysis {
  float: left;
  margin: 0;
  height: 800px;
  width: 1350px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}

.formLocation {
  float: left;
  margin-top: 50px;
  margin-left: 250px;
  height: 600px;
  width: 800px;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.header {
  // float: left;
  position: relative;
  margin-top: 10px;
  margin-left: 500px;
  height: 50px;
  width: 400px;
  border: 1px solid rgb(10, 10, 10);
}
.main {
  // float: left;
  position: relative;
  margin-top: 30px;
  margin-left: 300px;
  height: 500px;
  width: 800px;
  border: 1px solid rgb(10, 10, 10);
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.left {
  // position: fixed;
  float: left;
  margin-top: 100px;
  margin-left: 0px;
  height: 300px;
  width: 40px;
  // border: 1px solid rgb(10, 10, 10);
}
.left-left-demo {
  float: left;
  margin-top: 10px;
  margin-left: 0px;
  height: 60px;
  width: 450px;
  // border: 1px solid rgb(10, 10, 10);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}
.left-left-demo-header {
  float: left;
  margin-top: 5px;
  margin-left: 20px;
  height: 20px;
  width: 400px;
  // border: 1px solid rgb(10, 10, 10);
}
.left-left-demo:hover {
  background-color: lightblue;
}
.left-left-demo-main {
  float: left;
  margin-top: 10px;
  margin-left: 20px;
  height: 20px;
  width: 400px;
  // border: 1px solid rgb(10, 10, 10);
}

.header-3 {
  // float: left;
  position: relative;
  margin-top: 10px;
  margin-left: 50px;
  height: 100px;
  width: 90%;
  // border: 1px solid rgb(10, 10, 10);
}
.header-left {
  // float: left;
  position: relative;
  margin-top: 10px;
  margin-left: 50px;
  height: 50px;
  width: 80px;
  border: 1px solid rgb(10, 10, 10);
}
.main {
  // float: left;
  position: relative;
  margin-top: 30px;
  margin-left: 300px;
  height: 500px;
  width: 800px;
  border: 1px solid rgb(10, 10, 10);
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.left-3 {
  // position: fixed;
  float: left;
  margin-top: 100px;
  margin-left: 0px;
  height: 300px;
  width: 40px;
  // border: 1px solid rgb(10, 10, 10);
}
.left-left-demo-3 {
  float: left;
  margin-top: 10px;
  margin-left: 0px;
  height: 60px;
  width: 450px;
  // border: 1px solid rgb(10, 10, 10);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}
.left-left-demo-header-3 {
  float: left;
  margin-top: 5px;
  margin-left: 20px;
  height: 20px;
  width: 400px;
  // border: 1px solid rgb(10, 10, 10);
}
.left-left-demo-3:hover {
  background-color: lightblue;
}
.left-left-demo-main-3 {
  float: left;
  margin-top: 10px;
  margin-left: 20px;
  height: 20px;
  width: 400px;
  // border: 1px solid rgb(10, 10, 10);
}
.cardDAta {
  position: absolute;
  margin-top: 100px;
  margin-left: 1000px;
  height: 450px;
  width: 300px;
  // border: 1px solid rgb(10, 10, 10);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  background-color: antiquewhite;
}
.cardDAta-header-left {
  float: left;
  margin-left: 20px;
  // border: 1px solid rgb(10, 10, 10);
}
.cardDAta-header-right {
  float: left;
  margin-left: 10px;
  margin-top: 4px;
  // border: 1px solid rgb(10, 10, 10);
}
.cardDAta-xunlian {
  float: left;
  margin-left: 20px;
  margin-top: 4px;
  width: 270px;
  height: 160px;
  // border: 1px solid rgb(10, 10, 10);
}
.cardDAta-xunlian-demo1-left {
  float: left;
  margin-left: 0px;
  margin-top: 4px;
  width: 150px;
  height: 130px;
  // border: 1px solid rgb(10, 10, 10);
}
.cardDAta-xunlian-demo1-right {
  float: left;
  margin-left: 10px;
  margin-top: 4px;
  width: 100px;
  height: 130px;
  // border: 1px solid rgb(10, 10, 10);
}
.cardDAta-test {
  float: left;
  margin-left: 20px;
  margin-top: 20px;
  width: 270px;
  height: 160px;
  // border: 1px solid rgb(10, 10, 10);
}
</style>
