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

type Props = {
  id: string;
};

const SingleTemplate: React.FC<Props> = ({ id }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [template, setTemplate] = useState<Template | null>(null);

  const loadTemplate = useCallback(async () => {
    setTemplate(await getTemplateWithID(id));
  }, [id]);

  useEffect(() => {
    if (!loaded) {
      loadTemplate();
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <Container maxWidth="md">
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
                <Button variant="contained">Use template</Button>
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
