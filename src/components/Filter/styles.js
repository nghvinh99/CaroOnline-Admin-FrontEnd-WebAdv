import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginRight: theme.spacing(2),
    },
    display: 'flex',
    width: '100%',
  },
  grid: {
    flexGrow: 1,
  },
  textField: {
    width: '90%',
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    minWidth: 80,
  },
}));