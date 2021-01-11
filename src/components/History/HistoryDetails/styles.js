import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(3)
  },
  container: {
    maxHeight: 500,
  },
  tableCell: {
    cursor: 'pointer',
  }
}));