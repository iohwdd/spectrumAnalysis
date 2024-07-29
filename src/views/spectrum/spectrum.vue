<template>
  <div :class="{ hidden: isHidden }">
    <div class="data-panel">
      <div class="title">检测光谱信息</div>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="80px"
        @submit.prevent
      >
        <el-form-item label="光谱名称" prop="spectrumName">
          <el-input
            clearable
            placeholder="请填写光谱名称"
            v-model.trim="formData.spectrumName"
          ></el-input>
        </el-form-item>
        <el-form-item label="光谱类别" prop="type">
          <el-select
            v-model="formData.type"
            placeholder="选择光谱类别"
            size="large"
            style="width: 350px"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="采用标准" prop="standard">
          <el-select
            v-model="formData.standard"
            placeholder="选择采用标准"
            size="large"
            style="width: 350px"
          >
            <el-option
              v-for="item in stdList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="检测物质" prop="substance">
          <el-input
            clearable
            placeholder="请填写检测物质"
            v-model.trim="formData.substance"
          ></el-input>
        </el-form-item>
        <el-form-item label="检测成分" prop="component">
          <el-input
            clearable
            placeholder="请填写检测成分"
            v-model.trim="formData.component"
          ></el-input>
        </el-form-item>
        <el-form-item label="光谱描述" prop="desc">
          <el-input
            clearable
            placeholder="请填写光谱描述"
            v-model.trim="formData.desc"
          ></el-input>
        </el-form-item>
        <el-form-item label="光谱文件" prop="dataFile">
          <el-upload
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            accept=".xlsx"
          >
            <el-button type="primary">选择光谱数据文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                xlsx files with a size less than 10MB.
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="simulateUpload" type="primary">上传</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider class="divider" />
    <div class="history-panel">
      <div class="title">历史操作记录</div>
        <div class="demo-date-picker">
          <div class="block">
            <el-date-picker
              v-model="dataRange"
              type="daterange"
              start-placeholder="Start Date"
              end-placeholder="End Date"
            />
            <el-button type="primary" style="margin-left: 10px;">搜索</el-button>
          </div>
    </div>
      <Table
        class="history-table"
        :columns="columns"
        :showPagination="true"
        :dataSource="tableData"
        :options="tableOptions"
        :fetch="loadDataList"
      >
        <template #specId="{ index, row }">
          <div>{{ row.specId }}</div>
        </template>
        <template #spectrumName="{ index, row }">
          <div>{{ row.spectrumName }}</div>
        </template>
        <template #type="{ index, row }">
          <div>{{ row.type }}</div>
        </template>
        <template #standard="{ index, row }">
          <div>{{ row.standard }}</div>
        </template>
        <template #substance="{ index, row }">
          <div>{{ row.substance }}</div>
        </template>
        <template #component="{ index, row }">
          <div>{{ row.component }}</div>
        </template>
        <template #time="{ index, row }">
          <div>{{ row.time }}</div>
        </template>
        <template #op="{ index, row }">
          <div>
            <span class="a-link">导入</span>
            <span class="a-link">下载</span>
            <span class="a-link">删除</span>
          </div>
        </template>
      </Table>
    </div>
  </div>
  <SpectrumProcess :isHidden="!isHidden" @show="show"></SpectrumProcess>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import SpectrumProcess from './SpectrumProcess.vue';
import { ElMessage } from 'element-plus';
const dataRange = ref()

const router = useRouter();
const isHidden = ref(false);
const formDataRef = ref(null);

const formData = ref({
  spectrumName: '',
  type: '',
  standard: '',
  substance: '',
  component: '',
  desc: ''
});

const rules = {
  spectrumName: [{ required: true, message: '请输入光谱名称' }],
  type: [{ required: true, message: '请选择光谱类别' }],
  standard: [{ required: true, message: '请选择采用标准' }],
  substance: [{ required: true, message: '请输入检测物质' }],
  component: [{ required: true, message: '请输入检测成分' }],
  desc: [{ required: true, message: '请输入光谱描述' }]
};

const columns = [
  { label: '光谱名称', prop: 'spectrumName', width: 200, scopedSlots: 'spectrumName' },
  { label: '光谱类别', prop: 'type', width: 200, scopedSlots: 'type' },
  { label: '采用标准', prop: 'standard', width: 200, scopedSlots: 'standard' },
  { label: '检测物质', prop: 'substance', width: 200, scopedSlots: 'substance' },
  { label: '检测成分', prop: 'component', width: 200, scopedSlots: 'component' },
  { label: '导入时间', prop: 'time', width: 200, scopedSlots: 'time' },
  { label: '操作', prop: 'op', width: 140, scopedSlots: 'op' }
];

const tableData = {
  totalCount: 3,
  pageSize: 50,
  pageNo: 1,
  pageTotal: 1,
  list: []
};

tableData.list = [
  { specId: '1', spectrumName: '光谱名称1', type: '光谱类型1', standard: '采用标准1', substance: '被检测物1', component: '检测成分1', time: '2024-7-22' },
  { specId: '1', spectrumName: '光谱名称1', type: '光谱类型1', standard: '采用标准1', substance: '被检测物1', component: '检测成分1', time: '2024-7-22' },
  { specId: '1', spectrumName: '光谱名称1', type: '光谱类型1', standard: '采用标准1', substance: '被检测物1', component: '检测成分1', time: '2024-7-22' },
  { specId: '1', spectrumName: '光谱名称1', type: '光谱类型1', standard: '采用标准1', substance: '被检测物1', component: '检测成分1', time: '2024-7-22' },
  { specId: '1', spectrumName: '光谱名称1', type: '光谱类型1', standard: '采用标准1', substance: '被检测物1', component: '检测成分1', time: '2024-7-22' },
  // Add more items as needed
];

const typeList = ref([
  { label: '拉曼光谱', value: '0' },
  { label: '红外光谱', value: '1' }
]);

const stdList = ref([
  { label: 'ISO', value: '0' },
  { label: '国标', value: '1' }
]);

const simulateUpload = () => {
  isHidden.value = true;
};

const show = () => {
  if (formDataRef.value) {
    formDataRef.value.resetFields();
  }
  isHidden.value = false;
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
.a-link {
  margin-left: 5px;
  color: #409eff;
  text-decoration: none;
  cursor: pointer;
}
.title {
  font: bold 24px Arial, sans-serif;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  text-align: center;
  padding: 10px 0;
  display: inline-block;
}
.divider {
  margin: 10px 0 5px;
}
.data-panel .el-form-item {
  width: 30%;
}
.data-panel {
  .el-button{
    width:100%;
  }
}
.data-panel .el-input {
  height: 40px;
}
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
