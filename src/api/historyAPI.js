import Axios from 'axios';

export const historyAPI = {
  get: async function () {
    try {
      const res = await Axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/history',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  getWithId: async function (userId) {
    try {
      const user = {
        userId: userId,
      }
      const res = await Axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/history/player',
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
  getGameData: async function (gameId) {
    try {
      const game = {
        gameId: gameId
      }
      const res = await Axios({
        method: 'GET',
        url: process.env.REACT_APP_API + '/history/game/',
        params: game,
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
