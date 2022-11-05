<script lang="ts" setup>
// @ts-nocheck
import { FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { useMutation } from "vue-query";
import { useRouter } from "vue-router";
import { WEB_SERVICES } from "../services";

const router = useRouter();
const ruleFormRef = ref();
const ruleForm = reactive({
  password: "",
  email: "",
});
const rules = reactive({
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
    { min: 5, message: "Min length 5", trigger: "blur" },
  ],
  email: [
    {
      required: true,
      type: "email",
      message: "Please input valid email",
      trigger: "blur",
    },
  ],
});
const { mutate, isLoading } = useMutation(
  (data) => WEB_SERVICES.Auth.login(data),
  {
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    },
  }
);
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      mutate(ruleForm);
    } else {
      return false;
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <div class="container">
    <div style="width: 250px">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="250px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="Email" prop="email">
          <el-input
            v-model="ruleForm.email"
            type="text"
            autocomplete="off"
            placeholder="Email"
          />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="Password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >Submit</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
      <p>
        Not registered yet?
        <router-link to="/register">Create an account</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 10px;
}
</style>
