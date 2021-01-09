import Axios from 'axios';

export const usersAPI = {
  get: async function (path, filter) {
    try {
      const res = await Axios({
        method: 'GET',
        url: path,
        params: filter,
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
