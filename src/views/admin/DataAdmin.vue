<template>
  <div class="backup-restore">
    <h1>备份与还原</h1>
    <div class="actions">
      <el-button type="primary" @click="backupData">备份数据</el-button>
      <el-upload
        class="upload-demo"
        action=""
        :before-upload="beforeUpload"
        :on-change="handleUploadChange"
        :file-list="fileList"
      >
        <el-button type="primary">还原数据</el-button>
      </el-upload>
    </div>
    <el-table :data="backupList" style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="name"
        label="备份名称"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="备份日期"
        width="300"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="text" size="small" @click="restoreBackup(scope.row)"
            >还原</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const fileList = ref([])

const backupList = ref([
  { name: 'backup_20240730', date: '2024-07-30' },
  { name: 'backup_20240729', date: '2024-07-29' }
])

const fetchBackups = async () => {
  try {
    const response = await axios.get('http://your-backend-api-endpoint/backups')
    backupList.value = response.data
  } catch (error) {
    ElMessage.error('获取备份列表失败')
  }
}

const backupData = async () => {
  try {
    const response = await axios.post('http://your-backend-api-endpoint/backup')
    if (response.data.status === 'success') {
      ElMessage.success(response.data.message)
      fetchBackups()
    } else {
      ElMessage.error(response.data.message || '数据备份失败')
    }
  } catch (error) {
    ElMessage.error(
      '数据备份失败: ' + (error.response?.data?.message || error.message)
    )
  }
}

const beforeUpload = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(
      'http://your-backend-api-endpoint/restore',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    if (response.data.status === 'success') {
      ElMessage.success(response.data.message)
      fetchBackups()
    } else {
      ElMessage.error(response.data.message || '数据还原失败')
    }
  } catch (error) {
    ElMessage.error(
      '数据还原失败: ' + (error.response?.data?.message || error.message)
    )
  }

  // 阻止el-upload的自动上传
  return false
}

const handleUploadChange = (file, fileList) => {
  // You can handle the upload change event here if needed
}

const restoreBackup = async (backup) => {
  try {
    const response = await axios.post(
      'http://your-backend-api-endpoint/restore',
      { name: backup.name }
    )
    if (response.data.status === 'success') {
      ElMessage.success(response.data.message)
    } else {
      ElMessage.error(response.data.message || '数据还原失败')
    }
  } catch (error) {
    ElMessage.error(
      '数据还原失败: ' + (error.response?.data?.message || error.message)
    )
  }
}

onMounted(() => {
  fetchBackups()
})
</script>

<style scoped>
.backup-restore {
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 900px;
  margin: 50px auto;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.el-button {
  min-width: 150px;
}

.upload-demo {
  display: inline-block;
}

.el-table {
  background-color: #fafafa;
  border-radius: 10px;
  overflow: hidden;
}

.el-table th,
.el-table td {
  padding: 12px 8px;
}

.el-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.el-table td {
  text-align: center;
}

.el-button--text {
  color: #409eff;
}

.el-button--text:hover {
  color: #66b1ff;
}

.el-message {
  margin-top: 20px;
}
</style>
