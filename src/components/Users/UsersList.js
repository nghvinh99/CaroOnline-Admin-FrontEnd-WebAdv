import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import TableBody from '@material-ui/core/TableBody';
import ConfirmDialog from '../ConfirmDialog';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { flipUserStatus, updateUserStatus } from '../../features/users/usersSlice';
import { useStyles } from './styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UsersList({ users, page, rows }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apiState = useSelector(state => state.users.status);
  const blockState = useSelector(state => state.users.blockStatus);
  const [currentId, setCurrentId] = useState(0);

  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleClickOpen = (userId) => {
    setOpen(true);
    setCurrentId(userId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackBarOpen = () => {
    setSnack(true);
  }

  const handleSnackBarClose = () => {
    setSnack(false);
  }

  const handleConfirm = (userId) => {
    if (apiState === 'idle') {
      dispatch(flipUserStatus(userId));
      dispatch(updateUserStatus(userId));
      handleSnackBarOpen();
    }

    handleClose();
  }

  const handleClick = (id) => {
    const path = "/dashboard/users/" + id;
    window.location.href = path;
  }

  return (
    <TableBody>
      <ConfirmDialog
        open={open}
        cancel={handleClose}
        confirm={() => handleConfirm(currentId)}
      />
      <Snackbar open={snack} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="success">
          User {blockState} successfully!
        </Alert>
      </Snackbar>
      {users.map((user, index) => (
        <TableRow key={user.id} hover>
          <TableCell className={classes.tableCell} onClick={() => handleClick(user.id)}>{page * rows + index + 1}</TableCell>
          <TableCell className={classes.tableCell} onClick={() => handleClick(user.id)}>{user.id}</TableCell>
          <TableCell className={classes.tableCell} onClick={() => handleClick(user.id)}>{user.name}</TableCell>
          <TableCell className={classes.tableCell} onClick={() => handleClick(user.id)}>{user.email}</TableCell>
          <TableCell align="center">{user.point}</TableCell>
          <TableCell align="center">{user.total_match}</TableCell>
          <TableCell align="center">{user.total_win}</TableCell>
          <TableCell align="right">{user.percent_win * 100} %</TableCell>
          <TableCell align="center">{user.rank}</TableCell>
          <TableCell align="right">
            <FormControlLabel
              checked={(user.status === 1) ? false : true}
              onChange={() => handleClickOpen(user.id)}
              control={<Checkbox icon={<LockOpenIcon />}
                checkedIcon={<LockIcon />} />}
            />
          </TableCell>
        </TableRow >
      ))
      }
    </TableBody >
  );
}
