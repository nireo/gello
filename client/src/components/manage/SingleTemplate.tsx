import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/index';
import Container from '@material-ui/core/Container';
import { Template } from '../../interfaces/Template';
import { getTemplateWithID } from '../../services/template';

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

  return <Container></Container>;
};

const mapStateToProps = (state: AppState) => ({
  templates: state.templates,
});

export default connect(mapStateToProps, null)(SingleTemplate);
