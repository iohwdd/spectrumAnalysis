<template>
    <div class="process-panel" :class="{ hidden: isHidden }">
      <div class="main-panel">
        <div class="op-panel">
          <div class="process-select">
            <span class="tag">选择光谱处理:</span>
            <el-select
              v-model="specMothod"
              placeholder="Select"
              size="large"
              style="width: 240px"
            >
              <el-option
                v-for="item in processList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="algorithm-select">
            <span class="tag">选择处理算法:</span>
            <el-select
              v-model="algoMethod"
              placeholder="Select"
              size="large"
              style="width: 240px"
            >
              <el-option
                v-for="item in algorithmList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-button type="primary">特征峰识别</el-button>
        </div>
        <div id="picture" class="spec-image"  style="width: 1000px;height:600px;"></div>
        <div class="res-panel">
          <el-button type="primary">重置光谱</el-button>
          <el-button type="primary">导出数据</el-button>
          <el-button type="primary">查看报告</el-button>
        </div>
      </div>

      <div class="aside-panel">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formDataRef"
          label-width="100px"
          @submit.prevent
        >
          <el-form-item>
            <div class="title">参数填写</div>
          </el-form-item>
          <el-form-item label="平滑方法" prop="">
            <el-input clearable placeholder="提示信息" v-model.trim="formData.x"></el-input>
          </el-form-item>
          <el-form-item label="降噪方法名称" prop="">
            <el-input clearable placeholder="提示信息" v-model.trim="formData.x"></el-input>
          </el-form-item>
          <el-form-item label="窗口大小" prop="">
            <el-input clearable placeholder="提示信息" v-model.trim="formData.x"></el-input>
          </el-form-item>
          <el-form-item label="阈值参数" prop="">
            <el-input clearable placeholder="提示信息" v-model.trim="formData.x"></el-input>
          </el-form-item>
          <el-form-item label="多项式阶数" prop="">
            <el-input clearable placeholder="提示信息" v-model.trim="formData.x"></el-input>
          </el-form-item>
          <el-form-item label="小波函数模型" prop="">
            <el-input clearable placeholder="提示信息" v-model.trim="formData.x"></el-input>
          </el-form-item>
          <el-form-item label="采样间隔" prop="">
            <el-input clearable placeholder="提示信息" v-model.trim="formData.x"></el-input>
          </el-form-item>
          <el-form-item label="分解层数" prop="">
            <el-input clearable placeholder="提示信息" v-model.trim="formData.x"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">处理</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>

  <script setup>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';

  const props = defineProps({
    isHidden: Boolean,
  });

  const formData = ref({});
  const formDataRef = ref();
  const rules = {
    title: [{ required: true, message: "请输入内容" }],
  };

  const specMothod = ref();
  const algoMethod = ref();
  const processList = ref([
    { label: '光谱基准线扣除', value: '0' },
    { label: '平滑降噪', value: '1' },
  ]);
  const algorithmList = ref([
    { label: '算法1', value: '0' },
    { label: '算法2', value: '1' },
  ]);

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

<style lang="scss" scoped>
.process-panel {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;

  .main-panel {
    width: 70%;
    display: flex;
    flex-direction: column;

    .op-panel {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .process-select,
      .algorithm-select {
        margin-right: 20px;
      }

      .tag {
        padding: 0px 10px;
      }

      .el-select {
        width: 240px;
      }

      .el-button {
        margin-left: auto;
      }
    }
    .spec-image {
      width: 100%;
      height: 600px;
    }
    .res-panel {
      display: flex;
      justify-content: flex-end;
      margin-top: auto;

      .el-button {
        margin-right: 15px;
      }
    }
  }

  .aside-panel {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 0; /* 使整个aside-panel在垂直方向上居中 */

    .el-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
      }

      .el-form-item {
        width: 80%;
        margin-bottom: 20px;

        .el-input {
          width: 100%;
        }

        .el-button {
          width: 100%;
        }
      }
    }
  }
}

.hidden {
  display: none;
}

</style>