import React from 'react';
import Typography from '@material-ui/core/Typography';

type Props = {
  description: string;
  title: string;
};

const AboutBoard: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <Typography variant="h4">{title}</Typography>
    </div>
  );
};

export default AboutBoard;
