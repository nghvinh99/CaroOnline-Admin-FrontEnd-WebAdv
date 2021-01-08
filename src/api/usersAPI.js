import Axios from 'axios';

export const usersAPI = {
  get: async function (path) {
    try {
      const res = await Axios({
        method: 'GET',
        url: path,
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
