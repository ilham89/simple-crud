<script setup lang="ts">
// @ts-nocheck

import { Back } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { reactive, ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "vue-query";
import { useRoute } from "vue-router";
import { WEB_SERVICES } from "../services";

const queryClient = useQueryClient();
const route = useRoute();
const dialogVisible = ref(false);
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "",
  job: "",
});

const rules = reactive({
  name: [{ required: true, message: "Please input name", trigger: "blur" }],
  job: [{ required: true, message: "Please input job", trigger: "blur" }],
});

const { isLoading, data } = useQuery(
  ["detail", route.params.id],
  () => WEB_SERVICES.User.detail(route.params.id),
  {
    enabled: !!route.params.id,
    onSuccess: (data) => {
      ruleForm.name = data.data.first_name + " " + data.data.last_name;
    },
  }
);

const { mutate: updateUser, isLoading: updateLoading } = useMutation(
  (data) => WEB_SERVICES.User.update(data, route.params.id),
  {
    onSuccess: () => {
      queryClient.invalidateQueries("detail");
      ElNotification({
        title: "Success",
        message: "Update user",
        type: "success",
      });
      dialogVisible.value = false;
    },
  }
);

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      updateUser(ruleForm);
    } else {
      return false;
    }
  });
};

onMounted(() => {
  if (!localStorage.getItem("user")) {
    router.push("/login");
  }
});
</script>

<template>
  <div v-if="isLoading" class="loading">Loading</div>
  <div class="container" v-if="data">
    <el-dialog v-model="dialogVisible" title="Update User">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="250px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="Name" prop="name">
          <el-input
            v-model="ruleForm.name"
            type="text"
            autocomplete="off"
            placeholder="Name"
          />
        </el-form-item>
        <el-form-item label="Job" prop="job">
          <el-input
            v-model="ruleForm.job"
            type="text"
            autocomplete="off"
            placeholder="Job"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            :loading="updateLoading"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>

    <div class="header">
      <RouterLink to="/">
        <el-button type="info" :icon="Back" circle />
      </RouterLink>
      <el-button type="primary" @click="dialogVisible = true"
        >Update User</el-button
      >
    </div>
    <el-descriptions title="User Info" border>
      <el-descriptions-item label="Name"
        >{{ data.data.first_name }}
        {{ data.data.last_name }}</el-descriptions-item
      >
      <el-descriptions-item label="Email">{{
        data.data.email
      }}</el-descriptions-item>
      <el-descriptions-item label="Image"
        ><img :src="data.data.avatar" :alt="data.data.first_name"
      /></el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.container {
  padding: 24px;
  margin-bottom: 24px;
}
.loading {
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
</style>
