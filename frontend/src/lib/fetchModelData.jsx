/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';

const BASE_URL = "http://localhost:8081";
const API_BASE_URL = `${BASE_URL}/api`;

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function loginUser(login_name, password) {
  const { data } = await api.post("/admin/login", { login_name, password });
  return data;
}

async function logoutUser() {
  const { data } = await api.post("/admin/logout");
  return data;
}

async function registerUser(userData) {
  const { data } = await axios.post(`${API_BASE_URL}/user`, userData);
  return data;
}

async function getListUser() {
  const { data } = await api.get("/user/list");
  return data;
}

async function getUserProfile(id) {
  const { data } = await api.get(`/user/${id}`);
  return data;
}

async function getUserPhoto(id) {
  const { data } = await api.get(`/photo/photosOfUser/${id}`);
  return data;
}

async function getPhotoById(id) {
  const { data } = await api.get(`/photo/photoById/${id}`);
  return data;
}

async function getListUserWithCounts() {
  const { data } = await api.get("/user/listWithCounts");
  return data;
}

async function getCommentsOfUser(id) {
  const { data } = await api.get(`/user/commentsOfUser/${id}`);
  return data;
}

async function addComment(photoId, comment) {
  const { data } = await api.post(`/comment/commentsOfPhoto/${photoId}`, { comment });
  return data;
}

async function uploadPhoto(file) {
  const formData = new FormData();
  formData.append("photo", file);
  const { data } = await api.post("/photo/photos/new", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export {
  BASE_URL,
  loginUser,
  logoutUser,
  registerUser,
  getListUser,
  getUserProfile,
  getUserPhoto,
  getPhotoById,
  getListUserWithCounts,
  getCommentsOfUser,
  addComment,
  uploadPhoto,
};
