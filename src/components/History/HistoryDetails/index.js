import React from 'react';
import Title from '../../Title';
import Game from '../../Game';
import { useParams } from 'react-router-dom';

export default function HistoryDetails() {
  const { id } = useParams();

  return (
    <React.Fragment>
      <Title>History {'>'} boards</Title>
      <Game
        id={parseInt(id)}
      />
    </React.Fragment>
  )
}