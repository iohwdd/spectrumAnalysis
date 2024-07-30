<template>
  <div class="ApplyAdministrator">
    <div class="UserApplyData">
      <el-form
        :model="UserApplyData"
        ref="formRef"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="真实姓名" prop="username">
          <el-input v-model="UserApplyData.username"></el-input>
        </el-form-item>

        <el-form-item label="身份证号" prop="number">
          <el-input v-model="UserApplyData.number"></el-input>
        </el-form-item>

        <el-form-item label="申请理由" prop="reason">
          <el-input
            v-model="UserApplyData.reason"
            autosize
            type="textarea"
            placeholder="请阐述申请理由！"
          />
        </el-form-item>
      </el-form>

      <el-button
        style="margin-top: 80px; margin-left: 600px; width: 120px"
        type="primary"
        round
        >申请</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplyAdministrator',
  data() {
    return {
      UserApplyData: {
        username: '念风',
        number: '36043020021021353X',
        reason: '想要成为管理员'
      },
      rules: {
        username: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '真实姓名长度应在2到20个字符之间',
            trigger: 'blur'
          }
        ],
        number: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '无效身份证', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '请输入申请理由', trigger: 'blur' },
          {
            max: 255,
            message: '申请理由长度应在1到225个字符之间',
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style>
.ApplyAdministrator {
  /* border: 1px solid rgb(10, 10, 10); */
  float: left;
  margin: 0;
  height: 800px;
  width: 1300px;
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
.UserApplyData {
  /* border: 1px solid rgb(10, 10, 10); */
  float: left;
  margin-left: 100px;
  margin-top: 50px;
  height: 650px;
  width: 800px;
  line-height: 20px;
}
</style>
