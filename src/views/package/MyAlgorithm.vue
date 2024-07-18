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
              <el-form-item label="算法名称">
                <el-input
                  clearable
                  placeholder="请输入算法名称"
                  v-model.trim="searchFormData.algoName"
                  @keyup.native="loadDataList"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="算法类别">
                <el-cascader
                  placeholder="请选择算法类别"
                  :options="algoTypeList"
                  :props="algoProps"
                  clearable
                  v-model="searchFormData.algoType"
                  :style="{ width: '100%' }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" :style="{ 'padding-left': '10px' }">
              <el-button-group>
                <el-button type="primary" @click="loadDataList">搜索</el-button>
                <el-button
                  type="primary"
                  @click="downloadBatch"
                  :disabled="false"
                  >批量下载</el-button
                >
                <el-button
                  type="danger"
                  @click="delBatch"
                  :disabled="false"
                  >批量删除</el-button
                >
              </el-button-group>
            </el-col>
            <el-col :span="4">
              <el-button type="">上传算法</el-button>
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
        <template #algorithm="{ index, row }">
            <div>{{row.algorithm}}</div>
        </template>
        <template #type="{ index, row }">
            <div>{{row.type}}</div>
        </template>
        <template #version="{ index, row }">
            <div>{{ row.version }}</div>
        </template>
        <template #time="{ index, row }">
            <div>{{row.time}}</div>
        </template>
        <template #op="{ index, row }">
            <div>
              <span class="a-link">下载</span>
              <span class="a-link">删除</span>
            </div>
        </template>
    </Table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loadDataList = () => {}
const tableOptions = ref({
  selectType: 'checkbox',
  extHeight: 110
})
const rowClick = () => {}

const columns = [
  {
    label: '算法名称',
    prop: 'algorithm',
    width: 300,
    scopedSlots: 'algorithm'
  },
  {
    label: '算法类别',
    prop: 'type',
    width: 300,
    scopedSlots: 'type'
  },
  {
    label: '版本',
    prop: 'version',
    width: 300,
    scopedSlots: 'version'
  },
  {
    label: '上传时间',
    prop: 'time',
    width: 300,
    scopedSlots: 'time'
  },
  {
    label: '操作',
    prop: 'op',
    width: 100,
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
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  },
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  }
  ,
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  } ,
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  } ,
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  } ,
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  } ,
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  } ,
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  } ,
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  } ,
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  } ,
  {
    "algorithm":'算法1',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  }
]
tableData.totalCount = tableData.list.length


const searchFormData = ref({});
const searchFormDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入内容" }],
};
const algoProps = {
  multiple: false,
  checkStrictly: true,
  value: 'algoId',
  label: 'algoType'
}
const algoTypeList = [
  {
    'algoId':'1',
    'algoType':'平滑降噪'
  },
  {
    'algoId':'2',
    'algoType':'基准线扣除'
  },
  {
    'algoId':'3',
    'algoType':'特征峰识别'
  },
]

</script>

<style lang="scss" scoped>
.a-link {
      margin-left: 10px;
      color: #409eff;
      text-decoration: none;
      cursor: pointer;
    }
</style>
