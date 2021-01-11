import React from 'react';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import IconButton from '@material-ui/core/IconButton';

export default function OrderToggleButton({ handleChange }) {
  return (
    <IconButton onClick={handleChange}
      aria-label="Change order" color="inherit" size="small">
      <SortByAlphaIcon />
    </IconButton>
  );
}