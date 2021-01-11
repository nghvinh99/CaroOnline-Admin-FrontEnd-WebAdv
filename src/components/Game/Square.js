import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';


function Square({ highlight, onClick, value }) {
  const classes = useStyles();

  return (
    <Button variant="contained" className={classes.square}
      style={{ 'color': highlight ? 'red' : 'black' }}
      onClick={onClick}>
      {value}
    </Button>
  );
}

export default Square;