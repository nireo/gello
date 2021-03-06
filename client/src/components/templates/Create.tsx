import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import { CreateStepper } from './CreateStepper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CreateTemplate } from '../../interfaces/Template';
import { connect } from 'react-redux';
import { createTemplateAction } from '../../actions';

type Props = {
  createTemplateAction: (template: CreateTemplate) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Create: React.FC<Props> = ({ createTemplateAction, setOpen }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [templates, setTemplates] = useState<string[]>([]);
  const [newTemplate, setNewTemplate] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [privateTemplate, setPrivateTemplate] = useState<boolean>(false);

  // list of selected templates (contains the indices)
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = templates.indexOf(value);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const createNewTemplate = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTemplates(templates.concat(newTemplate));
    setNewTemplate('');
  };

  const submitNewTemplate = () => {
    const templateObject: CreateTemplate = {
      private: privateTemplate ? 'true' : 'false',
      lists: templates.join('|'),
      title,
      description,
    };

    createTemplateAction(templateObject);
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <CreateStepper activeStep={activeStep} setActiveStep={setActiveStep} />
      {activeStep === 0 && (
        <div>
          <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
            <TextField
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Title..."
              style={{ width: '100%' }}
              label="Title"
              variant="outlined"
            />
          </div>
          <TextField
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            placeholder="Description..."
            style={{ width: '100%' }}
            multiline
            rows={3}
            variant="outlined"
            label="Description"
          />
        </div>
      )}
      {activeStep === 1 && (
        <div>
          <form onSubmit={createNewTemplate}>
            <TextField
              value={newTemplate}
              onChange={({ target }) => setNewTemplate(target.value)}
              placeholder="New list name."
              style={{ width: '100%' }}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: '1rem' }}
            >
              Add list
            </Button>
          </form>
          <div style={{ marginTop: '3rem' }}>
            <Typography variant="h5">Lists</Typography>
            <List dense>
              {templates.map((template: string) => (
                <ListItem key={template} button>
                  <ListItemText id={template} primary={template} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(template)}
                      checked={selected.indexOf(template) !== -1}
                      inputProps={{ 'aria-labelledby': template }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      )}
      {activeStep === 2 && (
        <div>
          <Typography>
            You're almost done, just a few little settings to configure!
          </Typography>
          <FormControlLabel
            label="Private template"
            control={
              <Checkbox
                checked={privateTemplate}
                onClick={() => setPrivateTemplate(!privateTemplate)}
              />
            }
          />
          <div>
            <Button onClick={() => submitNewTemplate()} variant="contained">
              Create template
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default connect(null, { createTemplateAction })(Create);
