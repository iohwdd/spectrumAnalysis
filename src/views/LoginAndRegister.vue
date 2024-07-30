<template>
  <div class="form-container">
    <div class="container">
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="70px"
        @submit.prevent
        v-if="opType == 0"
      >
        <el-form-item>
          <div class="title">光谱仪集成软件分析系统</div>
        </el-form-item>
        <el-form-item label="账号" prop="email">
          <el-input
            clearable
            placeholder="请输入账号"
            v-model.trim="formData.email"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            clearable
            placeholder="请输入密码"
            v-model.trim="formData.password"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkCode">
          <div class="check-code-panel">
            <el-input
              clearable
              placeholder="请输入验证码"
              v-model.trim="formData.checkCode"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img src="../assets/image.png" class="check-code" />
          </div>
        </el-form-item>

        <el-form-item>
          <div class="bottom-panel">
            <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
            <div class="links">
              <a href="javascript:void(0)" class="a-link" @click="showPanel(2)"
                >忘记密码?</a
              >
              <a href="javascript:void(0)" class="a-link" @click="showPanel(1)"
                >没有账号?</a
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="op-btn" @click="doSubmit">
            <span>登录</span>
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="70px"
        @submit.prevent
        v-if="opType == 1"
      >
        <el-form-item>
          <div class="title">光谱仪集成软件分析系统</div>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            clearable
            placeholder="请输入邮箱"
            v-model.trim="formData.email"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
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
            <el-button type="primary" class="btn" @click="getEmailCode">{{
              buttonText
            }}</el-button>
          </div>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input
            clearable
            placeholder="请输入昵称"
            v-model.trim="formData.nickName"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            clearable
            placeholder="请输入密码"
            v-model.trim="formData.password"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            clearable
            placeholder="请再次输入密码"
            v-model.trim="formData.confirmPassword"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="checkCode">
          <div class="check-code-panel">
            <el-input
              clearable
              placeholder="请输入验证码"
              v-model.trim="formData.checkCode"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img src="../assets/image.png" class="check-code" />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="op-btn" @click="doSubmit">
            <span>注册</span>
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="70px"
        @submit.prevent
        v-if="opType == 2"
      >
        <el-form-item>
          <div class="title">光谱仪集成软件分析系统</div>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            clearable
            placeholder="请输入邮箱"
            v-model.trim="formData.email"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
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
            <el-button type="primary" class="btn" @click="getEmailCode()">{{
              buttonText
            }}</el-button>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            clearable
            placeholder="请输入密码"
            v-model.trim="formData.password"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            clearable
            placeholder="请再次输入密码"
            v-model.trim="formData.confirmPassword"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="checkCode">
          <div class="check-code-panel">
            <el-input
              clearable
              placeholder="请输入验证码"
              v-model.trim="formData.checkCode"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img src="../assets/image.png" class="check-code" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="op-btn" @click="doSubmit">
            <span>重置密码</span>
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="80px"
        @submit.prevent
        v-if="opType == 3"
      >
        <el-form-item label="" prop="">
          <div class="title">申请解禁</div>
        </el-form-item>
        <el-form-item label="邮箱账号" prop="">
          <el-input
            clearable
            placeholder="提示信息"
            v-model.trim="formData.a"
          ></el-input>
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
            <el-button type="primary" class="btn" @click="getEmailCode()">{{
              buttonText
            }}</el-button>
          </div>
        </el-form-item>
        <el-form-item label="申请理由" prop="">
          <el-input
            clearable
            placeholder="提示信息"
            type="textarea"
            :rows="5"
            :maxlength="150"
            resize="none"
            show-word-limit
            v-model.trim="formData.b"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn">提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import { ElMessage } from 'element-plus'
const proxy = getCurrentInstance()
const formData = ref({
  account: '',
  password: '',
  checkCode: '',
  rememberMe: false
})
const formDataRef = ref()
const validatePassword = (rule, value, callback) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
  if (!value) {
    callback(new Error('请输入密码'))
  } else if (!passwordRegex.test(value)) {
    callback(new Error('密码必须是8-16位，由数字和字母组成'))
  } else {
    callback()
  }
}
const rules = {
  email: [
    { required: true, message: '请输入邮箱账号' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  checkCode: [{ required: true, message: '请输入验证码' }],
  emailCode: [{ required: true, message: '请输入邮箱验证码' }]
}
const opType = ref(0)
const doSubmit = () => {
  if (opType.value == 0) {
    //请求后端
  }
  if (opType.value === 1) {
    ElMessage({
      message: '注册成功',
      type: 'success'
    })
    showPanel(0)
    //请求后端
  }
  if (opType.value == 2) {
    ElMessage({
      message: '重置成功',
      type: 'success'
    })
    showPanel(0)
    //请求后端
  }
}
const showPanel = (type) => {
  if (type == 0) {
    //登录
    formDataRef.value.resetFields()
    opType.value = 0
    //请求后端
  }
  if (type == 1) {
    //注册
    formDataRef.value.resetFields()
    opType.value = 1
    clearInterval(interval.value)
    buttonText.value = '点击获取验证码'
    isCounting.value = false
    countdownTime.value = 60
    //请求后端
  }
  if (type == 2) {
    //找回密码
    formDataRef.value.resetFields()
    opType.value = 2
    clearInterval(interval.value)
    buttonText.value = '点击获取验证码'
    isCounting.value = false
    countdownTime.value = 60
    //请求后端
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
    type: 'success'
  })
  //请求后端发送邮箱验证码
}
</script>

<style lang="scss" scoped>
.form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(../assets/光谱主界面背景.jpg) no-repeat center center;
  background-size: cover;
  z-index: -1; /* 确保伪元素在容器后面 */
}
.form-container {
  display: relative;
  .container {
    position: absolute;
    max-width: 500px;
    padding: 50px;
    background: rgba(254, 254, 254, 0.6);
    border-radius: 5px;
    box-shadow: 2px 2px 10px #2b2b2b;
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
    .btn {
      width: 320px;
      margin-left: 5px;
      height: 35px;
    }
    .check-code-panel {
      display: flex;
      align-items: center;
      .btn {
        width: 120px;
        margin-left: 5px;
        height: 40px;
      }
      .check-code {
        margin-left: 5px;
        cursor: pointer;
      }
    }
    .title {
      font-size: 24px;
    }
    .el-input {
      height: 40px;
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
