import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { adminAPI } from '../../api/adminAPI';
import { useState, useEffect } from 'react';
import { useStyles } from './styles';

const cols = [
  {
    title: 'Users',
    count: 'Number of registed users: ',
    info: 'user',
    path: '/dashboard/users',
  },
  {
    title: 'History',
    count: 'Total server games: ',
    info: 'game',
    path: '/dashboard/history',
  },
];

export default function HomePage() {
  const classes = useStyles();
  const [info, setInfo] = useState({ users: 0, game: 0 });

  useEffect(() => {
    const res = async () => {
      try {
        const info = await adminAPI.fetchInfo();
        setInfo(info);
      } catch (err) {
        throw err;
      }
    }
    res();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Caro Online Game
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-start">
          {cols.map((col, index) => (
            <Grid item key={col.title} xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                  title={col.title}
                  subheader={col.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={col.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  {info[col.info] ?
                    <Typography variant="subtitle1" align="center">
                      {col.count + info[col.info]}
                    </Typography> :
                    <Typography variant="subtitle1" align="center">
                      <CircularProgress />
                    </Typography>
                  }
                </CardContent>
                <CardActions>
                  <Button fullWidth onClick={() => window.location.href = col.path}
                    variant="outlined" color="primary">
                    Go to management
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}