<script setup>
import {
  computed,
  reactive,
  ref,
  toRaw,
} from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import {
  GetCode,
  login,
  menuPermissions,
  userAuthentication,
} from '../../api';

const imgUrl = new URL("../../../public/login-head.png", import.meta.url).href;
const formType = ref(0);
const handleChange = () => {
  formType.value = formType.value ? 0 : 1;
};
// 表单数据
const Loginform = reactive({
  userName: "",
  passWord: "",
  validCode: "",
});
// 定时器控制就是那个获取验证码的按钮
const logintext = reactive({
  text: "获取验证码",
  time: 60,
});

let flag = false; //定时器开始于结束的标志
let timerId = null; // 用于存储定时器 ID
const formCodechange = async () => {
  if (flag) return;

  let phonereg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
  if (!Loginform.userName || !phonereg.test(Loginform.userName)) {
    return ElMessage({
      message: "请输入正确的手机号",
      type: "warning",
    });
  }
  timerId = setInterval(() => {
    if (logintext.time <= 0) {
      // 定时器结束
      clearInterval(timerId);
      logintext.text = "获取验证码";
      logintext.time = 60;
      flag = false;
      return;
    } else {
      // 定时开始
      logintext.time -= 1;
      logintext.text = logintext.time + "s后重新获取";
    }
  }, 1000);
  // 定时器开启的标志
  flag = true;
  const res = await GetCode({ tel: Loginform.userName });
  console.log(res);
  if (res.data.code === 10000) {
    ElMessage.success("消息发送成功");
  }
};

// 账号校验规则
const validateUser = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    let phonereg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    phonereg.test(value)
      ? callback()
      : callback(new Error("手机格式不对，请输入正确的手机号"));
  }
};
const validatePss = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    let reg = /^[a-zA-Z0-9_-]{4,16}$/;
    reg.test(value)
      ? callback()
      : callback(new Error("密码不正确,请重新输入4-16位密码或者请去注册账号"));
  }
};

// 表单校验
const rules = reactive({
  userName: [{ validator: validateUser, trigger: "blur" }],
  passWord: [{ validator: validatePss, trigger: "blur" }],
});
// 手动触发表单验证
const ruleFormRef = ref();
const router = useRouter();
const store = useStore();
const routerList = computed(() =>   store.state.menu.routerList );

//提交按钮的实现
const submitform = async () => {
  const formEl = ruleFormRef.value;

  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    // console.log("数据",valid, fields);

    if (valid) {
      // console.log(Loginform, "submit!");
      // console.log(formType.value, "submit!");
      //  注册界面
      if (formType.value) {
        // console.log(Loginform);

        userAuthentication(Loginform).then(({ data }) => {
          // console.log(res);
          if (data.code === 10000) {
            ElMessage.success("注册成功，请立即登录");
            formType.value = 0;
          }
        });

        // 登录界面
      } else {
        login(Loginform).then(({ data }) => {
          // console.log(data);
          if (data.code === 10000) {
            ElMessage.success("登录成功");
            localStorage.setItem("pz_token", data.data.token);
            localStorage.setItem("pz_userInfo", JSON.stringify(data.data.userInfo));
            menuPermissions().then(({ data }) => {
              store.commit('dynamicMenu', data.data);
                // console.log( routerList);
                 toRaw(routerList.value).forEach(item => {
                // console.log(item);
                  
                 router.addRoute('main',item);

                });
               router.push("/");
            });
          }
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <img :src="imgUrl" alt="" />
        </div>
      </template>
      <div class="jump-link">
        <el-link type="primary" @click="handleChange">
          {{ formType === 1 ? "返回登录" : "立即注册" }}</el-link
        >
      </div>
      <el-form
        ref="ruleFormRef"
        :model="Loginform"
        style="max-width: 600px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="Loginform.userName"
            prefix-icon="UserFilled"
            placeholder="手机号"
          />
        </el-form-item>

        <el-form-item prop="passWord">
          <el-input
            v-model="Loginform.passWord"
            prefix-icon="Lock"
            type="passWord"
            placeholder="密码"
          />
        </el-form-item>

        <el-form-item v-if="formType" prop="validCode">
          <el-input v-model="Loginform.validCode" prefix-icon="Lock" placeholder="验证码">
            <template #append>
              <span class="code" @click="formCodechange">
                {{ logintext.text }}
              </span></template
            >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="submitform">{{
            !formType ? "登录" : "注册账号"
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<style lang="less" scoped>
:deep(.el-card__header) {
  padding: 0;
}
.login-container {
  height: 100%;
  .card-header {
    background-color: #7c96e3;
    img {
      width: 430px;
    }
  }
  .jump-link {
    text-align: right;
    margin-bottom: 10px;
  }
}
.code {
  color: #7c96e3;
}
.code:hover {
  cursor: pointer;
  color: #5c6fa8;
}
</style>
 