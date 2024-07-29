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
              <el-button type="primary" @click="uploadVisable = true">上传算法</el-button>
              <el-dialog
                v-model="uploadVisable"
                title="上传算法"
                width="500"
                :before-close="handleClose"
              >
                <div class="upload-form">
                  <el-form
                  :model="formData"
                  :rules="rules2Algo"
                  ref="formDataRef"
                  label-width="80px"
                  @submit.prevent
                  >
                    <el-form-item label="算法名称" prop="algoName" >
                      <el-input clearable placeholder="提示信息" v-model.trim="formData.algoName"></el-input>
                    </el-form-item>
                    <el-form-item label="算法类别" prop="algoType" >
                      <el-cascader
                        placeholder="请选择算法类别"
                        :options="algoTypeList"
                        :props="algoProps"
                        clearable
                        v-model="formData.algoType"
                        :style="{ width: '100%' }"
                      />
                    </el-form-item>
                    <el-form-item label="算法描述" prop="algoDesc">
                        <el-input
                          clearable
                          placeholder="提示信息"
                          type="textarea"
                          :rows="5"
                          :maxlength="150"
                          resize="none"
                          show-word-limit
                          v-model.trim="formData.algoDesc"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="算法文件" prop="algoFile">
                      <el-upload
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                      >
                        <el-button type="primary">选择算法文件</el-button>
                        <template #tip>
                          <div class="el-upload__tip">
                            jar/py files with a size less than 10MB.
                          </div>
                        </template>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                </div>

                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="uploadVisable = false">取消</el-button>
                    <el-button type="primary" @click="upload">
                      上传
                    </el-button>
                  </div>
                </template>
              </el-dialog>
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
              <span class="a-link" @click="showApply">申请入库</span>
              <span class="a-link">下载</span>
              <span class="a-link">删除</span>
            </div>
        </template>
    </Table>
    <el-dialog
        v-model="applyVisiable"
        title="上传算法"
        width="500"
    >
      <div class="apply-panel">
        <el-input
            clearable
            placeholder="请简要描述你的算法..."
            type="textarea"
            :rows="5"
            :maxlength="150"
            resize="none"
            show-word-limit
            v-model.trim="formData.algoDesc"
        ></el-input>
        <el-button type="primary" class="apply-button">
          申请
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue'
const loadDataList = () => {}
const tableOptions = ref({
  selectType: 'checkbox',
  extHeight: 110
})
const uploadVisable = ref(false)
const applyVisiable = ref(false)
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
    width: 200,
    scopedSlots: 'time'
  },
  {
    label: '操作',
    prop: 'op',
    width: 300,
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
//算法上传
const formData = ref({});
const formDataRef = ref();
const rules2Algo = {
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
const showApply = () => {
  applyVisiable.value = true
  formData.value.algoDesc = ''
}
</script>

<style lang="scss" scoped>
.a-link {
      margin-left: 10px;
      color: #409eff;
      text-decoration: none;
      cursor: pointer;
}
.upload-form {
  margin: 20px;
}
.dialog-footer {
  margin: 0px 20px 20px 0px;
}
.apply-panel {
  position: relative; /* 设置为相对定位，以便绝对定位子元素 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end; /* 使得元素在交叉轴的末端对齐 */
  padding: 10px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .el-textarea {
    flex-grow: 1; /* 让输入框占据剩余空间 */
    margin-bottom: 10px; /* 与按钮之间的间距 */
  }

  .el-textarea__inner {
    border-color: #dcdfe6; /* 输入框边框颜色 */
    border-radius: 4px; /* 输入框边框圆角 */
    padding: 10px; /* 输入框内边距 */
    resize: none; /* 禁止调整大小 */
    font-size: 14px; /* 字体大小 */
  }

  .el-button {
    padding: 8px 20px; /* 按钮内边距 */
    border-radius: 20px; /* 按钮边框圆角 */
    font-size: 16px; /* 字体大小 */
  }
}
</style>
