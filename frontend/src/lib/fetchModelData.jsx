import axios from 'axios';

const BASE_URL = "http://localhost:8081";
const API_BASE_URL = `${BASE_URL}/api`;

async function getListUser() {
  const { data } = await axios.get(`${API_BASE_URL}/user/list`);
  return data;
}

async function getUserProfile(id) {
  const { data } = await axios.get(`${API_BASE_URL}/user/${id}`);
  return data;
}

async function getUserPhoto(id) {
  const { data } = await axios.get(`${API_BASE_URL}/photo/photosOfUser/${id}`);
  return data;
}

async function getPhotoById(id) {
  const { data } = await axios.get(`${API_BASE_URL}/photo/photoById/${id}`);
  return data;
}

async function getListUserWithCounts() {
  const { data } = await axios.get(`${API_BASE_URL}/user/listWithCounts`);
  return data;
}

async function getCommentsOfUser(id) {
  const { data } = await axios.get(`${API_BASE_URL}/user/commentsOfUser/${id}`);
  return data;
}

export {
  BASE_URL,
  getListUser,
  getUserProfile,
  getUserPhoto,
  getPhotoById,
  getListUserWithCounts,
  getCommentsOfUser,
};
