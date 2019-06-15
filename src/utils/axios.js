import axios from 'axios';

console.log('setting up axios');
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
