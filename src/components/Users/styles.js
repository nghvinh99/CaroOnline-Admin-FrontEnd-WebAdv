import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
  tableRow: {
    cursor: 'pointer',
  }
}));