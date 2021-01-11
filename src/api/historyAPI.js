import Axios from 'axios';

export const historyAPI = {
  get: async function (filter) {
    try {
      const res = await Axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/history',
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
}
