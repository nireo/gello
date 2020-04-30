import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/index';
import Container from '@material-ui/core/Container';
import { Template } from '../../interfaces/Template';
import { getTemplateWithID } from '../../services/template';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type Props = {
  id: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const SingleTemplate: React.FC<Props> = ({ id }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>('');
  const classes = useStyles();

  const loadTemplate = useCallback(async () => {
    setTemplate(await getTemplateWithID(id));
  }, [id]);

  useEffect(() => {
    if (!loaded) {
      loadTemplate();
      setLoaded(true);
    }
  }, [loaded]);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
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
          <form>
            <Typography variant="h6">Use template</Typography>
            <Typography color="textSecondary">
              Insert a name for the board which will be using this template.
            </Typography>
            <TextField
              value={boardName}
              onChange={({ target }) => setBoardName(target.value)}
              variant="outlined"
              placeholder="Board name"
              style={{ width: '100%', marginTop: '1.5rem' }}
            />
            <Button
              style={{ width: '100%', marginTop: '1rem' }}
              variant="contained"
            >
              Create board
            </Button>
          </form>
        </div>
      </Modal>
      {template === null ? (
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ marginTop: '4rem' }}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h4">{template.title}</Typography>
              <Typography color="textSecondary">
                {template.description}
              </Typography>
              <div style={{ marginTop: '2rem' }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                  Use template
                </Button>
                <Button variant="contained" style={{ marginLeft: '0.5rem' }}>
                  Like template
                </Button>
              </div>
            </Grid>
            <Grid item xs={8}>
              <Typography>Lists in template</Typography>
              {template.lists.split('|').map((list: string) => (
                <div
                  className="template-box"
                  style={{
                    cursor: 'default',
                    width: '100%',
                    marginTop: '0.2rem',
                  }}
                >
                  {list}
                </div>
              ))}
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  templates: state.templates,
});

export default connect(mapStateToProps, null)(SingleTemplate);
