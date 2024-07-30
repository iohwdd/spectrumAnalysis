<template>
  <div class="process-panel" :class="{ hidden: isHidden }">
    <div class="main-panel">
      <div class="op-panel">
        <el-form
          :model="proFormData"
          :rules="proFormDataRules"
          ref="proFormDataRef"
          label-width="120px"
          @submit.prevent
        >
          <el-form-item label="选择处理方法:" prop="processMethod">
            <el-select
              v-model="proFormData.processMethod"
              placeholder="选择处理方法"
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
          </el-form-item>
          <el-form-item label="选择算法" prop="processAlgorithm">
            <el-select
              v-model="proFormData.processAlgorithm"
              placeholder="选择算法"
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
          </el-form-item>
        </el-form>
      </div>
      <div
        id="picture"
        class="spec-image"
        ref="specImageRef"
        style="width: 900px; height: 500px"
      ></div>

      <div class="res-panel">
        <el-popconfirm
          title="返回上一步将清空本次所有的处理操作，确定是否继续"
          @confirm="toForwoard"
        >
          <template #reference>
            <el-button type="primary" class="forward-btn">返回上一步</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary">重置光谱</el-button>
        <el-button type="primary">导出数据</el-button>
        <el-button type="primary" @click="exportToWord">查看报告</el-button>
        <el-button type="primary" @click="toModelAnalysis">建模分析</el-button>
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
          <el-input
            clearable
            placeholder="提示信息"
            v-model.trim="formData.x"
          ></el-input>
        </el-form-item>
        <el-form-item label="降噪方法名称" prop="">
          <el-input
            clearable
            placeholder="提示信息"
            v-model.trim="formData.x"
          ></el-input>
        </el-form-item>
        <el-form-item label="窗口大小" prop="">
          <el-input
            clearable
            placeholder="提示信息"
            v-model.trim="formData.x"
          ></el-input>
        </el-form-item>
        <el-form-item label="阈值参数" prop="">
          <el-input
            clearable
            placeholder="提示信息"
            v-model.trim="formData.x"
          ></el-input>
        </el-form-item>
        <el-form-item label="多项式阶数" prop="">
          <el-input
            clearable
            placeholder="提示信息"
            v-model.trim="formData.x"
          ></el-input>
        </el-form-item>
        <el-form-item label="小波函数模型" prop="">
          <el-input
            clearable
            placeholder="提示信息"
            v-model.trim="formData.x"
          ></el-input>
        </el-form-item>
        <el-form-item label="采样间隔" prop="">
          <el-input
            clearable
            placeholder="提示信息"
            v-model.trim="formData.x"
          ></el-input>
        </el-form-item>
        <el-form-item label="分解层数" prop="">
          <el-input
            clearable
            placeholder="提示信息"
            v-model.trim="formData.x"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSubmit">处理</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import JSZipUtils from 'jszip-utils'
import html2canvas from 'html2canvas'
import ImageModule from 'docxtemplater-image-module-free'
const props = defineProps({
  isHidden: Boolean
})

const formData = ref({})
const formDataRef = ref()
const rules = {
  title: [{ required: true, message: '请输入内容' }]
}

const proFormData = ref({})
const proFormDataRef = ref()
const proFormDataRules = {
  processMethod: [{ required: true, message: '请选择处理方法' }],
  processAlgorithm: [{ required: true, message: '请选择算法' }]
}
const specMothod = ref()
const algoMethod = ref()
const processList = ref([
  { label: '光谱基准线扣除', value: '光谱基准线扣除' },
  { label: '平滑降噪', value: '平滑降噪' },
  { label: '特征波长提取', value: '特征波长提取' }
])
const algorithmList = ref([
  { label: '算法1', value: '0' },
  { label: '算法2', value: '1' }
])
const emit = defineEmits(['show'])
const toForwoard = () => {
  emit('show')
  specMothod.value = ''
  algoMethod.value = ''
}
//操作记录
const opList = ref([])
//预处理记录
const preProcessMethodList = ref([])

//进行预处理
const doSubmit = () => {
  proFormDataRef.value.validate((valid) => {
    if (!valid) {
      return
    }
    opList.value.push({
      specMothod: specMothod.value,
      algoMothod: algoMethod.value
    })
    if (
      !preProcessMethodList.value.includes(specMothod.value) &&
      specMothod.value != '特征波长提取'
    ) {
      preProcessMethodList.value.push(specMothod.value)
    }
    specMothod.value = ''
    algoMethod.value = ''
  })
}
//导出word文档报告
const base64ToArrayBuffer = (base64) => {
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

const loadFile = (url, callback) => {
  JSZipUtils.getBinaryContent(url, callback)
}

const exportToWord = async () => {
  await convertDivToImage()

  // 模板文件路径
  const templateUrl = '/template.docx'

  // 加载模板文件
  loadFile(templateUrl, (error, content) => {
    if (error) {
      throw error
    }

    const zip = new PizZip(content)
    const imageModule = new ImageModule({
      // 图片的Base64编码，转换为二进制
      getImage: (tagValue) => {
        const base64 = tagValue.replace(/^data:image\/(png|jpeg);base64,/, '')
        return base64ToArrayBuffer(base64)
      },
      // 图片的尺寸，根据需要设置
      getSize: (tagValue) => {
        // 返回图片的尺寸，例如 [宽度, 高度]
        const widthInInches = 8 // 你可以根据需要调整宽度
        const heightInInches = (800 / 900) * widthInInches
        return [widthInInches * 72, heightInInches * 72] // 将英寸转换为点（1英寸 = 72点）
        //return [800, 600]; // 示例尺寸
      }
    })

    const doc = new Docxtemplater(zip, {
      modules: [imageModule]
    })
    // 定义模板中要替换的数据
    const data = {
      title: '拉曼光谱检测报告',
      date: new Date().toLocaleDateString(),
      standard: '采用标准1',
      substance: '被检测物1',
      component: '检测成分1',
      preProcessMethod: preProcessMethodList.value.join(' '),
      CharacteristicWavelength: '245 135 532 942',
      image: imageBase64.value
    }

    doc.setData(data)

    try {
      // 渲染文档
      doc.render()
    } catch (error) {
      const e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties
      }
      console.log(JSON.stringify({ error: e }))
      throw error
    }

    // 生成文档的二进制数据
    const out = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })

    // 保存文档
    saveAs(out, 'report.docx')
  })
}
//
const specImageRef = ref()
const imageBase64 = ref('') // 用于保存图片的Base64编码
const convertDivToImage = () => {
  return new Promise((resolve, reject) => {
    if (specImageRef.value) {
      html2canvas(specImageRef.value)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png')
          imageBase64.value = imgData
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      reject(new Error('specImageRef.value is null or undefined'))
    }
  })
}
const toModelAnalysis = () => {}

// 模拟生成光谱数据
function generateSpectralData() {
  const data = []
  const peakWavelength = 550 // 峰值波长
  const peakIntensity = 1000 // 峰值光强
  const stdDev = 50 // 标准差

  for (let i = 400; i <= 700; i++) {
    const intensity =
      peakIntensity *
      Math.exp(-Math.pow(i - peakWavelength, 2) / (2 * stdDev * stdDev))
    data.push(intensity)
  }

  return data
}
// 光谱图详细数据
const option = {
  title: {
    text: '光谱图'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['光谱数据']
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    name: '波长 (nm)',
    data: Array.from({ length: 301 }, (_, i) => (400 + i).toString()) // 从400nm到700nm，每隔1nm
  },
  yAxis: {
    type: 'value',
    name: '光强 (a.u.)'
  },
  series: [
    {
      name: '光谱数据',
      type: 'line',
      data: generateSpectralData()
    }
  ]
}
onMounted(() => {
  const chartDom = document.getElementById('picture')
  const myChart = echarts.init(chartDom)
  myChart.setOption(option)
})
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
      .el-form {
        display: flex;
        margin: 0px 5px;
      }
    }
    .spec-image {
      width: 100%;
      height: 600px;
    }

    .res-panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .res-panel .forward-btn {
      margin-right: auto; /* 将 forward-btn 推到左侧 */
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
