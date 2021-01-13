import { makeStyles } from '@material-ui/core/';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  textField: {
    margin: theme.spacing(1),
    width: "90%"
  },
  password: {
    margin: theme.spacing(1),
    width: "70%"
  },
  button: {
    margin: theme.spacing(2),
  }
}))