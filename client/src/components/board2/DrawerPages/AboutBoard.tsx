import React, { useState, useEffect, ChangeEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { CreateBoard } from '../../../interfaces/Board';
import { updateActive } from '../../../actions';

type Props = {
  description: string;
  title: string;
  active: any;
  updateActive: (old: any, newData: CreateBoard) => void;
};

const AboutBoard: React.FC<Props> = props => {
  const [field, setField] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    // set values so they are easier to edit
    if (title === '' && description === '') {
      setDescription(props.active.title);
      setTitle(props.active.title);
    }
  }, []);

  const changeBoardData = (event: any) => {
    if (event.keyCode === 13) {
      console.log('submitted');
    }
  };

  const updateBoard = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData: CreateBoard = {
      title,
      color: props.active.color
    };

    props.updateActive(props.active, newData);
  };

  return (
    <Container>
      {field !== 'title' ? (
        <h4 onClick={() => setField('title')}>{props.active.title}</h4>
      ) : (
        <form onSubmit={updateBoard}>
          <TextField
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Title..."
            style={{ marginBottom: '1rem' }}
            onKeyDown={event => changeBoardData(event)}
          />
          <button style={{ display: 'none' }} type="submit"></button>
        </form>
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

const mapStateToProps = (state: AppState) => ({
  active: state.active
});

export default connect(mapStateToProps, { updateActive })(AboutBoard);
