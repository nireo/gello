import React, { useState, ChangeEvent } from 'react';
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

export const Create: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [templates, setTemplates] = useState<string[]>([]);
  const [newTemplate, setNewTemplate] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(0);

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
    </Container>
  );
};
