<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-form-item label="光谱名称">
          <el-input
            clearable
            placeholder="请输入光谱名称"
            v-model.trim="searchFormData.spectrumName"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="光谱类别">
          <el-cascader
            placeholder="请选择光谱类别"
            :options="algoTypeList"
            :props="algoProps"
            clearable
            v-model="searchFormData.spectrumType"
            :style="{ width: '100%' }"
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="loadDataList">搜索</el-button>
      </el-col>
    </el-row>
    <Table
      :columns="columns"
      :showPagination="true"
      :dataSource="tableData"
      :options="tableOptions"
      :fetch="loadDataList"
    >
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
      <template #op="{ index, row }">
        <div>
          <span class="a-link" @click="descVisiable = true">查看光谱</span>
          <span class="a-link">下载</span>
        </div>
      </template>
    </Table>
    <el-dialog v-model="descVisiable" title="光谱详情" width="500">
      <img src="../../assets/光谱主界面背景.jpg" width="100%" />
      <span>光谱描述balabala...</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="descVisiable = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const descVisiable = ref(false)
const columns = [
  {
    label: '光谱名称',
    prop: 'spectrumName',
    width: 250,
    scopedSlots: 'spectrumName'
  },
  {
    label: '光谱类别',
    prop: 'type',
    width: 250,
    scopedSlots: 'type'
  },
  {
    label: '采用标准',
    prop: 'standard',
    width: 250,
    scopedSlots: 'standard'
  },
  {
    label: '被检测物',
    prop: 'substance',
    width: 200,
    scopedSlots: 'substance'
  },
  {
    label: '检测成分',
    prop: 'component',
    width: 200,
    scopedSlots: 'component'
  },
  {
    label: '操作',
    prop: 'op',
    width: 200,
    scopedSlots: 'op'
  }
]
const tableData = {
  totalCount: 3, //总记录数
  pageSize: 50, //分页大小
  pageNo: 1, //页码
  pageTotal: 1, //总页数
  list: []
}

tableData.list = [
  {
    spectrumName: '光谱1',
    type: '拉曼光谱',
    standard: 'ISO',
    substance: '被检测物1',
    component: '检测成分1'
  },
  {
    spectrumName: '光谱1',
    type: '拉曼光谱',
    standard: 'ISO',
    substance: '被检测物1',
    component: '检测成分1'
  },
  {
    spectrumName: '光谱1',
    type: '拉曼光谱',
    standard: 'ISO',
    substance: '被检测物1',
    component: '检测成分1'
  }
]
tableData.totalCount = tableData.list.length
const tableOptions = ref({
  selectType: 'checkbox',
  extHeight: 110
})
const searchFormData = ref({})
const searchFormDataRef = ref()
const rules = {
  title: [{ required: true, message: '请输入内容' }]
}
</script>

<style lang="scss" scoped>
.a-link {
  margin-left: 10px;
  color: #409eff;
  text-decoration: none;
  cursor: pointer;
}
.el-row {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.el-col {
  margin-right: 20px; /* 右侧外边距 */
  &:last-child {
    margin-right: 0; /* 最后一个元素移除外边距 */
  }
}

.el-form-item {
  margin-bottom: 0; /* 移除表单项的底部外边距 */
}
</style>
