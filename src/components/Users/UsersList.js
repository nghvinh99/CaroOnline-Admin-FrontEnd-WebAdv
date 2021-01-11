import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import TableBody from '@material-ui/core/TableBody';
import ConfirmDialog from '../ConfirmDialog';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { flipUserStatus, updateUserStatus } from '../../features/users/usersSlice';
import { useStyles } from './styles';

export default function UsersList({ users, page, rows }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apiState = useSelector(state => state.users.status);
  const [currentId, setCurrentId] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (userId) => {
    setOpen(true);
    setCurrentId(userId);
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
