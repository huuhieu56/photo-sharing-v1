/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */

import axios from 'axios';
import models from '../modelData/models';

const API_BASE_URL = "http://localhost:8081/api";

// function fetchModel(url) {
//   const models = null;
//   return models;
// }

async function getListUser() {
  const { data } = await axios.get(`${API_BASE_URL}/user/list`);
  // const data = models.userListModel();
  return data;
}

async function getUserProfile(id) {
  const { data } = await axios.get(`${API_BASE_URL}/user/${id}`);
  // const data = models.userModel(id);
  return data;
}

async function getUserPhoto(id) {
  const { data } = await axios.get(`${API_BASE_URL}/photo/photosOfUser/${id}`);
  // const data = models.photoOfUserModel(id);
  return data;
}

async function getPhotoById(id) {
  const { data } = await axios.get(`${API_BASE_URL}/photo/photoById/${id}`);
  // const data = models.photoModel(id);
  return data
}

async function getSchemaInfo() {
  // const { data } = await axios.get(`${API_BASE_URL}/test/info`);
  const data = models.schemaInfo();
  return data;
}

export {
  getListUser,
  getUserProfile,
  getUserPhoto,
  getPhotoById
};

// export default fetchModel;
