import React from 'react';
import { Button, Input } from '@material-ui/core';

const Form = (props) => {
  const { createIssue, createissue, setCreateissue } = props;
  return (
    <form onSubmit={createIssue} style={{ marginTop: '48px' }}>
      <Input
        type='text'
        name='issue'
        value={createissue}
        placeholder='Enter text'
        onChange={(event) => setCreateissue(event.target.value)}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        style={{ marginLeft: '20px' }}
      >
        送信
      </Button>
    </form>
  );
};
export default Form;
