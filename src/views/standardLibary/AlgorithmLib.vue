<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-form-item label="算法名称">
          <el-input
            clearable
            placeholder="请输入算法名称"
            v-model.trim="searchFormData.algoName"
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
              <span class="a-link" @click="descVisiable = true">查看描述</span>
              <span class="a-link">下载</span>
            </div>
        </template>
    </Table>
    <el-dialog
        v-model="descVisiable"
        title="算法描述"
        width="500"
    >
      <span>算法描述balabala...</span>
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
    label: '算法名称',
    prop: 'algorithm',
    width: 400,
    scopedSlots: 'algorithm'
  },
  {
    label: '算法类别',
    prop: 'type',
    width: 400,
    scopedSlots: 'type'
  },
  {
    label: '版本',
    prop: 'version',
    width: 400,
    scopedSlots: 'version'
  },
  {
    label: '操作',
    prop: 'op',
    width: 400,
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
    "algorithm":'算法2',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  },
  {
    "algorithm":'算法3',
    'type':'平滑降噪',
    'version':'1.0',
    'time':'2024-7-16',
    'op':'-'
  },
]
tableData.totalCount = tableData.list.length
const tableOptions = ref({
  selectType: 'checkbox',
  extHeight: 110
})
const searchFormData = ref({});
const searchFormDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入内容" }],
};
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
