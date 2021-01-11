import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

function ListItem({ move, stepNumber, jumpTo, desc }) {
  return (
    <Chip
      avatar={<Avatar>{move}</Avatar>} variant={stepNumber === move ? 'default' : 'outlined'}
      label={desc} onClick={jumpTo}
    />
  )
}

export default ListItem;