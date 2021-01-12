import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NavBar from '../NavBar';
import Users from '../Users';
import UserDetails from '../Users/UserDetails';
import History from '../History';
import HistoryDetails from '../History/HistoryDetails';
import HomePage from '../HomePage';
import Profile from '../Profile';
import { AuthContext } from '../../context/auth';
import { useContext } from 'react';
import { useStyles } from './styles';

export default function Dashboard({ content }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  if (!auth.auth) {
    window.location.href = "/auth/sign-in"
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <HistoryDetails /> */}
                {(content === 'Users') ?
                  <Users /> :
                  (content === 'History') ?
                    <History /> :
                    (content === 'UserDetails') ?
                      <UserDetails /> :
                      (content === 'HistoryDetails') ?
                        <HistoryDetails /> : (content === 'Profile') ?
                          <Profile /> : <HomePage />}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main >
    </div >
  );
}