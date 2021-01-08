import axios from 'axios';

export const adminAPI = {
  login: async function (user) {
    try {
      const res = await axios({
        method: 'POST',
        url: process.env.REACT_APP_API + '/auth/login',
        data: user,
      });
      localStorage.setItem("token", res.data);
      return res;
    } catch (err) {
      throw err;
    }
  }
}