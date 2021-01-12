import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Title from '../Title';
import ChangePassword from './ChangePassword';
import ProfileImage from './ProfileImage';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, selectAdmin } from '../../features/admin/adminSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStyles } from './styles';

export default function UserDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);
  const [open, setOpen] = useState(false);

  const id = 1;

  useEffect(() => {
    dispatch(fetchProfile(id));
  }, [dispatch])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!admin) return <></>

  return (
    <React.Fragment>
      <ChangePassword
        open={open}
        handleClose={handleClose}
        userId={id}
      />
      <Title>Users</Title>
      <Grid container spacing={1} justify="space-evenly" direction="row">
        <Grid item xs={12} sm={5}>
          <ProfileImage />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="ID" value={admin.id || ''} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField} fullWidth
            label="Username" value={admin.username || ''} variant="outlined"
          />
          <TextField
            InputProps={{ readOnly: true }} className={classes.password}
            label="Password" value="**********" variant="outlined"
          />
          <Button
            variant="contained"
            color="default"
            onClick={handleClickOpen}
            className={classes.button}
            startIcon={<AutorenewIcon />}>
            Change
          </Button>
          <TextField
            InputProps={{ readOnly: true }} className={classes.textField}
            label="Created at" value={(admin.createdAt.split("T")[0]) || ''} variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}