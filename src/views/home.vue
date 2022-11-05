<script setup lang="ts">
// @ts-nocheck
import { ElNotification } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "vue-query";
import { useRouter } from "vue-router";
import { WEB_SERVICES } from "../services";

const router = useRouter();
const queryClient = useQueryClient();
const change = (newPage) => {
  page.value = newPage;
};
const page = ref(1);

const { isLoading, data } = useQuery(["users", page], () =>
  WEB_SERVICES.User.list(page.value)
);

const { mutate: deleteUser } = useMutation(
  (id) => WEB_SERVICES.User.delete(id),
  {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      ElNotification({
        title: "Success",
        message: "Delete user",
        type: "success",
      });
    },
  }
);

const handleDelete = (_index, row) => {
  deleteUser(row.id);
};

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

const { mutate: createUser, isLoading: createLoading } = useMutation(
  (data) => WEB_SERVICES.User.create(data),
  {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      ElNotification({
        title: "Success",
        message: "Create user",
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
      createUser(ruleForm);
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
  <div class="container">
    <div class="header">
      <h4>Users</h4>
      <el-button type="primary" @click="dialogVisible = true"
        >Create User</el-button
      >
    </div>
    <el-dialog v-model="dialogVisible" title="Create User">
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
            :loading="createLoading"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>

    <el-table
      v-loading="isLoading"
      border
      v-if="data"
      :data="data.data"
      style="width: 100%"
    >
      <el-table-column label="Name">
        <template #default="scope">
          <span> {{ scope.row.first_name }} {{ scope.row.last_name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="Email" prop="email" />
      <el-table-column label="Image">
        <template #default="scope">
          <img :src="scope.row.avatar" :alt="scope.row.first_name" />
        </template>
      </el-table-column>
      <el-table-column :align="'right'" label="Action">
        <template #default="scope">
          <el-button
            size="small"
            type="info"
            @click="router.push(`/users/${scope.row.id}`)"
            >Detail</el-button
          >

          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        v-if="data"
        :total="data.total"
        @current-change="change"
        :current-page="page"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 24px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  margin: 16px 0px;
  display: flex;
  justify-content: flex-end;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
