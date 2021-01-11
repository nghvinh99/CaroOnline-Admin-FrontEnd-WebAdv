import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ProfileImage from './ProfileImage';
import Title from '../../Title';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../../features/users/usersSlice';
import { useStyles } from './styles';

export default function UserDetails({ userId }) {
  const classes = useStyles();
  const user = useSelector(state => selectUserById(state, userId));

  if (!user) {
    return (<></>);
  }

  return (
    <React.Fragment>
      <Title>Users</Title>
      <Grid container spacing={1} justify="space-evenly" direction="row">
        <Grid item xs={12} sm={6}>
          <ProfileImage
            user={user}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField}
            label="ID" value={user.id} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField}
            label="Email" value={user.email} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField}
            label="Point" value={user.point} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField}
            label="Account" value={user.account_type === 1 ? "Signed Up" : (user.account_type === 2) ? "Google" : "Facebook"} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField}
            label="Created at" value={user.created_at} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField}
            label="Total match" value={user.total_match} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField}
            label="Win rate" value={user.percent_win} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField}
            label="Total win" value={user.total_win} variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value={user.status === 1 ? "no" : "yes"} onChange={handleChange} />}
            label="Blocked" labelPlacement="end" className={classes.checkbox}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}