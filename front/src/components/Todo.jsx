import React, { useState, useEffect } from 'react';
import UpdateForm from './UpdateForm';
import Modal from 'react-modal';
import axios from 'axios';
import {
  Button,
  Container,
  CssBaseline,
  Input,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from '@material-ui/core';
Modal.setAppElement('#root');

const Todo = () => {
  //formの入力データの状態
  const [createissue, setCreateissue] = useState('');
  //todoの状態
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
    event.preventDefault();
    if (createissue === '') return;
    console.log('イベント発火');
    axios
      .post('http://localhost:3001/issues', {
        name: createissue,
      })
      .then((response) => {
        console.log('response', response.data);
        //todoを追加
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
  };

  //delete処理
  const deleteIssue = (id) => {
    axios
      .delete(`http://localhost:3001/issues/${id}`)
      .then((response) => {
        setIssues(issues.filter((x) => x.id !== id));
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const resetTextField = () => {
    setCreateissue('');
  };

  return (
    <>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
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
        <List style={{ marginTop: '48px' }} component='ul'>
          {issues.map((item) => (
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
          ))}
        </List>
      </Container>
    </>
  );
};

export default Todo;
