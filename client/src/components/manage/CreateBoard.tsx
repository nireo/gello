import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

type Props = {
  open: boolean;
  closeModal: () => void;
};

const CreateBoard: React.FC<Props> = ({ open, closeModal }) => {
  const [title, setTitle] = useState<string>('');
  const classes = useStyles();

  return (
    <div>
      <Modal open={open} onClose={closeModal} className={classes.modal}>
        <Typography variant="h4">Create new board</Typography>
      </Modal>
    </div>
  );
};

export default CreateBoard;
