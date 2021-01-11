import react from 'react';
import ListItem from './ListItem';

export default function MoveList({ list, descending, move, stempNumber }) {
  let moveList = [];
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
  return moveList;
}