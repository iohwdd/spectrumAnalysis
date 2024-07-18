<template>
  <div class="ModelAnalysis" :class="{hidden:isHidden}">
    <div class="formLocation">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item style="margin-top: 10px;" label="光谱名称：">
          <el-input v-model="formData.name" placeholder="请输入光谱名称" clearable />
        </el-form-item>
        <el-form-item style="margin-top: 10px;" label="光谱类型：">
          <el-select v-model="formData.type" placeholder="请输入光谱类型" clearable>
            <el-option label="拉曼光谱" value="1" />
            <el-option label="红外光谱" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top: 10px;" label="设备型号：">
          <el-input v-model="formData.id" placeholder="请输入设备型号" clearable />
        </el-form-item>
        <el-form-item style="margin-top: 10px;" label="被检测物：">
          <el-input v-model="formData.content" placeholder="请输入被检测物" clearable />
        </el-form-item>
        <el-form-item style="margin-top: 10px;" label="检测成分：">
          <el-input v-model="formData.component" placeholder="请输入检测成分" clearable />
        </el-form-item>
        <el-form-item style="margin-top: 10px;" label="采用标准：">
          <el-select v-model="formData.standard" placeholder="请选择采用标准" clearable>
            <el-option label="ASTM" value="1" />
            <el-option label="ISO" value="2" />
            <el-option label="国家标准" value="3" />
            <el-option label="其他" value="4" />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item style="margin-top: 10px;" label="上传测试文件：">
          <el-upload
            v-model:file-list="formData.testFile"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
          >
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">仅支持Excel文件</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-top: 10px;margin-left: 100px" label="上传训练文件：">
          <el-upload
            v-model:file-list="formData.trainFile"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
          >
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">仅支持Excel文件</div>
            </template>
          </el-upload>
        </el-form-item>
        <br>
        <el-form-item style="margin-left: 520px">
          <el-button type="primary" @click="onSubmit">开始建模分析</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <ModelReport :isHidden="!isHidden"></ModelReport>
</template>

<script setup>
import { ref } from 'vue'
import ModelReport from './ModelReport.vue'
const formData = ref({
  name: '',
  type: '',
  id: '',
  content: '',
  component: '',
  standard: '',
  testFile: [],
  trainFile: []
});

const handlePreview = (file) => {
  console.log('Preview file:', file);
}

const handleRemove = (file, fileList) => {
  console.log('Remove file:', file, fileList);
}

const beforeRemove = (file, fileList) => {
  return window.confirm(`Are you sure to remove ${file.name}?`);
}

const handleExceed = (files, fileList) => {
  window.alert('You can only upload up to 3 files');
}

const isHidden = ref(false)
const onSubmit = () => {
  console.log('submit!', formData.value);
  isHidden.value = true
}
</script>

<style lang="scss" scoped>
.ModelAnalysis {
  float: left;
  margin: 0;
  height: 800px;
  width: 1350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
.hidden{
  display: none;
}
</style>
