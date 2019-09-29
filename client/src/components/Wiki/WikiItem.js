import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DefaultButton from '../DefaultButton';
import WikiContext from '../../contexts/wikis/wikiContext';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    marginTop: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  content: {
    marginTop: 5,
  },
}));

const WikiItem = ({ wikis, update, del }) => {
  const classes = useStyles();
  const wikiContext = useContext(WikiContext);
  const { setCurrent, deleteWiki } = wikiContext;
  const { title, _id, date } = wikis;

  const onDelete = () => {
    deleteWiki(_id);
    del();
  };

  const onUpdate = () => {
    setCurrent(wikis);
    console.log(wikis);
    update();
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{date.slice(0, 10)}</Typography>
      </CardContent>
      <CardActions>
        <DefaultButton
          className={classes.button}
          name="Edit"
          color="primary"
          onClick={onUpdate}
        />
        <DefaultButton name="Delete" color="secondary" onClick={onDelete} />
      </CardActions>
    </Card>
  );
};

export default WikiItem;
