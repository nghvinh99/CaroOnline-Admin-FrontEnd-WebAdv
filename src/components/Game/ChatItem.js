import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../features/users/usersSlice';
import { useStyles } from './styles';

export default function ChatItem({ senderId, message }) {
  const classes = useStyles();
  const sender = useSelector(state => selectUserById(state, senderId));
  let name;

  if (!senderId) {
    name = "Bot"
  } else {
    name = sender.name;
  }
  return (
    <ListItem alignItems="flex-start">
      <ListItemText primaryTypographyProps={{ variant: 'subtitle2' }}
        primary={name + ":"} className={classes.chatItem}
        secondary={
          <React.Fragment>
            {message}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}