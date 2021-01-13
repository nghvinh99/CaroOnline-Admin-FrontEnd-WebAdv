import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { useState, useContext, useEffect } from 'react';
import { resetPassword } from '../../../features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import { useStyles } from '../styles';

export default function SignInForm() {
  const classes = useStyles();
  const { token } = useParams();
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');

  const [waiting, setWaiting] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(state => state.admin.state);

  const input = (e, setState) => {
    setState(e.target.value);
  }

  useEffect(() => {
    if (state === "OK") {
      window.location.href = '/auth/sign-in'
    }
    if (state === "Pending") {
      setWaiting(true);
    } else {
      setWaiting(false);
    }
    if (state === "Failed") {
      setInvalidToken(true);
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalid(false);
    if (pass === confPass) {
      const info = {
        password: pass,
        token: token
      }
      dispatch(resetPassword(info))
    } else {
      setInvalid(true);
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Reset password
        </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        {waiting ? <LinearProgress /> : ""}
        {invalid ?
          <Alert severity="error">
            Password not match
        </Alert> : ""}
        {invalidToken ?
          <Alert severity="error">
            Invalid token!
        </Alert> : ""}
        <TextField
          variant="outlined" margin="normal" required fullWidth
          label="New password" type="password"
          autoFocus onChange={(e) => input(e, setPass)}
        />
        <TextField
          variant="outlined" margin="normal" required fullWidth
          label="Confirm password" type="password"
          onChange={(e) => input(e, setConfPass)}
        />
        <Button
          type="submit" fullWidth variant="contained"
          color="primary" className={classes.submit}
        >
          Change
      </Button>

        <Grid container>
          <Grid item xs>
            <Link href="/auth/sign-in" variant="body2">
              Sign in
              </Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}