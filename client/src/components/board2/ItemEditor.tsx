import React, { useState, useEffect, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Tag } from '../../interfaces/Item';

type Props = {
  id: string;
  title: string;
  tags: Tag;
};

export const ItemEditor: React.FC<Props> = ({ id, title, tags }) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [tagName, setTagName] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      setNewTitle(title);
    }
  }, []);

  const createNewTag = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <TextField
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
        placeholder="Title"
        label="Title"
      />
      <form onSubmit={createNewTag} style={{ marginTop: '2rem' }}>
        <TextField
          value={tagName}
          onChange={({ target }) => setTagName(target.value)}
          placeholder="New tag name"
          label="New tag name"
        />
        <Button variant="contained">Create tag</Button>
      </form>
      Choose from already existing tags
    </div>
  );
};
