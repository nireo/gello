import React, { useState } from 'react';

export const CreateColumn: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  return (
    <div>
      <input
        style={{ fontSize: '26px', border: 'none' }}
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
  );
};
