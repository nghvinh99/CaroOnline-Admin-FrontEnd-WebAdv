import React from 'react';
import Title from '../../Title';
import Paper from '@material-ui/core/Paper';
import Game from '../../Game';
import { useStyles } from './styles';

export default function HistoryDetails() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>History {'>'} boards</Title>
      <Game />
    </React.Fragment>
  )
}