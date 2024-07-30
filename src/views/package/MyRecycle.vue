<template>
  <div class="MyRecycle">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item
        style="margin-top: 10px; margin-left: 500px"
        label="搜索内容："
      >
        <el-input
          v-model="formInline.content"
          placeholder="请输入搜索内容"
          clearable
        />
      </el-form-item>
      <el-form-item
        style="margin-top: 10px; margin-left: 500px"
        label="数据类型："
      >
        <el-select
          v-model="formInline.type"
          placeholder="请选择数据类型"
          clearable
        >
          <el-option label="光谱数据" value="1" />
          <el-option label="算法数据" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-top: 10px; margin-left: 420px" label="">
        <el-date-picker
          v-model="formInline.startDate"
          type="date"
          placeholder="请选择开始的时间"
          clearable
        />
      </el-form-item>

      <el-form-item style="margin-top: 10px; margin-left: 50px" label="">
        <el-date-picker
          v-model="formInline.lastDate"
          type="date"
          placeholder="请选择最后的时间"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-button
          style="
            margin-top: 10px;
            margin-left: 500px;
            width: 100px;
            height: 35px;
          "
          @click="clearForm"
          >重置</el-button
        >
      </el-form-item>

      <el-form-item>
        <el-button
          style="
            margin-top: 10px;
            margin-left: 100px;
            width: 100px;
            height: 30px;
          "
          type="primary"
          @click="onSubmit"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <div class="MyRecycleTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="Name" label="数据名称" width="200" />
        <el-table-column prop="Type" label="数据类型" width="200" />
        <el-table-column prop="Date" label="删除时间" width="200" />
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default>
            <el-button link type="primary" size="small"> 彻底删除 </el-button>
            <el-button link type="primary" size="small">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div
        style="margin-top: 50px; margin-left: 400px"
        class="example-pagination-block"
      >
        <el-pagination layout="prev, pager, next" :total="50" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
  content: '',
  type: '',
  startDate: '',
  lastDate: ''
})

const onSubmit = () => {
  console.log('submit!')
}

function clearForm() {
  formInline.content = ''
  formInline.type = ''
  formInline.startDate = ''
  formInline.lastDate = ''
}

const tableData = [
  {
    Name: '拉曼光谱',
    Type: '拉曼光谱',
    Date: '2024-10-21'
  },
  {
    Name: '平滑处理算法',
    Type: '预处理',
    Date: '2024-10-21'
  },
  {
    Name: '拉曼光谱',
    Type: '拉曼光谱',
    Date: '2024-10-21'
  },
  {
    Name: '平滑处理算法',
    Type: '预处理',
    Date: '2024-10-21'
  },
  {
    Name: '拉曼光谱',
    Type: '拉曼光谱',
    Date: '2024-10-21'
  },
  {
    Name: '平滑处理算法',
    Type: '预处理',
    Date: '2024-10-21'
  }
]
</script>

<style lang="scss" scoped>
.MyRecycle {
  // border: 1px solid rgb(10, 10, 10);
  float: left;
  margin: 0;
  height: 800px;
  width: 1350px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.MyRecycleTable {
  // border: 1px solid rgb(10, 10, 10);
  float: left;
  margin-top: 10px;
  margin-left: 150px;
  height: 500px;
  width: 1000px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
