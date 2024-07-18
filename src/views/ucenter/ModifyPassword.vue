<template>
    <div class="form-container">
        <div class="container">
            <el-form
            :model="formData"
            :rules="rules"
            ref="formDataRef"
            label-width="80px"
            @submit.prevent
            >
            <el-form-item label="原始密码" prop="password" >
                <el-input type="password" placeholder="请输入原始密码" v-model="formData.password">
                    <template #prefix>
                    <span class="iconfont icon-password"></span>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPassword" >
                <el-input type="password"  placeholder="请输入新密码" v-model="formData.newPassword">
                    <template #prefix>
                    <span class="iconfont icon-password"></span>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="confirmPawword" >
                <el-input type="password" placeholder="请再次输入新密码" v-model="formData.confirmPawword">
                    <template #prefix>
                    <span class="iconfont icon-password"></span>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item label="验证码" prop="emailCode">
                <div class="check-code-panel">
                <el-input
                    clearable
                    placeholder="请输入邮箱验证码"
                    v-model.trim="formData.emailCode"
                >
                    <template #prefix>
                    <span class="iconfont icon-checkcode"></span>
                    </template>
                </el-input>
                <el-button type="primary" class="btn" @click="getEmailCode">{{ buttonText }}</el-button>
            </div>
            </el-form-item>
            <el-form-item>
                <el-button class="op-btn" type="primary" @click="doSubmit">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const formData = ref({});
const formDataRef = ref();
const rules = ref({
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 8, max: 16, message: "密码长度必须在8到16位之间", trigger: "blur" },
    { validator: validatePassword, trigger: "blur" }
  ],
  confirmPawword: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    { validator: validateConfirmPassword, trigger: "blur" }
  ],
  emailCode: [
    { required: true, message: "请输入邮箱验证码", trigger: "blur" },
    { min: 6, max: 6, message: "验证码必须是6位数字", trigger: "blur" },
    { validator: validateEmailCode, trigger: "blur" }
  ]
});

// 密码验证器
function validatePassword(rule, value, callback) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  if (regex.test(value)) {
    callback();
  } else {
    callback(new Error("密码必须包含8-16位英文字母和数字"));
  }
}

// 确认密码验证器
function validateConfirmPassword(rule, value, callback) {
  if (value === formData.value.newPassword) {
    callback();
  } else {
    callback(new Error("两次输入的密码不一致"));
  }
}

// 验证码验证器
function validateEmailCode(rule, value, callback) {
  const regex = /^\d{6}$/;
  if (regex.test(value)) {
    callback();
  } else {
    callback(new Error("验证码为6位数字"));
  }
}

const buttonText = ref('获取邮箱验证码')
const isCounting = ref(false)
const countdownTime = ref(60)
const interval = ref()
const getEmailCode = () => {
  if (isCounting.value) return

  isCounting.value = true
  buttonText.value = `${countdownTime.value}s`

    interval.value = setInterval(() => {
    countdownTime.value--
    buttonText.value = `${countdownTime.value}s`

    if (countdownTime.value <= 0) {
      clearInterval(interval)
      buttonText.value = '点击获取验证码'
      isCounting.value = false
      countdownTime.value = 60
    }
  }, 1000)
  ElMessage({
    message: '发送成功，请注意查收',
    type: 'success',
  })
  //请求后端发送邮箱验证码
  formDataRef.validator(() => {
  })
}
const doSubmit = () => {
    //重置计数器
    clearInterval(interval.value)
    buttonText.value = '点击获取验证码'
    isCounting.value = false
    countdownTime.value = 60
    ElMessage.success('修改成功')
    //后端请求
}
</script>

<style lang="scss" scoped>
.form-container {
  display: relative;
  .container {
    position: absolute;
    max-width: 500px;
    padding: 50px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    box-shadow: 2px 2px 10px #a5a4a4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .el-form-item {
    width: 100%;
  }

  .bottom-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .check-code-panel {
    display: flex;
    align-items: center;
    .btn{
      width:120px;
      margin-left: 5px;
      height: 40px;
    }
    .check-code{
      margin-left: 5px;
      cursor: pointer;
    }
  }
  .title{
    font-size: 24px;
  }
  .el-input {
    height: 40px;;
  }
  .links {
    display: flex;

    .a-link {
      margin-left: 10px;
      color: #409eff;
      text-decoration: none;
    }

    .a-link:hover {
      text-decoration: underline;
    }
  }
  .op-btn {
    width: 100%;
  }
  }
}
</style>
