<template>
    <div>
      <el-row class="row">
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
            <el-select
                v-model="searchFormData.specType"
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
        </el-col>
        <el-col :span="4">
            <el-form-item label="采用标准" prop="standard">
                <el-select
                    v-model="searchFormData.standard"
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
        </el-col>
        <el-col :span="4">
            <el-form-item label="检测物质" prop="substance">
                <el-input
                    clearable
                    placeholder="请填写检测物质"
                    v-model.trim="searchFormData.substance"
                ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="检测成分" prop="component">
                <el-input
                    clearable
                    placeholder="请填写检测成分"
                    v-model.trim="searchFormData.component"
                ></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="用户昵称" prop="userName">
                <el-input
                    clearable
                    placeholder="请填写昵称"
                    v-model.trim="searchFormData.userName"
                ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="2">
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
          <template #userName="{ index, row }">
              <div>{{row.userName}}</div>
          </template>
          <template #spectrumName="{ index, row }">
              <div>{{row.spectrumName}}</div>
          </template>
          <template #type="{ index, row }">
              <div>{{row.type}}</div>
          </template>
          <template #standard="{ index, row }">
              <div>{{ row.standard }}</div>
          </template>
          <template #substance="{ index, row }">
              <div>{{row.substance}}</div>
          </template>
          <template #component="{ index, row }">
              <div>{{row.component}}</div>
          </template>
          <template #op="{ index, row }">
              <div>
                <span class="a-link" @click="descVisiable = true">处理</span>
              </div>
          </template>
      </Table>
      <el-dialog
          v-model="descVisiable"
          title="光谱详情"
          width="500"
      >
        <img src="../../../assets/光谱主界面背景.jpg" width="100%"/>
        <span>光谱描述balabala...</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="handleAudit(1)">通过</el-button>
            <el-button type="primary" @click="handleAudit(2)">
              驳回
            </el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog
          v-model="refuVisiable"
          title="驳回原因"
          width="500"
      >
        <el-form
          :model="formData"
          :rules="rules"
          ref="formDataRef"
          label-width="80px"
          @submit.prevent
        >
          <!--textarea输入-->
          <el-form-item label="原因" prop="refuReason">
            <el-input
              clearable
              placeholder="请输入驳回原因"
              type="textarea"
              :rows="5"
              :maxlength="150"
              resize="none"
              show-word-limit
              v-model="formData.refuReason"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="confirmRefu">确认</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
const descVisiable = ref(false)
const columns = [
{
    label: '用户昵称',
    prop: 'userName',
    width: 200,
    scopedSlots: 'userName'
},
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
  'userName':'大王',
  'spectrumName':'光谱1',
  'type':'拉曼光谱',
  'standard':'ISO',
  'substance':'被检测物1',
  'component':'检测成分1',
},
{
  'userName':'大王',
  'spectrumName':'光谱1',
  'type':'拉曼光谱',
  'standard':'ISO',
  'substance':'被检测物1',
  'component':'检测成分1',
},
{
  'userName':'大王',
  'spectrumName':'光谱1',
  'type':'拉曼光谱',
  'standard':'ISO',
  'substance':'被检测物1',
  'component':'检测成分1',
},
]
tableData.totalCount = tableData.list.length
const typeList = ref([
  { label: '拉曼光谱', value: '0' },
  { label: '红外光谱', value: '1' }
]);

const stdList = ref([
  { label: 'ISO', value: '0' },
  { label: '国标', value: '1' }
]);
const tableOptions = ref({
selectType: 'checkbox',
extHeight: 110
})
const searchFormData = ref({});
const formData = ref({});
const formDataRef = ref();
const rules = {
    refuReason: [{ required: true, message: "请输入原因" }],
};
const refuVisiable = ref()
const handleAudit = (type) => {
    if(type == 1){
        //通过
        ElMessage({
            type:'success',
            message:'已通过'
        })
    }
    if(type == 2) {
        //驳回
        refuVisiable.value = true
    }
    descVisiable.value = false
}
const confirmRefu = () => {
    formDataRef.value.validate((valid) => {
        if(!valid) {
            return
        }
        ElMessage({
            type:'error',
            message:'已驳回'
        })
        refuVisiable.value = false
        formDataRef.value.resetFields()
    })

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
  /* 行的样式，确保flex布局 */
  .row {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
  }
  </style>
