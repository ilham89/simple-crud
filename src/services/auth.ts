// @ts-nocheck
import axiosInstance from "../configs/axios";
export const authService = {
  register: async (data) => {
    const response = await axiosInstance({
      url: `/register`,
      method: "post",
      data,
    });
    return response.data;
  },
  login: async (data) => {
    const response = await axiosInstance({
      url: `/login`,
      method: "post",
      data,
    });
    return response.data;
  },
};
