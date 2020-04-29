import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/index';
import Container from '@material-ui/core/Container';
import { Template } from '../../interfaces/Template';
import { getTemplateWithID } from '../../services/template';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    <Container>
      {template === null ? (
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <div>{template.title}</div>
      )}
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  templates: state.templates,
});

export default connect(mapStateToProps, null)(SingleTemplate);
