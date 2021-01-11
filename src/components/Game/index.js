import React, { useState, useEffect } from 'react';
import Board from './Board';
import OrderToggleButton from './OrderToggleButton';
import calculateWinner from './service';
import ListItem from './ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameData, selectGameData } from '../../features/history/historySlice';
import ChatItem from './ChatItem';
import { useStyles } from './styles';

function Game() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apiStatus = useSelector(state => state.history.status);
  const gameData = useSelector(selectGameData);

  const tableSize = 20;
  const [stepNumber, setStepNumber] = useState(2);
  const [xIsNext, setXIsNext] = useState(true);
  const [descending, setDescending] = useState(false);

  useEffect(() => {
    if (apiStatus === 'idle') {
      dispatch(fetchGameData(1));
    }
  }, [apiStatus, dispatch]);

  if (!gameData.data) {
    return (<>OK</>);
  }


  const current = gameData.data[stepNumber];
  // const winner = calculateWinner(current.squares, tableSize, current.index);
  const highlight = Array(Math.pow(tableSize, 2)).fill(null);

  const handleClick = (i) => {

  }

  const handleChange = () => {
    setDescending(!descending);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const checkDraw = (squares) => {
    return (!squares.includes(null));
  }

  let chatList = [];
  const chat = gameData.chat.slice();
  chat.map((step, move) => {
    chatList.push(
      <ChatItem
        senderId={step.idSender}
        message={step.message}
      />
    );
    return chatList;
  })

  let moveList = [];
  const list = gameData.data.slice();
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

  let status;
  // if (winner.winner) {
  //   current.winner = winner.winner;
  //   status = 'Winner: ' + winner.winner;
  //   winner.line.forEach(i => {
  //     highlight[i] = true;
  //   })
  if (1 === 2) {
    return;
  } else if (checkDraw(current.squares)) {
    status = 'Game draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <Grid container spacing={0} className={classes.root}
      justify="space-evenly" direction="row">
      <Grid item xs={12} sm={8}>
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          tableSize={tableSize}
          highlight={highlight}
        />
      </Grid>
      <Grid container xs={12} sm={3} spacing={2}
        direction="row" alignItems="flex-start">
        <Grid item xs={8} sm={8}>
          <Typography align="left">
            {status}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4}>
          <OrderToggleButton
            handleChange={() => handleChange()}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography align="left">
            Move list:
          </Typography>
          <List className={classes.moveList}>
            {moveList}
          </List>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography align="left">
            Chat:
          </Typography>
          <List className={classes.moveList}>
            {chatList}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Game;