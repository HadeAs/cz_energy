<template>
  <div class="page-container">
    <div class="cs-login-header">
      <img src="@/assets/img/logo.png" />
      <span class="cs-header-text">建筑能耗与碳排放检测平台</span>
      <span class="cs-header-sub">V1.0</span>
    </div>
    <div class="cs-login-content">
      <div class="cs-login-wrapper">
        <p class="cs-login-title">欢迎登录</p>
        <el-tabs
          v-model="state.activeName"
          class="login-tabs"
          @tab-click="changeLogin"
        >
          <el-tab-pane label="密码登录" name="pwd">
            <el-form
              ref="formPwd"
              size="large"
              :rules="pwdRules"
              :model="state.pwdForm"
            >
              <el-form-item prop="userName">
                <el-input v-model="state.pwdForm.userName" placeholder="用户名">
                  <template #prefix>
                    <el-icon><UserFilled /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  autocomplete="off"
                  v-model="state.pwdForm.password"
                  placeholder="密码"
                  @keyup.enter="submitForm"
                >
                  <template #prefix>
                    <el-icon><Lock /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="短信登录" name="msg">
            <el-form
              ref="formMsg"
              size="large"
              :rules="msgRules"
              :model="state.msgForm"
            >
              <el-form-item prop="phone">
                <el-input v-model="state.msgForm.phone" placeholder="手机号码">
                  <template #prefix>
                    <el-icon><Iphone /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  v-model="state.msgForm.code"
                  placeholder="验证码"
                  class="code-input"
                  @keyup.enter="submitForm"
                >
                  <template #prefix>
                    <el-icon><Message /></el-icon>
                  </template>
                  <template #append>
                    <el-button
                      size="large"
                      :type="
                        state.msgText === '获取验证码' ? 'primary' : 'default'
                      "
                      :disabled="state.msgText === '获取验证码' ? false : true"
                      @click="getCaptcha"
                      >{{ state.msgText }}</el-button
                    >
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" size="large" @click="submitForm">
          登陆
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="Login">
import { reactive, ref } from "vue";
import { UserFilled, Lock, Iphone, Message } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { loginWithPwd, getCode, loginWithPhone } from "@/api/login";
import basicStore from "@/store";
import { ElMessage } from "element-plus";

const { setUserInfo } = basicStore.useUserStore;
const phoneTest = /^1[3456789]\d{9}$/;
const pwdRules = reactive({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const msgRules = reactive({
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: phoneTest,
      message: "手机号码格式不正确",
      trigger: "blur",
    },
  ],
  code: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
});
const router = useRouter();
const formPwd = ref();
const formMsg = ref();
const state = reactive({
  activeName: "pwd",
  pwdForm: {
    userName: "",
    password: "",
  },
  msgForm: {
    phone: "",
    code: "",
  },
  msgText: "获取验证码",
  phoneValid: false,
});
const changeLogin = () => {
  if (state.activeName === "pwd") {
    formMsg.value.resetFields();
  } else {
    formPwd.value.resetFields();
  }
};
const getCaptcha = async () => {
  await formMsg.value.validateField("phone", async (valid) => {
    if (valid) {
      let n = 60;
      state.msgText = n + "S";
      const timer = setInterval(() => {
        if (n === 0) {
          clearInterval(timer);
          state.msgText = "获取验证码";
        } else {
          n--;
          state.msgText = n + "S";
        }
      }, 1000);
      const { data } = await getCode({ phone: state.msgForm.phone });
      ElMessage.success("验证码发送成功");
    }
  });
};
const submitForm = async () => {
  const formRef = state.activeName === "pwd" ? formPwd.value : formMsg.value;
  await formRef.validate(async (valid) => {
    if (valid) {
      const param = state.activeName === "pwd" ? state.pwdForm : state.msgForm;
      const loginMethod =
        state.activeName === "pwd" ? loginWithPwd : loginWithPhone;
      const { data } = await loginMethod(param);
      setUserInfo(data.loginUser);
      router.push({ path: "/" });
    }
  });
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  min-height: 100%;
  background: url(@/assets/img/login-bg.jpg) no-repeat;
  background-size: cover;
  overflow-y: scroll;
  position: relative;
  .cs-login-header {
    display: flex;
    align-items: center;
    padding: 24px 0 0 24px;
    img {
      width: 53px;
      height: 34px;
    }
    .cs-header-text {
      font-size: 24px;
      line-height: 30px;
      font-weight: bold;
      color: #fff;
      margin-left: 6px;
      margin-right: 6px;
    }
    .cs-header-sub {
      font-size: 16px;
      line-height: 18px;
      color: #ff3300;
    }
  }
  .cs-login-content {
    position: absolute;
    // width: 442px;
    // height: 515px;
    // width: 22%;
    // height: 47%;
    min-width: 440px;
    font-size: 20px;
    top: 50%;
    left: 50%;
    // margin-top: 80px;
    // margin-bottom: 80px;
    transform: translate(-50%, -50%);
    .cs-login-wrapper {
      padding: 60px;
      background-color: #fff;
      border-radius: 10px;
      .cs-login-title {
        font-size: 16px;
        color: #2b3eb1;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
        margin-top: 0;
      }
      :deep() {
        .el-tabs__header {
          margin-bottom: 30px;
        }
        .el-tabs__nav {
          width: 100%;
          .el-tabs__active-bar {
            width: 50% !important;
          }
          .el-tabs__item {
            flex: 1;
            color: #9aa5c5;
            &.is-active,
            &:hover {
              color: var(--el-color-primary);
            }
          }
        }
        .el-form-item--large {
          margin-bottom: 30px;
        }
        .el-input--large {
          font-size: 15px;
        }
        > .el-button {
          width: 100%;
          font-size: 14px;
          height: 45px;
          margin-top: 55px;
        }
      }
      .code-input {
        :deep() {
          .el-input-group__append {
            .el-button--large {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              background-color: var(--el-button-bg-color);
              border-color: var(--el-button-border-color);
              color: var(--el-button-text-color);
              width: 110px;
              border-left: none;
            }
          }
        }
      }
    }
  }
}
</style>
