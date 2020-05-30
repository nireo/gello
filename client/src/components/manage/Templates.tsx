import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Typography from '@material-ui/core/Typography';
import Create from '../templates/Create';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Template } from '../../interfaces/Template';
import { AppState } from '../../store';
import { getTemplatesAction } from '../../actions/index';
import formatDate from '../../utils/date';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

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
  templates: any;
  getTemplatesAction: () => void;
};

const Templates: React.FC<Props> = ({ templates, getTemplatesAction }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const classes = useStyles();
  useEffect(() => {
    if (!loaded) {
      getTemplatesAction();
      setLoaded(true);
    }
  }, [loaded]);

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
          <Create setOpen={setOpen} />
        </div>
      </Modal>
      <div style={{ display: 'flex' }}>
        <Icon style={{ paddingTop: '1.052rem' }}>
          <PermIdentityOutlinedIcon />
        </Icon>
        <h3>Templates</h3>
        <IconButton
          style={{ marginLeft: '2rem' }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Divider style={{ marginBottom: '1rem' }} />
      <h4>Official templates</h4>
      <div style={{ display: 'flex' }}>
        {templates.templates.map((template: Template) => (
          <Link
            to={`template/${template.uuid}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="template-box">
              <Typography>{template.title}</Typography>
              <Typography color="textSecondary">
                {template.description}
              </Typography>
              <Typography>{formatDate(template.created_at)}</Typography>
            </div>
          </Link>
        ))}
      </div>
      <h4>Community templates</h4>
      <div style={{ display: 'flex' }}>
        {templates.templates.map((template: Template) => (
          <Link
            to={`template/${template.uuid}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="template-box">
              <Typography>{template.title}</Typography>
              <Typography color="textSecondary">
                {template.description}
              </Typography>
              <Typography>{formatDate(template.created_at)}</Typography>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  templates: state.templates,
});

export default connect(mapStateToProps, { getTemplatesAction })(Templates);
