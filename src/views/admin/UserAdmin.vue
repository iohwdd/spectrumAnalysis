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
            <el-form-item label="昵称">
              <el-input
                clearable
                placeholder="请输入昵称"
                v-model.trim="searchFormData.userName"
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
          <el-col :span="4">
            <el-form-item label="状态">
              <el-select
                v-model="searchFormData.status"
                clearable
                placeholder="请选择"
                :style="{ widht: '100%' }"
              >
                <el-option :value="1" label="正常"></el-option>
                <el-option :value="0" label="禁用"></el-option>
              </el-select>
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
      <template #userId="{ index, row }">
        <div>{{ row.userId }}</div>
      </template>
      <template #userName="{ index, row }">
        <div>{{ row.userName }}</div>
      </template>
      <template #email="{ index, row }">
        <div>{{ row.email }}</div>
      </template>
      <template #phone="{ index, row }">
        <div>{{ row.phone }}</div>
      </template>
      <template #address="{ index, row }">
        <div>{{ row.address }}</div>
      </template>
      <template #status="{ index, row }">
        <div>{{ row.status == 1 ? '正常' : '禁用' }}</div>
      </template>
      <template #lastLoginTime="{ index, row }">
        <div>{{ row.lastLoginTime }}</div>
      </template>
      <template #op="{ index, row }">
        <div class="group-btn">
          <el-button type="primary" size="small" @click="showSendMsg"
            >发送消息</el-button
          >
          <el-button
            v-if="row.status == 1"
            type="danger"
            size="small"
            @click="showSendMsg(1)"
            >禁用</el-button
          >
          <el-button v-if="row.status == 0" type="primary" size="small"
            >启用</el-button
          >
        </div>
      </template>
    </Table>
    <el-dialog v-model="sendVisable" title="发送消息" width="500">
      <div>
        <el-form
          v-if="!isAccountStatusMsg"
          :model="formData"
          :rules="rules"
          ref="formDataRef"
          label-width="80px"
        >
          <!--textarea输入-->
          <el-form-item label="消息内容" prop="message">
            <el-input
              clearable
              placeholder="请输入消息内容"
              type="textarea"
              :rows="5"
              :maxlength="200"
              resize="none"
              show-word-limit
              v-model.trim="formData.message"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          v-if="isAccountStatusMsg"
          :model="formData"
          :rules="rules"
          ref="formDataRef"
          label-width="80px"
        >
          <!--textarea输入-->
          <el-form-item label="禁用原因" prop="iceReason">
            <el-input
              clearable
              placeholder="请输入禁用原因"
              type="textarea"
              :rows="5"
              :maxlength="200"
              resize="none"
              show-word-limit
              v-model.trim="formData.iceReason"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="sendMsg">
            {{ isAccountStatusMsg ? '禁用' : '发送' }}
          </el-button>
          <el-button type="primary" @click="sendVisable = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const formData = ref({})
const formDataRef = ref()
const rules = {
  message: [{ required: true, message: '请输入内容' }],
  iceReason: [{ required: true, message: '请输入禁用原因' }]
}
const searchFormData = ref({})
const searchFormDataRef = ref()
const columns = [
  {
    label: '用户编号',
    prop: 'userId',
    width: 170,
    scopedSlots: 'userId'
  },
  {
    label: '用户昵称',
    prop: 'userName',
    width: 170,
    scopedSlots: 'userName'
  },
  {
    label: '邮箱',
    prop: 'email',
    width: 170,
    scopedSlots: 'email'
  },
  {
    label: '手机号',
    prop: 'phone',
    width: 170,
    scopedSlots: 'phone'
  },
  {
    label: '所属单位',
    prop: 'address',
    width: 170,
    scopedSlots: 'address'
  },
  {
    label: '状态',
    prop: 'status',
    width: 170,
    scopedSlots: 'status'
  },
  {
    label: '上一次登录时间',
    prop: 'lastLoginTime',
    width: 170,
    scopedSlots: 'lastLoginTime'
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
    userId: '20240720001',
    userName: '大王',
    email: 'jinitaimei@qq.com',
    phone: '15632489512',
    address: 'bala',
    status: 1,
    lastLoginTime: '2024-7-20'
  },
  {
    userId: '20240720001',
    userName: '大王',
    email: 'jinitaimei@qq.com',
    phone: '15632489512',
    address: 'bala',
    status: 0,
    lastLoginTime: '2024-7-20'
  },
  {
    userId: '20240720001',
    userName: '大王',
    email: 'jinitaimei@qq.com',
    phone: '15632489512',
    address: 'bala',
    status: 1,
    lastLoginTime: '2024-7-20'
  },
  {
    userId: '20240720001',
    userName: '大王',
    email: 'jinitaimei@qq.com',
    phone: '15632489512',
    address: 'bala',
    status: 1,
    lastLoginTime: '2024-7-20'
  },
  {
    userId: '20240720001',
    userName: '大王',
    email: 'jinitaimei@qq.com',
    phone: '15632489512',
    address: 'bala',
    status: 1,
    lastLoginTime: '2024-7-20'
  },
  {
    userId: '20240720001',
    userName: '大王',
    email: 'jinitaimei@qq.com',
    phone: '15632489512',
    address: 'bala',
    status: 1,
    lastLoginTime: '2024-7-20'
  }
]
tableData.totalCount = tableData.list.length
const tableOptions = ref({
  selectType: 'checkbox',
  extHeight: 110
})

const sendVisable = ref(false)
const isAccountStatusMsg = ref(false)
const showSendMsg = (type) => {
  isAccountStatusMsg.value = false
  sendVisable.value = true
  if (type == 1) {
    isAccountStatusMsg.value = true
  }
}
const sendMsg = () => {
  formDataRef.value.validate((valid) => {
    if (!valid) {
      return
    }
    if (isAccountStatusMsg.value) {
      ElMessage({
        type: 'success',
        message: '禁用成功',
        type: 'success'
      })
      sendVisable.value = false
      return
    }
    ElMessage({
      type: 'success',
      message: '发送成功',
      type: 'success'
    })
    sendVisable.value = false
    formDataRef.value.resetFields()
  })
}
</script>

<style lang="scss" scoped>
.group-btn {
  display: flex;
  .el-button {
  }
}
</style>
