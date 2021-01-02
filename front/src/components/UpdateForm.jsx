import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input } from '@material-ui/core';

const UpdateForm = (props) => {
  const [updateissue, setUpdateissue] = useState('');

  const handleUpdate = (event) => {
    setUpdateissue(event.target.value);
  };

  const updateIssue = (id) => {
    if (updateissue === '') return;
    axios
      .patch(`http://localhost:3001/issues/${id}`, {
        name: updateissue,
      })
      .then((response) => {
        props.setIssues(props.issues.filter((x) => x.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form>
      <Input
        type='text'
        name='issue'
        value={updateissue}
        onChange={(event) => handleUpdate(event)}
      />
      <Button
        type='submit'
        onClick={() => {
          updateIssue(props.id);
          console.log(props.id);
        }}
      >
        更新
      </Button>
    </form>
  );
};
export default UpdateForm;
