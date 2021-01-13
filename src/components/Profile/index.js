import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Title from '../Title';
import ChangePassword from './ChangePassword';
import ProfileImage from './ProfileImage';
import ChangeEmail from './ChangeEmail';
import EditIcon from '@material-ui/icons/Edit';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, selectAdmin } from '../../features/admin/adminSlice';
import { useEffect, useState } from 'react';
import { useStyles } from './styles';

export default function UserDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);
  const state = useSelector(state => state.admin.state);
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);

  const id = 1;

  useEffect(() => {
    dispatch(fetchProfile(id));
  }, [dispatch])

  const handleClickOpenE = () => {
    setOpenE(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseE = () => {
    setOpenE(false);
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
      <ChangeEmail
        open={openE}
        handleClose={handleCloseE}
        userId={id}
      />
      <Title>Users</Title>
      {state === 'Pending' ?
        <LinearProgress /> :
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
            <IconButton aria-label="edit" className={classes.button}
              onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
            <TextField
              InputProps={{ readOnly: true }} className={classes.password}
              label="Email" value={admin.email || ''} variant="outlined"
            />
            <IconButton aria-label="edit" className={classes.button}
              onClick={handleClickOpenE}>
              <EditIcon />
            </IconButton>
            <TextField
              InputProps={{ readOnly: true }} className={classes.textField}
              label="Created at" value={(admin.createdAt.split("T")[0]) || ''} variant="outlined"
            />
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );
}