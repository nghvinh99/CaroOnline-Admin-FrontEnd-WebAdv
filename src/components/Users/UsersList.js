import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import TableBody from '@material-ui/core/TableBody';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';

export default function UsersList({ users, page, rows }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (id) => {
    const path = "/dashboard/users/" + id;
    history.push(path);
  }

  return (
    <TableBody>
      {users.map((user, index) => (
        <TableRow key={user.id} hover onClick={() => handleClick(user.id)} className={classes.tableRow}>
          <TableCell>{page * rows + index + 1}</TableCell>
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell align="center">{user.point}</TableCell>
          <TableCell align="center">{user.total_match}</TableCell>
          <TableCell align="center">{user.total_win}</TableCell>
          <TableCell align="right">{user.percent_win * 100} %</TableCell>
          <TableCell align="center">{user.rank}</TableCell>
          <TableCell align="right">
            <FormControlLabel
              checked={(user.status == 1) ? false : true}
              control={<Checkbox icon={<LockOpenIcon />}
                checkedIcon={<LockIcon />} />}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody >
  );
}
