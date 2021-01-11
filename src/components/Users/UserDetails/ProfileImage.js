import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

export default function ProfileImage({ user }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={user.avatar ? user.avatar : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"}
        title="Avatar"
      />
      <CardContent>
        <Typography variant="h4">
          {user.name}
        </Typography>
        <Typography>
          Rank: {user.rank}
        </Typography>
      </CardContent>
    </Card>
  );
}
