import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Copyright from '../Copyright';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignInForm from './SignInForm';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { useStyles } from './styles';

export default function SignInPage({ content }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {content === 'SignIn' ?
          <SignInForm /> :
          content === 'Forgot' ?
            <ForgotPassword /> : <ResetPassword />
        }
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}