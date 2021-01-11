import React, { useState } from 'react';
import Board from './Board';
import OrderToggleButton from './OrderToggleButton';
import calculateWinner from './service';
import ListItem from './ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { useStyles } from './styles';

function Game() {
  const classes = useStyles();

  const tableSize = 20;
  const [history, setHistory] = useState([{
    squares: Array(Math.pow(tableSize, 2)).fill(null),
    index: null,
    winner: null,
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [descending, setDescending] = useState(false);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, tableSize, current.index);
  const highlight = Array(Math.pow(tableSize, 2)).fill(null);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (current.winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{
      squares: squares,
      index: i,
      winner: current.winner,
    }]))
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
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

  let moveList = [];
  const list = history.slice();
  list.map((step, move) => {
    const desc = move ?
      'Go to position (' + (Math.floor(step.index / tableSize) + 1) + ', '
      + (step.index % tableSize + 1) + ')'
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
  if (winner.winner) {
    current.winner = winner.winner;
    status = 'Winner: ' + winner.winner;
    winner.line.forEach(i => {
      highlight[i] = true;
    })
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
            {moveList}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Game;