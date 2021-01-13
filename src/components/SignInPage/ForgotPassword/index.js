import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Timer from './Timer';
import { useState, useContext, useEffect } from 'react';
import { resetPasswordReq } from '../../../features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../../context/auth';
import { useStyles } from '../styles';

export default function SignInForm() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(0);

  const [waiting, setWaiting] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const dispatch = useDispatch();
  const adminStatus = useSelector(state => state.admin.status);
  const state = useSelector(state => state.admin.state);

  const maxCount = 60;

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    } else {
      setIsButtonDisabled(false);
    }
    if (state === 'Failed') {
      setInvalid(true);
    }
  }, [count, state]);

  useEffect(() => {
    if (state === 'OK') {
      setIsButtonDisabled(true);
      setCount(maxCount);
    }
  }, [state])

  const input = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalid(false);
    const info = {
      email: email,
    }
    if (adminStatus === 'idle') {
      dispatch(resetPasswordReq(info));
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
            Email is invalid or not found!<br></br>
            Please try with your registed email!
        </Alert> : ""}
        <TextField
          variant="outlined" margin="normal" required fullWidth
          label="Email Address" name="email" autoComplete="email"
          autoFocus onChange={input} type="email"
        />
        <Button type="submit" fullWidth variant="contained"
          disabled={isButtonDisabled} color="primary" className={classes.submit}>
          {count > 0 ?
            <>
              Resend in
              <Timer count={count} maxCount={maxCount} />
            </> :
            'Send email'
          }
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href="/auth/sign-in" variant="body2">
              Suddenly rememeber now? Let's sign in
              </Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}