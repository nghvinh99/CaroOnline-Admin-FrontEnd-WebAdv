import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { useState } from 'react';
import { useStyles } from '../style';

export default function SignInForm() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameInput = (e) => {
    setUsername(e.target.value);
  }

  const passwordInput = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log("username:" + username);
    console.log("password:" + password);
    e.preventDefault();
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
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