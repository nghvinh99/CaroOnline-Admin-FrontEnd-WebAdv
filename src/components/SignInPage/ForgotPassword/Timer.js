import react, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Timer({ count, maxCount }) {
  return (
    <Box position="relative" display="inline-flex" marginLeft={1}>
      <CircularProgress variant="determinate" value={Math.round(count / maxCount * 100)} />
      <Box top={0} left={0} bottom={0} right={0} position="absolute"
        display="flex" alignItems="center" justifyContent="center">
        <Typography variant="caption" component="div" color="textSecondary">
          {count}s
          </Typography>
      </Box>
    </Box>
  )
}