import React from 'react';
import Title from '../../Title';
import Game from '../../Game';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../../../features/users/usersSlice';
import { fetchGameData, selectGameData } from '../../../features/history/historySlice';

export default function HistoryDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchGameData(parseInt(id)));
  }, [dispatch, id])

  const game = useSelector(selectGameData);
  const lastStep = game.data.length - 1;

  return (
    <React.Fragment>
      <Title>History {'>'} boards</Title>
      {lastStep < 0 ?
        <></> :
        <Game
          game={game}
          lastStep={lastStep}
        />
      }
    </React.Fragment>
  )
}