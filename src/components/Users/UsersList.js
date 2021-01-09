import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import TableBody from '@material-ui/core/TableBody';

export default function UsersList({ users, page, rows }) {
  return (
    <TableBody>
      {users.map((row, index) => (
        <TableRow key={row.id}>
          <TableCell>{page * rows + index + 1}</TableCell>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell align="center">{row.point}</TableCell>
          <TableCell align="center">{row.total_match}</TableCell>
          <TableCell align="center">{row.total_win}</TableCell>
          <TableCell align="right">{row.percent_win * 100} %</TableCell>
          <TableCell align="center">{row.rank}</TableCell>
          <TableCell align="right">
            <FormControlLabel
              checked={(row.status == 1) ? false : true}
              control={<Checkbox icon={<LockOpenIcon />}
                checkedIcon={<LockIcon />} />}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
