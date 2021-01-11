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
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { historyAPI } from '../../api/historyAPI';

export default function HistoryList({ histories, page, rows }) {
  const classes = useStyles();
  const history = useHistory();
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
    if (apiState == 'idle') {
      dispatch(flipUserStatus(userId));
      dispatch(updateUserStatus(userId));
    }
    handleClose();
  }

  const handleClickUser = (id) => {
    const path = "/dashboard/users/" + id;
    history.push(path);
  }

  const handleClick = (id) => {
    const path = "/dashboard/boards/" + id;
    history.push(path);
  }
  const handleClick1 = (row) => {
    console.log(row.data[0]);
  }

  return (
    <TableBody>
      <ConfirmDialog
        open={open}
        cancel={handleClose}
        confirm={() => handleConfirm(currentId)}
      />
      {histories.map((row, index) => (
        <TableRow key={row.id} hover>
          <TableCell className={classes.tableCell} onClick={() => handleClick1(row)}>{page * rows + index + 1}</TableCell>
          <TableCell className={classes.tableCell} onClick={() => handleClick(row.id)}>{row.id}</TableCell>
          <TableCell className={classes.tableCell} onClick={() => handleClick(row.id)}>{row.board}</TableCell>
          <TableCell className={classes.tableCell} onClick={() => handleClickUser(row.winner)}>{row.winner}</TableCell>
          <TableCell className={classes.tableCell} onClick={() => handleClickUser(row.loser)}>{row.loser}</TableCell>
          <TableCell className={classes.tableCell} onClick={() => handleClick(row.id)}>{row.type}</TableCell>
        </TableRow >
      ))
      }
    </TableBody >
  );
}
