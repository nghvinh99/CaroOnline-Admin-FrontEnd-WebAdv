import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { selectAllPlayerNames } from '../../features/history/historySlice';
import { useStyles } from './styles';

export default function ChatItem({ senderId, message }) {
  const classes = useStyles();
  const players = useSelector(selectAllPlayerNames);

  if (!players[0]) {
    return (<></>)
  }

  const getName = (userId) => (players.find(player => parseInt(player.id) === parseInt(userId))).name;
  // const getName = (userId) => (1);

  let name;

  if (!senderId) {
    name = "Bot"
  } else {
    name = getName(senderId);
  }
  return (
    < ListItem alignItems="flex-start" >
      <ListItemText primaryTypographyProps={{ variant: 'subtitle2' }}
        primary={name + ":"} className={classes.chatItem}
        secondary={
          <React.Fragment>
            {message}
          </React.Fragment>
        }
      />
    </ListItem >
  )
}