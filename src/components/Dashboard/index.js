import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Copyright from '../Copyright';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

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
        date.setTime(date.getTime() - (30 * 60 * 1000));
        document.cookie = ('Authorization =; expires = ' + date.toGMTString() + '; path=/');
        document.cookie = ('Login = false; expires= ' + date.toGMTString() + '; path=/');
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>Dashboard</div>
      <Button onClick={handleLogout}>
        Log out
      </Button>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}