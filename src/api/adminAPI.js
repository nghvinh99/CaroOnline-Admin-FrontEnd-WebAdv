import axios from 'axios';

export const adminAPI = {
  login: async function (user) {
    try {
      const res = await axios({
        method: 'POST',
        url: process.env.REACT_APP_API + '/auth/login',
        data: user,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  fetchAccountInfo: async function (id) {
    try {
      const res = await axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/auth/profile',
        params: { id: id },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  fetchInfo: async function () {
    try {
      const res = await axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/info',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}