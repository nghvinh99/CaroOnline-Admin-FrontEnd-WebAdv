import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';

export default function HistoryList({ histories, page, rows }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClickUser = (id) => {
    const path = "/dashboard/users/" + id;
    history.push(path);
  }

  const handleClick = (id) => {
    const path = "/dashboard/history/boards/" + id;
    history.push(path);
  }

  return (
    <TableBody>
      {histories.map((row, index) => (
        <TableRow key={row.id} hover>
          <TableCell className={classes.tableCell} onClick={() => handleClick(row.id)}>{page * rows + index + 1}</TableCell>
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
