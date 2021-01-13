import axios from 'axios';

export const adminAPI = {
  changeEmail: async function (info) {
    try {
      const res = await axios({
        method: 'POST',
        url: process.env.REACT_APP_API + '/auth/change-email',
        data: info,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  resetPasswordReq: async function (info) {
    const email = {
      email: info.email,
    }
    try {
      const res = await axios({
        method: 'POST',
        url: process.env.REACT_APP_API + '/auth/reset-password',
        data: email,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  resetPassword: async function (info) {
    const password = {
      password: info.password,
    }
    try {
      const res = await axios({
        method: 'POST',
        url: process.env.REACT_APP_API + '/auth/reset-password/' + info.token,
        data: password,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
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
  },
  changePassword: async function (info) {
    try {
      const res = await axios({
        method: 'POST',
        url: process.env.REACT_APP_API + '/auth/change-password',
        data: info,
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