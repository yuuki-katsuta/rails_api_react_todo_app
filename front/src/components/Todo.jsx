import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, CssBaseline, Input } from '@material-ui/core';

export default function MainContainer() {
  //todoの状態
  const [createissue, setCreateissue] = useState('');
  //formの入力データの状態
  const [issues, setIssues] = useState([]);

  //マウント時DBを読み取る
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:3001/issues');
      console.log(result);
      console.log(result.data);
      setIssues(result.data);
    }
    fetchData();
  }, []);

  //todoをデータベースに書き込む
  const createIssue = (event) => {
    console.log('イベント発火');
    axios
      .post('http://localhost:3001/issues', {
        name: createissue,
      })
      .then((response) => {
        console.log('response', response.data);
        setIssues([
          ...issues,
          {
            id: response.data.id,
            name: response.data.name,
          },
        ]);
        resetTextField();
      })
      .catch((error) => {
        console.log('error', error);
      })
      .catch((data) => {
        console.log(data);
      });
    event.preventDefault();
  };

  const resetTextField = () => {
    setCreateissue('');
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <form onSubmit={createIssue}>
          <Input
            type='text'
            name='issue'
            value={createissue}
            placeholder='Enter text'
            onChange={(event) => setCreateissue(event.target.value)}
          />
          <Button type='submit' variant='contained' color='primary'>
            送信
          </Button>
        </form>
      </Container>
    </>
  );
}
