import React from 'react';
import Icon from '@material-ui/core/Icon';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Typography from '@material-ui/core/Typography';

export const Templates: React.FC = () => {
  return (
    <div>
      <Icon style={{ paddingTop: '1.052rem' }}>
        <PermIdentityOutlinedIcon />
      </Icon>
      <h3>Templates</h3>
      <Typography variant="body1" color="textSecondary">
        Here you can find premade boards, so that you can get more easily.
      </Typography>
      <h4>Official templates</h4>
      <h4>Community templates</h4>
    </div>
  );
};
