import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NavBar from '../NavBar';
import Users from '../Users';
import UserDetails from '../Users/UserDetails';
import History from '../History';
import HistoryDetails from '../History/HistoryDetails'
import { useStyles } from './styles';

export default function Dashboard() {
  const classes = useStyles();

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
                <HistoryDetails />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}