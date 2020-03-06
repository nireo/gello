import React, { ChangeEvent } from 'react';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import TextArea from 'react-textarea-autosize';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addList } from '../../actions';

type Props = {
  list?: any;
  dispatch: any;
};

class ActionButton extends React.Component<Props> {
  state = {
    formOpen: false,
    text: ''
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = () => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      text: event.target.value
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      dispatch(addList(text));
    }

    return;
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? 'Add another item' : 'Add another list';
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? 'white' : 'inherit';
    const buttonTextBackground = list ? 'rgba(0,0,0,.15)' : 'inherit';

    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openForButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground
        }}
      >
        <Icon>
          <AddIcon />
        </Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;

    const placeholder = list
      ? 'Enter list title...'
      : 'Enter a title for this item...';
    const buttonTitle = list ? 'Add list' : 'Add item';

    return (
      <div>
        <Card
          style={{
            minHeight: 80,
            minWidth: 272,
            padding: '6px 8px 2px'
          }}
        >
          <TextArea
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
            style={{
              resize: 'none',
              width: '100%',
              outline: 'none',
              border: 'none',
              overflow: 'hidden'
            }}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={this.handleAddList}
            variant="contained"
            style={{ color: 'white', backgroundColor: '#5aac44' }}
          >
            {buttonTitle}
          </Button>
          <Icon style={{ marginLeft: 0, cursor: 'pointer' }}>
            <CloseIcon />
          </Icon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  openForButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10
  },
  formButtonGroup: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center'
  }
};

export default connect()(ActionButton);
