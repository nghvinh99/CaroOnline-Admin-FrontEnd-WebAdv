import Axios from 'axios';

export const usersAPI = {
  get: async function (filter) {
    try {
      const res = await Axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/users',
        params: filter,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  getSingle: async function (userId) {
    const user = {
      userId: userId
    }
    try {
      const res = await Axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/users/user',
        params: user,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  flipStatus: async function (userId) {
    try {
      const user = {
        userId: userId
      }
      const res = await Axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/users/block',
        params: user,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  fetchAllPlayerNames: async function () {
    try {
      const res = await Axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/users/all-player-names',
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
