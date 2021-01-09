import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { usersFilter } from '../../features/users/usersSlice';
import { useStyles } from './styles';

export default function Filter() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'id',
    order: 'ASC',
  });

  useEffect(() => {
    dispatch(usersFilter(filter));
  }, [filter, dispatch])

  const handleChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Grid container className={classes.root}
      justify="flex-end">
      <Grid item xs={6}>
        <TextField id="outlined-search" className={classes.textField}
          label="Search field" type="search" name="search" onChange={handleChange}
          variant="outlined" size="small" value={filter.search} />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined"
          className={classes.formControl}
          size="small">
          <InputLabel >Sort by</InputLabel>
          <Select
            name="sortBy"
            value={filter.sortBy}
            onChange={handleChange}
          >
            <MenuItem value={'id'}>ID</MenuItem>
            <MenuItem value={'name'}>Name</MenuItem>
            <MenuItem value={'email'}>Email</MenuItem>
            <MenuItem value={'point'}>Point</MenuItem>
            <MenuItem value={'total_match'}>Total match</MenuItem>
            <MenuItem value={'total_win'}>Total win</MenuItem>
            <MenuItem value={'percent_win'}>Win rate</MenuItem>
            <MenuItem value={'rank'}>Rank</MenuItem>
            <MenuItem value={'status'}>Blocked</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined"
          className={classes.formControl}
          size="small">
          <InputLabel >Order</InputLabel>
          <Select
            name="order"
            value={filter.order}
            onChange={handleChange}
          >
            <MenuItem value={'ASC'}>A - Z</MenuItem>
            <MenuItem value={'DESC'}>Z - A</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid >
  )
}