<template>
  <div>
    <div class="top-panel">
      <el-form
        :model="searchFormData"
        label-width="80px"
        ref="searchFormDataRef"
      >
        <el-row class="row" type="flex">
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
            <el-form-item label="算法类型">
              <el-select
                v-model="searchFormData.algoType"
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
          </el-col>
          <el-col :span="4" :style="{ 'padding-left': '10px' }">
            <el-form-item>
              <el-button type="primary" @click="loadDataList">搜索</el-button>
            </el-form-item>
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
      <template #algoName="{ index, row }">
        <div>{{ row.algoName }}</div>
      </template>
      <template #algoType="{ index, row }">
        <div>{{ row.algoType }}</div>
      </template>
      <template #algoVersion="{ index, row }">
        <div>{{ row.algoVersion }}</div>
      </template>
      <template #op="{ index, row }">
        <div>
          <el-button
            type="primary"
            size="small"
            @click="showDetail(row.algoDesc)"
            >查看详情</el-button
          >
          <el-button type="danger" size="small" @click="del">移除</el-button>
        </div>
      </template>
    </Table>
    <el-dialog v-model="detailVisiable" title="算法详情" width="500">
      <div class="detail">
        <div class="desc">{{ algoDesc }}</div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary">下载</el-button>
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
const searchFormData = ref({})
const searchFormDataRef = ref()
const processList = ref([
  { label: '光谱基准线扣除', value: '光谱基准线扣除' },
  { label: '平滑降噪', value: '平滑降噪' },
  { label: '特征波长提取', value: '特征波长提取' }
])
const columns = [
  {
    label: '算法名称',
    prop: 'algoName',
    width: 400,
    scopedSlots: 'algoName'
  },
  {
    label: '算法类型',
    prop: 'algoType',
    width: 400,
    scopedSlots: 'algoType'
  },
  {
    label: '版本号',
    prop: 'algoVersion',
    width: 400,
    scopedSlots: 'algoVersion'
  },
  {
    label: '操作',
    width: 170,
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
    algoName: '算法1',
    algoType: '平滑降噪',
    algoDesc: '算法描述balabala',
    algoVersion: '1.0'
  },
  {
    algoName: '算法1',
    algoType: '平滑降噪',
    algoDesc: '算法描述balabala',
    algoVersion: '1.0'
  },
  {
    algoName: '算法1',
    algoType: '平滑降噪',
    algoDesc: '算法描述balabala',
    algoVersion: '1.0'
  },
  {
    algoName: '算法1',
    algoType: '平滑降噪',
    algoDesc: '算法描述balabala',
    algoVersion: '1.0'
  },
  {
    algoName: '算法1',
    algoType: '平滑降噪',
    algoDesc: '算法描述balabala',
    algoVersion: '1.0'
  }
]
tableData.totalCount = tableData.list.length
const tableOptions = ref({
  selectType: 'checkbox',
  extHeight: 110
})
const detailVisiable = ref(false)
const algoDesc = ref('')
const showDetail = (desc) => {
  detailVisiable.value = true
  algoDesc.value = desc
}
const del = () => {
  ElMessageBox.confirm('请确认将该算法从算法库中移除', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消'
      })
    })
}
</script>

<style lang="scss" scoped>
.detail {
  border: 1px solid #dcdfe6; /* 添加边框 */
  padding: 20px; /* 内边距 */
  border-radius: 4px; /* 边框圆角 */
  background-color: #fff; /* 背景色 */
  max-width: 600px; /* 最大宽度 */
  margin: 0 auto; /* 水平居中 */
}

.desc {
  font-size: 16px; /* 字体大小 */
  line-height: 1.5; /* 行高 */
  text-align: justify; /* 文本两端对齐 */
  color: #606266; /* 文本颜色 */
  margin-bottom: 20px; /* 与按钮的间距 */
}
/* 统一输入框、选择框的高度 */
.el-form-item__content .el-input,
.el-form-item__content .el-select {
  height: 40px; /* 根据需要调整高度 */
  line-height: 40px; /* 保持内联元素垂直居中 */
}

/* 确保选择框的宽度与输入框一致 */
.el-select .el-input__inner {
  width: 100%; /* 确保选择框宽度占满其容器 */
}

/* 按钮组样式 */
.el-button-group {
  display: flex; /* 使用flex布局以对齐按钮 */
  align-items: center; /* 垂直居中对齐 */
}

/* 确保按钮的宽度一致，如果需要 */
.el-button-group .el-button {
  margin: 0 5px; /* 按钮间的间距，根据需要调整 */
  padding: 0 15px; /* 按钮的内边距，根据需要调整 */
}

/* 行的样式，确保flex布局 */
.row {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

/* 列的样式，确保元素在同一水平线上 */
.row .el-col {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}
</style>
