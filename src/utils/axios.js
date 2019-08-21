import axios from 'axios';

import config from '../config/config.json';

const instance = axios.create({
  baseURL: config.serverUrl,
  timeout: 15000
});

const setupAxios = () => {
  const userDataString = localStorage.getItem('userData');
  let userData = {};
  let loggedIn = false;
  if (userDataString) {
    userData = JSON.parse(userDataString);
    if (userData && userData.error) {
      loggedIn = false;
    } else {
      loggedIn = true;
    }
  }

  if (loggedIn) {
    instance.defaults.headers.common.Authorization = userData.tokenId;
  }
};

setupAxios();

instance.setUp = setupAxios;

export default instance;
