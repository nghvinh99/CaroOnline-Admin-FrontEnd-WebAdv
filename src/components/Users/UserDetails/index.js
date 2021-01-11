import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ProfileImage from './ProfileImage';
import Title from '../../Title';
import ConfirmDialog from '../../ConfirmDialog';
import { useSelector, useDispatch } from 'react-redux';
import { flipUserStatus, selectUserById, updateUserStatus } from '../../../features/users/usersSlice';
import { useParams } from 'react-router-dom';
import { useStyles } from './styles';

export default function UserDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector(state => selectUserById(state, parseInt(id)));
  const apiState = useSelector(state => state.users.status);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (userId) => {
    if (apiState === 'idle') {
      dispatch(flipUserStatus(userId));
      dispatch(updateUserStatus(userId));
    }
    handleClose();
  }

  return (
    <React.Fragment>
      <ConfirmDialog
        open={open}
        cancel={handleClose}
        confirm={() => handleConfirm(user.id)}
      />
      <Title>Users</Title>
      <Grid container spacing={1} justify="space-evenly" direction="row">
        <Grid item xs={12} sm={6}>
          <ProfileImage
            user={user}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="ID" value={user.id} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="Account" value={user.account_type === 1 ? "Signed Up" : (user.account_type === 2) ? "Google" : "Facebook"} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="Email" value={user.email} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="Created at" value={user.created_at} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="Point" value={user.point} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="Total match" value={user.total_match} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="Total win" value={user.total_win} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="Win rate" value={(user.percent_win * 100) + "%"} variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" checked={(user.status === 1) ? false : true} onChange={handleClickOpen} />}
            label="Blocked" labelPlacement="end" className={classes.checkbox}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}