import React from 'react';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from './styles';

export default function OrderToggleButton({ handleChange }) {
  const classes = useStyles();

  return (
    <IconButton color="primary" onClick={handleChange}
      aria-label="Change order" color="inherit" size="small">
      <SortByAlphaIcon />
    </IconButton>
  );
}