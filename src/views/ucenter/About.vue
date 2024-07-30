<template>
  <div class="UpdateUserDataCard">
    <div class="avatar">
      <el-avatar
        style="height: 200px; width: 200px"
        src="https://img2.baidu.com/it/u=3417678655,3845963161&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=527"
      />
      <el-button style="margin-left: 45px" type="primary">
        上传头像<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>

    <div class="UserData">
      <el-form
        :model="UserDataForm"
        ref="formRef"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="UserDataForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="UserDataForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="UserDataForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="UserDataForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="所属单位" prop="address">
          <el-input v-model="UserDataForm.address"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
          <el-input
            v-model="UserDataForm.introduction"
            autosize
            type="textarea"
            placeholder="请介绍一下自己吧！"
          />
        </el-form-item>
      </el-form>

      <el-button
        style="margin-top: 80px; margin-left: 600px; width: 120px"
        type="primary"
        round
        >修改</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const UserDataForm = ref({
  username: '念风',
  email: '1323965112@qq.com',
  phone: '15179226499',
  address: '江西农业大学',
  sex: '男',
  introduction: '一个阳光开朗大男孩！！！'
})
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]
})
</script>

<style lang="scss" scoped>
.UpdateUserDataCard {
  /* border: 1px solid rgb(10, 10, 10); */
  float: left;
  margin: 0;
  height: 800px;
  width: 1600px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}
.avatar {
  /* border: 1px solid rgb(10, 10, 10); */
  float: left;
  margin-left: 80px;
  margin-top: 50px;
  height: 250px;
  width: 200px;
}
.UserData {
  /* border: 1px solid rgb(10, 10, 10); */
  float: left;
  margin-left: 100px;
  margin-top: 50px;
  height: 650px;
  width: 800px;
  line-height: 20px;
}
</style>
