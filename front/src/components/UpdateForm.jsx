import React, { useState } from 'react';
import axios from 'axios';

import { Button, Input } from '@material-ui/core';

const UpdateForm = (props) => {
  //更新処理
  const [updateissue, setUpdateissue] = useState('');

  //更新対象セット
  const handleUpdate = (event) => {
    setUpdateissue(event.target.value);
  };

  //更新処理
  const updateIssue = (id) => {
    console.log(id);
    axios
      .patch(`http://localhost:3001/issues/${id}`, {
        name: updateissue,
      })
      .then((response) => {
        console.log(props.issues);
        console.log(id);
        props.setIssues(props.issues.filter((x) => x.id !== id));
        console.log(response.data);
      })
      .catch((data) => {
        console.log(data);
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
