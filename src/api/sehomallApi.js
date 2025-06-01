import axios from "axios";
import { BASE_URL } from "./baseUrl";

const UserLogin = async (email, password) => {
  return axios.post(`${BASE_URL}/user/login`, {
    email,
    password,
  });
};

const UserSignup = async (userInfo) => {
  return axios.post(`${BASE_URL}/user/sign-up`, userInfo);
};

const UserLogout = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.delete(`${BASE_URL}/user/logout`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const EnrollPostApi = async (english, korean, categoryId) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.post(
    `${BASE_URL}/api/create-post`,
    {
      english,
      korean,
      categoryId,
    },
    {
      headers: {
        accessToken,
        refreshToken,
      },
    }
  );
};

const GetCategoriesApi = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/api/categories`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

export { UserLogin, UserLogout, UserSignup, EnrollPostApi, GetCategoriesApi };
