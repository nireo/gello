import React, { useState, ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/boardActions';
import { CreateBoard as CreateBoardInterface } from '../../interfaces/Board';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

type Props = {
  open: boolean;
  closeModal: () => void;
  createBoard: (newData: CreateBoardInterface) => void;
};

const CreateBoard: React.FC<Props> = ({ open, closeModal, createBoard }) => {
  const [title, setTitle] = useState<string>('');
  const classes = useStyles();

  const handleBoardCreation = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title === '') {
      return;
    }

    const newBoard: CreateBoardInterface = {
      color: 'red',
      title,
    };

    createBoard(newBoard);
    closeModal();
  };

  return (
    <div>
      <Modal open={open} onClose={closeModal} className={classes.modal}>
        <div className={classes.paper}>
          <Typography variant="h5">Create new board</Typography>
          <form style={{ marginTop: '2rem' }} onSubmit={handleBoardCreation}>
            <TextField
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Title..."
              style={{ width: '100%' }}
            />
            <Button
              variant="contained"
              style={{ marginTop: '2rem' }}
              type="submit"
            >
              Create board
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default connect(null, { createBoard })(CreateBoard);
