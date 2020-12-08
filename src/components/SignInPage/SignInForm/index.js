import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useStyles } from '../style';
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";

export default function SignInForm() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const history = useHistory();

  const usernameInput = (e) => {
    setUsername(e.target.value);
  }

  const passwordInput = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    setInvalid(false);
    const user = {
      username: username,
      password: password
    }
    const call = async function (next) {
      setWaiting(true);
      try {
        const res = await Axios({
          method: 'POST',
          url: process.env.REACT_APP_API + '/auth/login',
          data: user,
          withCredentials: true,
        });
        setWaiting(false);
        const path = "/dashboard";
        history.push(path);
        return res;
      } catch (err) {
        if (err.response.status === 401) {
          setInvalid(true);
        }
        setWaiting(false);
        throw err;
      }
    }
    call();
    e.preventDefault();
  }

  // const handleTest = () => {
  //   const call = async function () {
  //     setWaiting(true);
  //     try {
  //       const res = await Axios({
  //         method: 'GET',
  //         url: process.env.REACT_APP_API + '/auth/test',
  //         withCredentials: true,
  //       });
  //       setWaiting(false);
  //       return res;
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
  //   call();
  // }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {waiting ? <LinearProgress /> : ""}
      {invalid ?
        <Alert severity="error">
          Invalid username or password!
        </Alert> : ""}
      <TextField
        variant="outlined" margin="normal" required fullWidth
        id="email" label="Email Address" name="email" autoComplete="email"
        autoFocus onChange={usernameInput}
      />
      <TextField
        variant="outlined" margin="normal" required fullWidth
        name="password" label="Password" type="password" id="password"
        autoComplete="current-password"
        onChange={passwordInput}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />

      <Button
        type="submit" fullWidth variant="contained"
        color="primary" className={classes.submit}
      >
        Sign In
      </Button>

      {/* <Button
        fullWidth variant="contained"
        color="primary" className={classes.submit}
        onClick={handleTest}
      >
        Test
      </Button> */}

      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
              </Link>
        </Grid>
      </Grid>
    </form>
  )
}