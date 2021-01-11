import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Dashboards from '.';

export default function Dashboard() {
  const history = useHistory();

  const handleLogout = () => {
    const call = async function () {
      try {
        const res = await Axios({
          url: process.env.REACT_APP_API + '/auth/logout',
          method: 'GET',
          withCredentials: true
        });
        let date = new Date();
        date.setTime(date.getTime() + (1 * 1000));
        document.cookie = ('Authorization = ; expires = ' + date.toGMTString() + '; path = /');
        document.cookie = ('Login = false; expires = ' + date.toGMTString() + '; path = /');
        return res;
      } catch (err) {
        throw err;
      }
    }
    call();
    const path = '/auth/sign-in';
    history.push(path);
  }

  return (
    <Dashboards />
  )
}