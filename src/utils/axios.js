import axios from 'axios';

import config from '../config/config.json';

const instance = axios.create({
  baseURL: config.serverUrl,
  timeout: 15000
});

console.log('setting up axios');

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
export default instance;
