import React from 'react';
import { ListItem, ListItemText, Checkbox } from '@material-ui/core';
import UpdateForm from './UpdateForm';

const TodoItem = (props) => {
  const { item, issues, setIssues, deleteIssue } = props;
  return (
    <ListItem key={item.id} component='li'>
      <Checkbox
        value='primary'
        onChange={() => {
          deleteIssue(item.id);
        }}
      />
      <ListItemText>
        {item.id}: {item.name}
      </ListItemText>
      <UpdateForm id={item.id} setIssues={setIssues} issues={issues} />
    </ListItem>
  );
};
export default TodoItem;
