<template>
  <div :class="{ hidden : isHidden }">
    <div class="title">
      上传光谱文件
    </div>
    <el-upload
      class="upload"
      drag
      action=""
      accept=".xlsx"
      :on-success="handleSuccess"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        上传光谱文件
      </div>
      <template #tip>
        <div class="el-upload__tip">
          only accept xlsx file
        </div>
      </template>
    </el-upload>
    <el-button @click="simulateUpload">模拟上传</el-button>
    <el-divider class="divider" />
    <div class="history-panel">
      <div class="title">
        历史操作记录
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
              <div>{{row.specId}}</div>
          </template>
          <template #spectrumName="{ index, row }">
              <div>{{row.spectrumName}}</div>
          </template>
          <template #type="{ index, row }">
              <div>{{row.type}}</div>
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
          <template #desc="{ index, row }">
              <div>{{row.desc}}</div>
          </template>
          <template #op="{ index, row }">
              <div>
                <span class="a-link">下载</span>
                <span class="a-link">删除</span>
              </div>
          </template>
      </Table>
    </div>
  </div>
  <SpectrumProcess :isHidden="!isHidden">
  </SpectrumProcess>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import SpectrumProcess from './SpectrumProcess.vue';
const router = useRouter()
const drawer = ref(false)
const columns = [
  {
    label: '光谱名称',
    prop: 'spectrumName',
    width: 200,
    scopedSlots: 'spectrumName'
  },
  {
    label: '光谱类别',
    prop: 'type',
    width: 200,
    scopedSlots: 'type'
  },
  {
    label: '采用标准',
    prop: 'standard',
    width: 200,
    scopedSlots: 'standard'
  },
  {
    label: '检测物质',
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
    label: '光谱描述',
    prop: 'desc',
    width: 200,
    scopedSlots: 'desc'
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
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },
  {
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },
  {
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },
  {
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },
  {
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },
  {
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },
  {
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },
  {
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },
  {
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },
  {
    'specId':'1',
    'spectrumName':'光谱名称1',
    'type':'光谱类型1',
    'standard':'采用标准1',
    'substance':'被检测物1',
    'component':'检测成分1',
    'desc':'光谱描述'
  },

]
const handleSuccess = () => {

}

const isHidden = ref(false)
const simulateUpload = () => {
  isHidden.value = true
}
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
.a-link {
      margin-left: 10px;
      color: #409eff;
      text-decoration: none;
      cursor: pointer;
  }
.upload {
  .el-upload__tip{

  }
}
.title {
    font: bold 24px Arial, sans-serif; /* 使用加粗字体，字体大小为24px，字体族为Arial */
    color: #333; /* 深色文本颜色，易于阅读 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25); /* 添加轻微的文本阴影，增加层次感 */
    text-align: center; /* 文本居中对齐 */
    padding: 10px 0; /* 顶部和底部内边距为10px */
    display: inline-block; /* 使标题块内联显示，便于添加背景色和边框 */
  }
.divider {
  margin:10px 0px 5px 0px;
}

</style>
