import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPlayerNames, fetchAllPlayerNames } from '../../features/history/historySlice';
import { useEffect } from 'react';
import { useStyles } from './styles';

export default function HistoryList({ histories, page, rows }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const players = useSelector(selectAllPlayerNames);

  useEffect(() => {
    dispatch(fetchAllPlayerNames());
  }, [dispatch]);


  const getName = (userId) => (players.find(player => parseInt(player.id) === parseInt(userId))).name;

  const handleClickUser = (id) => {
    const path = "/dashboard/users/" + id;
    window.location.href = path;
  }

  const handleClick = (id) => {
    const path = "/dashboard/history/boards/" + id;
    window.location.href = path;
  }

  return (
    <TableBody>
      {histories.map((row, index) => {
        const winner = getName(row.winner);
        const loser = getName(row.loser);
        return (
          <TableRow key={row.id} hover>
            <TableCell className={classes.tableCell} onClick={() => handleClick(row.id)}>{page * rows + index + 1}</TableCell>
            <TableCell className={classes.tableCell} onClick={() => handleClick(row.id)}>{row.id}</TableCell>
            <TableCell className={classes.tableCell} onClick={() => handleClick(row.id)}>{row.board}</TableCell>
            <TableCell className={classes.tableCell} onClick={() => handleClickUser(row.winner)}>{winner}</TableCell>
            <TableCell className={classes.tableCell} onClick={() => handleClickUser(row.loser)}>{loser}</TableCell>
            <TableCell className={classes.tableCell} onClick={() => handleClick(row.id)}>{row.type}</TableCell>
          </TableRow >
        )
      }
      )}
    </TableBody >
  );
}
