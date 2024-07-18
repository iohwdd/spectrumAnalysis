<template>
  <div class="MySpectrum">

    <el-input
    v-model="input"
    style="width: 200px;margin-top: 50px;margin-left: 120px"
    placeholder="请输入搜索的内容"
    clearable
  />
  <el-button type="primary" :icon="Search" style="margin-top: 50px;margin-left: 20px">搜索</el-button>

  <el-button type="primary" style="margin-top: 50px;margin-left: 320px" @click="dialogFormVisible = true">上传光谱</el-button>

  <el-dialog v-model="dialogFormVisible" title="上传光谱" width="500">
    <el-form :model="form">

      <el-form-item label="光谱名称：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>

      <el-form-item label="光谱类型：" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择光谱类型">
          <el-option label="拉曼光谱" value="1" />
          <el-option label="红外光谱" value="2" />
        </el-select>
      </el-form-item>

      <el-form-item label="被检测物：" :label-width="formLabelWidth">
        <el-input v-model="form.name1" autocomplete="off" />
      </el-form-item>

      <el-form-item label="检测成分：" :label-width="formLabelWidth">
        <el-input v-model="form.name2" autocomplete="off" />
      </el-form-item>

      <el-form-item label="采用标准：" :label-width="formLabelWidth">
        <el-select v-model="form.standard" placeholder="请选择采用标准">
          <el-option label="ISO" value="1" />
          <el-option label="ASTM" value="2" />
          <el-option label="国家标准" value="3" />
          <el-option label="其他" value="4" />
        </el-select>
      </el-form-item>

      <el-form-item label="光谱描述：" :label-width="formLabelWidth">
        <el-input
    v-model="form.desc"
    style="width: 240px"
    autosize
    type="textarea"
    placeholder="请简单描述您的光谱"
  />
      </el-form-item>

      <el-form-item label="光谱文件：" :label-width="formLabelWidth">
        <el-upload
    v-model:file-list="form.file1"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        仅支持XLSX文件类型
      </div>
    </template>
  </el-upload>
      </el-form-item>

      <el-form-item label="光谱图片：" :label-width="formLabelWidth">
        <el-upload
    v-model:file-list="form.file2"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png文件且小于500KB.
      </div>
    </template>
  </el-upload>
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          上传
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-button type="primary" style="margin-top: 50px;margin-left: 100px">导入标准库</el-button>

  <el-button type="primary" style="margin-top: 50px;margin-left: 100px">删除光谱</el-button>

  <div class="MySpectrumTable">

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55" />
    <el-table-column fixed prop="ID" label="光谱ID" width="120" />
    <el-table-column prop="name" label="光谱名称" width="120" />
    <el-table-column prop="type" label="光谱类型" width="120" />
    <el-table-column prop="standard" label="采用标准" width="120" />
    <el-table-column prop="file" label="光谱文件" width="600" />
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">
          重命名
        </el-button>
        <el-button link type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="example-pagination-block" style="margin-left: 400px; margin-top: 30px;">
    <el-pagination layout="prev, pager, next" :total="50" />
  </div>

  </div>

  </div>
</template>

<script lang="ts" setup>

import { reactive, ref} from 'vue'


const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  type: '',
  name1: '',
  name2: '',
  standard: '',
  file1: '',
  file2: '',
  desc: '',
})


const handleClick = () => {
  console.log('click')
}



const tableData = [
  {
    ID: '6020222563',
    name: 'Tom',
    type: '拉曼光谱',
    standard: 'ISO',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Kiley',
    type: '红外光谱',
    standard: '国标',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Tom',
    type: '拉曼光谱',
    standard: 'ISO',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Kiley',
    type: '红外光谱',
    standard: '国标',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Tom',
    type: '拉曼光谱',
    standard: 'ISO',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Kiley',
    type: '红外光谱',
    standard: '国标',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Kiley',
    type: '红外光谱',
    standard: '国标',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Tom',
    type: '拉曼光谱',
    standard: 'ISO',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Kiley',
    type: '红外光谱',
    standard: '国标',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Tom',
    type: '拉曼光谱',
    standard: 'ISO',
    file: 'No. 189, Grove St, Los Angeles',
  },
  {
    ID: '6020222563',
    name: 'Kiley',
    type: '红外光谱',
    standard: '国标',
    file: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="scss" scoped>

.MySpectrum{
        // border: 1px solid rgb(10, 10, 10);
        float: left;
        margin: 0;
        height: 800px;
        width: 1350px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 8px;
}
.MySpectrumTable{
        // border: 1px solid rgb(10, 10, 10);
        float: left;
        margin-top: 20px;
        margin-left: 100px;
        height: 500px;
        width: 1100px;
        // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
