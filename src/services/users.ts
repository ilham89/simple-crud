// @ts-nocheck
import axiosInstance from "../configs/axios";
export const userService = {
  list: async (page) => {
    const response = await axiosInstance({
      url: `/users?page=${page || 1}`,
      method: "get",
    });
    return response.data;
  },
  detail: async (id) => {
    const response = await axiosInstance({
      url: `/users/${id}`,
      method: "get",
    });
    return response.data;
  },
  create: async (data) => {
    const response = await axiosInstance({
      url: `/users`,
      method: "post",
      data,
    });
    return response.data;
  },
  update: async (data, id) => {
    const response = await axiosInstance({
      url: `/users/${id}`,
      method: "put",
      data,
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await axiosInstance({
      url: `/users/${id}`,
      method: "delete",
    });
    return response.data;
  },
};
