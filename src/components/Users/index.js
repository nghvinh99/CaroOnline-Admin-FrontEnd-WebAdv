import React from 'react';
import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Title from '../Dashboard/Title';
import Filter from '../Filter';
import UsersList from './UsersList';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Box from '@material-ui/core/Box'
import TablePagination from '@material-ui/core/TablePagination';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, selectAllUsers, fetchUsers } from '../../features/users/usersSlice';
import { useStyles } from './styles';

export default function Orders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const users = useSelector(selectAllUsers);
  const userStatus = useSelector(state => state.users.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers(filter));
    }
  }, [userStatus, dispatch, filter]);

  const rowsOpts = [10, 20, 50, 100];
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, page) => {
    setPage(page);
  }

  const handleChangeRows = (event) => {
    setRows(event.target.value);
    setPage(0);
  }

  return (
    <React.Fragment>
      <Title>Users</Title>
      <Filter />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader >
            <colgroup>
              <col style={{ width: '5%' }} />
              <col style={{ width: '5%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '5%' }} />
              <col style={{ width: '5%' }} />
              <col style={{ width: '5%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '5%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Point</TableCell>
                <TableCell align="center">Total match</TableCell>
                <TableCell align="center">Total win</TableCell>
                <TableCell align="right">Win Rate</TableCell>
                <TableCell align="center">Rank</TableCell>
                <TableCell align="center">Blocked</TableCell>
              </TableRow>
            </TableHead>
            <UsersList
              users={users.slice(page * rows, page * rows + rows)}
              page={page}
              rows={rows}
            />
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
          <TablePagination
            rowsPerPageOptions={rowsOpts}
            rowsPerPage={rows}
            onChangeRowsPerPage={handleChangeRows}
            count={users.length}
            page={page}
            onChangePage={handleChangePage}
          />
        </Box>
      </Paper>
    </React.Fragment>
  );
}