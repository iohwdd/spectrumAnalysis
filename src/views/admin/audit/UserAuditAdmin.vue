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
              <el-form-item label="审核类型">
                <el-select
                  v-model="searchFormData.auditType"
                  clearable
                  placeholder="请选择"
                  :style="{ widht: '100%' }"
                >
                  <el-option :value="1" label="申请成为管理员"></el-option>
                  <el-option :value="0" label="申请解禁"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="用户昵称">
                <el-input
                  clearable
                  placeholder="请输入昵称"
                  v-model.trim="searchFormData.nickNameFuzzy"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="邮箱">
                <el-input
                  clearable
                  placeholder="请输入邮箱"
                  v-model.trim="searchFormData.email"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="手机号">
                <el-input
                  clearable
                  placeholder="请输入手机号"
                  v-model.trim="searchFormData.phone"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="所属单位">
                <el-input
                  clearable
                  placeholder="请输入单位"
                  v-model.trim="searchFormData.address"
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
          <template #auditType="{ index, row }">
              <div>{{row.auditType == 0 ? '申请解禁':'申请成为管理员'}}</div>
          </template>
          <template #userId="{ index, row }">
              <div>{{row.userId}}</div>
          </template>
          <template #userName="{ index, row }">
              <div>{{row.userName}}</div>
          </template>
          <template #email="{ index, row }">
              <div>{{row.email}}</div>
          </template>
          <template #phone="{ index, row }">
              <div>{{row.phone}}</div>
          </template>
          <template #address="{ index, row }">
              <div>{{row.address}}</div>
          </template>
          <template #op="{ index, row}">
            <div>
              <el-button type="primary" size="small" @click="handleAudit(row.applyReason)">处理</el-button>
            </div>
          </template>
      </Table>
      <el-dialog
          v-model="auditVisiable"
          title="申请理由"
          width="500"
      >
        <div class="detail">
          <div class="desc">{{ applyReason }}</div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="audit(1)">通过</el-button>
            <el-button type="primary" @click="audit(0)">
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
          <el-form-item label="原因" prop="">
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
  import { ElMessage, ElMessageBox } from 'element-plus'
  const formData = ref({});
  const formDataRef = ref();
  const rules = {
    title: [{ required: true, message: "请输入内容" }],
  };
  const searchFormData = ref({});
  const searchFormDataRef = ref();
  const columns = [
    {
      label: '审核类型',
      prop: 'auditType',
      width: 200,
      scopedSlots: 'auditType'
    },
    {
      label: '用户编号',
      prop: 'userId',
      width: 200,
      scopedSlots: 'userId'
    },
    {
      label: '用户昵称',
      prop: 'userName',
      width: 200,
      scopedSlots: 'userName'
    },
    {
      label: '邮箱',
      prop: 'email',
      width: 200,
      scopedSlots: 'email'
    },
    {
      label: '手机号',
      prop: 'phone',
      width: 200,
      scopedSlots: 'phone'
    },
    {
      label: '所属单位',
      prop: 'address',
      width: 200,
      scopedSlots: 'address'
    },
    {
      label:'操作',
      width:170,
      scopedSlots:'op'
    }
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
      "auditType":0,
      'userId':'20240720001',
      'userName':'大王',
      'email':'4652133@qq.com',
      'phone':'15478963541',
      'address':'略',
      'applyReason':'我错了',
    },
    {
      "auditType":0,
      'userId':'20240720001',
      'userName':'大王',
      'email':'4652133@qq.com',
      'phone':'15478963541',
      'address':'略',
      'applyReason':'我错了',
    },{
      "auditType":1,
      'userId':'20240720001',
      'userName':'大王',
      'email':'4652133@qq.com',
      'phone':'15478963541',
      'address':'略',
      'applyReason':'我错了',
    },{
      "auditType":0,
      'userId':'20240720001',
      'userName':'大王',
      'email':'4652133@qq.com',
      'phone':'15478963541',
      'address':'略',
      'applyReason':'我错了',
    },
  ]
  tableData.totalCount = tableData.list.length
  const tableOptions = ref({
    selectType: 'checkbox',
    extHeight: 110
  })
  const auditVisiable = ref(false)
  const refuVisiable = ref(false)
  const applyReason = ref('')
  const handleAudit = (reason) => {
    auditVisiable.value = true
    applyReason.value = reason
  }
  const audit = (isPast) => {
    if(isPast) {
      ElMessage({
        type:'success',
        message:'已通过'
      })
    }
    if(!isPast) {
      refuVisiable.value = true
    }
    auditVisiable.value = false
  }
  const confirmRefu = () => {
    ElMessage({
      type:'error',
      message:'已驳回'
    })
    refuVisiable.value = false
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

  /* 行的样式，确保flex布局 */
  .row {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
  }

  </style>
