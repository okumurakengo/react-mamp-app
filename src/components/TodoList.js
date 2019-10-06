import React,{ Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';

export default function TodoList({ todos, deleteTodo }) {
  return (
    <List>
      {todos.map(({ id, text }) => (
        <Fragment key={id}>
          <ListItem button>
            <CreateIcon />
            <ListItemText>{text}</ListItemText>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => deleteTodo(id)}
            >
              削除
            </Button>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}
