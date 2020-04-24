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

export const Create: React.FC = () => {
  const [templates, setTemplates] = useState<string[]>([]);
  const [newTemplate, setNewTemplate] = useState<string>('');

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
      <Typography variant="h4">Create new template</Typography>
      <form onSubmit={createNewTemplate}>
        <TextField
          value={newTemplate}
          onChange={({ target }) => setNewTemplate(target.value)}
          placeholder="New list name."
        />
        <Button
          type="submit"
          style={{ marginLeft: '1rem' }}
          variant="contained"
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
    </Container>
  );
};
