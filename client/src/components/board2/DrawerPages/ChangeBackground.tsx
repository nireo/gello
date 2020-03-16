import React from 'react';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { CreateBoard } from '../../../interfaces/Board';
import { AppState } from '../../../store';
import { updateActive } from '../../../actions/';

type Props = {
  active: any;
  updateActive: (old: any, newData: CreateBoard) => void;
};

const ChangeBackground: React.FC<Props> = ({ active, updateActive }) => {
  const changeColor = (color: string) => {
    const newBoard: CreateBoard = {
      title: active.title,
      color
    };

    updateActive(active, newBoard);
  };

  return (
    <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button
        className="color-preview color-blue"
        onClick={() => changeColor('blue')}
      ></button>
      <button
        className="color-preview color-red"
        onClick={() => changeColor('red')}
      ></button>
      <button
        className="color-preview color-orange"
        onClick={() => changeColor('orange')}
      ></button>
      <button
        className="color-preview color-green"
        onClick={() => changeColor('green')}
      ></button>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  active: state.active
});

export default connect(mapStateToProps, { updateActive })(ChangeBackground);
