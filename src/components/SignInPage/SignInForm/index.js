import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';
import { useStyles } from '../style';
import { useHistory } from 'react-router-dom';

export default function SignInForm() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [waiting, setWaiting] = useState(false);
  const history = useHistory();

  const usernameInput = (e) => {
    setUsername(e.target.value);
  }

  const passwordInput = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    const user = {
      username: username,
      password: password
    }
    const call = async function () {
      setWaiting(true);
      try {
        const res = await Axios({
          method: 'POST',
          url: process.env.REACT_APP_API + '/auth/login',
          data: user
        });
        setWaiting(false);
        const path = "/dashboard";
        history.push(path);
        return res;
      } catch (err) {
        throw err;
      }
    }
    call();
    e.preventDefault();
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      { waiting ? <CircularProgress /> : ""}
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

      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
              </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}