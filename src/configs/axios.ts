import Axios from "axios";
import { ElNotification } from "element-plus";

const axiosInstance = Axios.create({
  baseURL: "https://reqres.in/api",
});

axiosInstance.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  };
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      ElNotification({
        title: "Something when wrong!",
        message: error?.response?.data?.error,
        type: "error",
      });
      return;
    }

    if (error.response?.status === 403) {
      ElNotification({
        title: "Something when wrong!",
        message: error?.response?.data?.error,
        type: "error",
      });
      localStorage.clear();
      window.location.href = "/login";
      return;
    }
    if (error.response?.status === 502) {
      ElNotification({
        title: "Something when wrong!",
        message: error?.response?.data?.error,
        type: "error",
      });
      return;
    }
    if (error.response?.status === 500) {
      ElNotification({
        title: "Something when wrong!",
        message: error?.response?.data?.error,
        type: "error",
      });
      return;
    }
    if (error.response?.status === 404) {
      ElNotification({
        title: "Something when wrong!",
        message: error?.response?.data?.error,
        type: "error",
      });

      window.location.replace("/");
      return;
    }
    if (error.response?.status === 400) {
      ElNotification({
        title: "Something when wrong!",
        message: error?.response?.data?.error,
        type: "error",
      });
      return;
    }
    if (error.response?.status === 422) {
      ElNotification({
        title: "Something when wrong!",
        message: error?.response?.data?.error,
        type: "error",
      });
      return;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
