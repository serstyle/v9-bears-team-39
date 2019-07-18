import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DefaultButton from './DefaultButton';
import WikiContext from '../contexts/wikis/wikiContext';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    marginTop: 20,
  },
  content: {
    marginTop: 5,
  },
}));

const WikiItem = ({ wikis, update }) => {
  const classes = useStyles();
  const wikiContext = useContext(WikiContext);
  const { setCurrent, deleteWiki } = wikiContext;
  const { title, _id } = wikis;

  const onDelete = () => {
    deleteWiki(_id);
  };

  const onUpdate = () => {
    setCurrent(wikis);
    update();
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h5">{title}</Typography>
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
