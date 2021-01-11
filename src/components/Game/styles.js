import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(1)
  },
  square: {
    '&.MuiButton-contained': {
      maxHeight: "25px",
      maxWidth: "22px",
      minWidth: "22px",
      minHeight: "25px",
    }
  },
  moveList: {
    maxHeight: 200,
    overflow: 'auto',
    width: '100%'
  }
}));