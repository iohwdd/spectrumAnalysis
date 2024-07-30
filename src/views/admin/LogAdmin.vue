<template>
  <div>
    <div class="top-panel">
      <el-form
        :model="searchFormData"
        label-width="80px"
        ref="searchFormDataRef"
        class="search-form"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户编号">
              <el-input
                clearable
                placeholder="请输入用户编号"
                v-model.trim="searchFormData.userId"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户昵称">
              <el-input
                clearable
                placeholder="请输入用户昵称"
                v-model.trim="searchFormData.userName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="search-button-col">
            <el-button type="primary" class="search-button">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <Table
      class="history-table"
      :columns="columns"
      :showPagination="true"
      :dataSource="tableData"
      :fetch="loadDataList"
    >
      <template #userId="{ index, row }">
        <div>{{ row.userId }}</div>
      </template>
      <template #userName="{ index, row }">
        <div>{{ row.userName }}</div>
      </template>
      <template #userLogDetail="{ index, row }">
        <div>{{ row.userLogDetail }}</div>
      </template>
      <template #userLogTime="{ index, row }">
        <div>{{ row.userLogTime }}</div>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const searchFormData = ref({})
const searchFormDataRef = ref()
const columns = [
  {
    label: '用户编号',
    prop: 'userId',
    width: 350,
    scopedSlots: 'userId'
  },
  { label: '用户昵称', prop: 'userName', width: 350, scopedSlots: 'userName' },
  {
    label: '操作记录',
    prop: 'userLogDetail',
    width: 350,
    scopedSlots: 'userLogDetail'
  },
  {
    label: '操作时间',
    prop: 'userLogTime',
    width: 300,
    scopedSlots: 'userLogTime'
  }
]

const tableData = {
  totalCount: 3,
  pageSize: 50,
  pageNo: 1,
  pageTotal: 1,
  list: []
}

tableData.list = [
  {
    userId: '20240730001',
    userName: '大王',
    userLogDetail: '删库跑路',
    userLogTime: '2024-07-30'
  },
  {
    userId: '20240730002',
    userName: '小王',
    userLogDetail: '修改配置',
    userLogTime: '2024-07-30'
  },
  {
    userId: '20240730003',
    userName: '中王',
    userLogDetail: '新增用户',
    userLogTime: '2024-07-30'
  }
]
</script>

<style lang="scss" scoped>
.top-panel {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 20px;
}

.search-form {
  .el-form-item {
    margin-bottom: 0;
  }

  .search-button-col {
    display: flex;
    align-items: flex-end;

    .search-button {
      width: 100%;
    }
  }
}

.history-table {
  .el-table {
    th {
      background-color: #f3f3f3;
      border-radius: 10px;
      color: #333;
      font-weight: bold;
      text-align: center;
    }

    td {
      text-align: center;
    }
  }
}
</style>
