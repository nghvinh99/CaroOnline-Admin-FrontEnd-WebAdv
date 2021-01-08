import Axios from 'axios';

export const usersAPI = {
  get: async function (path) {
    try {
      const res = await Axios({
        method: 'GET',
        url: path,
        withCredentials: true,
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
}
