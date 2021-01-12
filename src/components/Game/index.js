import React, { useState, useEffect } from 'react';
import Board from './Board';
import OrderToggleButton from './OrderToggleButton';
import ListItem from './ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ChatItem from './ChatItem';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPlayerNames, fetchAllPlayerNames } from '../../features/history/historySlice';
import { useStyles } from './styles';

export default function Game({ game, lastStep }) {
  const classes = useStyles();
  const tableSize = 20;
  const [stepNumber, setStepNumber] = useState(lastStep);
  const [descending, setDescending] = useState(false);

  const dispatch = useDispatch();
  const players = useSelector(selectAllPlayerNames);

  useEffect(() => {
    dispatch(fetchAllPlayerNames());
  }, [dispatch]);

  const getName = (userId) => (players.find(player => parseInt(player.id) === parseInt(userId))).name;

  if (lastStep === -1) {
    return <></>
  }

  const current = game.data[stepNumber];
  const highlight = Array(Math.pow(tableSize, 2)).fill(null);


  const handleChange = () => {
    setDescending(!descending);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
  }

  let chatList = [];
  const chat = game.chat.slice();
  chat.map((step, move) => {
    chatList.push(
      <ChatItem
        key={move}
        senderId={step.idSender}
        message={step.message}
      />
    );
    return chatList;
  })

  let moveList = [];
  const list = game.data.slice();
  list.map((step, move) => {
    const desc = move ?
      'Go to position (' + step.x + ', ' + step.y + ')'
      : 'Go to game start';
    moveList.push(
      <ListItem
        key={move}
        move={move}
        stepNumber={stepNumber}
        desc={desc}
        jumpTo={() => jumpTo(move)}
      />
    );
    return moveList;
  })
  if (descending) {
    moveList.reverse();
  }

  let status = '';
  let match = '';
  if (players[0]) {
    match = getName(game.winner) + " vs " + getName(game.loser);
    if (game.type === 'draw') {
      status = 'This game is draw!';
    } else if (game.type === 'surrender') {
      status = getName(game.loser) + ' was surrender';
    } else {
      status = 'Winner was ' + getName(game.winner);
    }
  }

  return (
    <Grid container spacing={0} className={classes.root}
      justify="space-evenly" direction="row">
      <Grid item sm={8}>
        <Board
          squares={current.squares}
          tableSize={tableSize}
          highlight={highlight}
        />
      </Grid>
      <Grid item sm={3} >
        <Grid container spacing={2}
          direction="row" alignItems="flex-start">
          <Grid item sm={8}>
            <Typography align="left">
              {status}
              <br></br>
              {match}
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <OrderToggleButton
              handleChange={() => handleChange()}
            />
          </Grid>
          <Grid item sm={12}>
            <Typography align="left">
              Move list:
          </Typography>
            <List className={classes.moveList}>
              {moveList}
            </List>
          </Grid>
          <Grid item sm={12}>
            <Typography align="left">
              Chat:
          </Typography>
            <List className={classes.moveList}>
              {chatList}
            </List>
          </Grid>
        </Grid>
      </Grid >
    </Grid >
  );
}