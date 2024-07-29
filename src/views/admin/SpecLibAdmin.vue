<template>
  <div>
    <div class="top-panel">
      <el-form
        :model="searchFormData"
        label-width="80px"
        ref="searchFormDataRef"
      >
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
            <el-form-item label="检测物">
              <el-input
                clearable
                placeholder="请输入检测物"
                v-model.trim="searchFormData.substance"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :style="{ 'padding-left': '10px' }">
            <el-button-group>
              <el-button type="primary" @click="loadDataList">搜索</el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <Table
          :columns="columns"
          :showPagination="true"
          :dataSource="tableData"
          :options="tableOptions"
          :fetch="loadDataList"
        >
        <template #spectrumName="{ index, row }">
            <div>{{row.spectrumName}}</div>
        </template>
        <template #standard="{ index, row }">
            <div>{{row.standard}}</div>
        </template>
        <template #substance="{ index, row }">
            <div>{{row.substance}}</div>
        </template>
        <template #component="{ index, row }">
            <div>{{row.component}}</div>
        </template>
        <template #op="{ index, row}">
          <div>
            <el-button type="primary" size="small" @click="showDetail">查看详情</el-button>
            <el-button type="danger" size="small" @click="del">移除</el-button>
          </div>
        </template>
    </Table>
    <el-dialog
        v-model="detailVisiable"
        title="光谱详情"
        width="500"
    >
      <div class="detail">
        <img src="../../assets/光谱主界面背景.jpg" width="100%"/>
        <div>光谱描述balabala</div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="detailVisiable = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const searchFormData = ref({});
const searchFormDataRef = ref();
const columns = [
  {
    label: '光谱名称',
    prop: 'spectrumName',
    width: 300,
    scopedSlots: 'spectrumName'
  },
  {
    label: '采用标准',
    prop: 'standard',
    width: 300,
    scopedSlots: 'standard'
  },
  {
    label: '被检测物',
    prop: 'substance',
    width: 300,
    scopedSlots: 'substance'
  },
  {
    label: '检测成分',
    prop: 'component',
    width: 300,
    scopedSlots: 'component'
  },
  {
    label: '操作',
    width: 170,
    scopedSlots: 'op'
  },
]
const tableData = {
  "totalCount":3, //总记录数
  "pageSize":50,//分页大小
  "pageNo":1,//页码
  "pageTotal":1,//总页数
  'list':[]
}
tableData.list = [
  {
    "spectrumName":'拉曼光谱1',
    'standard':'ISO',
    'substance':'土豆',
    'component':'蛋白质',
  },
  {
    "spectrumName":'拉曼光谱1',
    'standard':'ISO',
    'substance':'土豆',
    'component':'蛋白质',
  },
  {
    "spectrumName":'拉曼光谱1',
    'standard':'ISO',
    'substance':'土豆',
    'component':'蛋白质',
  },
  {
    "spectrumName":'拉曼光谱1',
    'standard':'ISO',
    'substance':'土豆',
    'component':'蛋白质',
  },
  {
    "spectrumName":'拉曼光谱1',
    'standard':'ISO',
    'substance':'土豆',
    'component':'蛋白质',
  },
]
tableData.totalCount = tableData.list.length
const tableOptions = ref({
  selectType: 'checkbox',
  extHeight: 110
})
const detailVisiable = ref(false)
const showDetail = () => {
  detailVisiable.value = true
}
const del = () => {
  ElMessageBox.confirm(
    '请确认将该光谱从标准库中移除',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消',
      })
    })
}
</script>

<style lang="scss" scoped>
</style>
