import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Typography from '@material-ui/core/Typography';
import Create from '../templates/Create';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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

export const Templates: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={classes.paper}>
          <Create />
        </div>
      </Modal>
      <div style={{ display: 'flex' }}>
        <Icon style={{ paddingTop: '1.052rem' }}>
          <PermIdentityOutlinedIcon />
        </Icon>
        <h3>Templates</h3>
      </div>
      <Button onClick={() => setOpen(true)} variant="contained">
        Create template
      </Button>
      <Typography variant="body1" color="textSecondary">
        Here you can find premade boards, so that you can get more easily.
      </Typography>
      <h4>Official templates</h4>
      <h4>Community templates</h4>
    </div>
  );
};
