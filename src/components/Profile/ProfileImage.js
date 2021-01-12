import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

export default function ProfileImage() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://st.quantrimang.com/photos/image/2019/06/24/admin-640.jpg"
        title="Avatar"
      />
      <CardContent>
        <Typography variant="h4" align="center">
          Administrator
        </Typography>
      </CardContent>
    </Card>
  );
}
