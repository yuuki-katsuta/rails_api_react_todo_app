import React, { useState, useEffect } from 'react';
import Form from './Form';
import TodoItem from './TodoItem';
import axios from 'axios';
import { Container, CssBaseline, List } from '@material-ui/core';

const Main = () => {
  //formの入力データの状態
  const [createissue, setCreateissue] = useState('');
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:3001/issues');
      setIssues(result.data);
    }
    fetchData();
  }, []);

  const createIssue = (event) => {
    event.preventDefault();
    if (createissue === '') return;
    axios
      .post('http://localhost:3001/issues', {
        name: createissue,
      })
      .then((response) => {
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
      });
  };

  //delete処理
  const deleteIssue = (id) => {
    axios
      .delete(`http://localhost:3001/issues/${id}`)
      .then((response) => {
        setIssues(issues.filter((x) => x.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetTextField = () => {
    setCreateissue('');
  };

  return (
    <>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <Form
          createIssue={createIssue}
          createissue={createissue}
          setCreateissue={setCreateissue}
        />
        <List style={{ marginTop: '48px' }} component='ul'>
          {issues.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              setIssues={setIssues}
              issues={issues}
              deleteIssue={deleteIssue}
            />
          ))}
        </List>
      </Container>
    </>
  );
};

export default Main;
