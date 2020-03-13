import React, { useState, useEffect, ChangeEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

type Props = {
  description: string;
  title: string;
};

const AboutBoard: React.FC<Props> = props => {
  const [field, setField] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    // set values so they are easier to edit
    if (title === '' && description === '') {
      setDescription(props.description);
      setTitle(props.title);
    }
  }, []);

  const changeBoardData = (event: any) => {
    if (event.keyCode === 13) {
      console.log('submitted');
    }
  };

  return (
    <Container>
      {field !== 'title' ? (
        <h4 onClick={() => setField('title')}>{props.title}</h4>
      ) : (
        <TextField
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title..."
          style={{ marginBottom: '1rem' }}
          onKeyDown={event => changeBoardData(event)}
        />
      )}

      {field !== 'description' ? (
        <Typography
          onClick={() => setField('description')}
          variant="body1"
          color="textSecondary"
        >
          {props.description}
        </Typography>
      ) : (
        <TextField
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          placeholder="Description..."
          onKeyDown={event => changeBoardData(event)}
        />
      )}
    </Container>
  );
};

export default AboutBoard;
