import React from 'react';
import { render } from 'react-dom';
import { CircularProgress, Button } from '@material-ui/core';
import ColoredLinearProgress from './LineProgress';

function ButtonComponent(props) {
  const { onClick, loading } = props;
  return (
    <Button variant="contained" onClick={onClick} disabled={loading}>
      {loading && <CircularProgress size={14} />}
      {!loading && 'Click Me'}
    </Button>
  );
}

class LoadingButton extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
  }


  render() {
    return (
      <React.Fragment>
        {this.state.loading && <ColoredLinearProgress />}
        <br />
        <ButtonComponent onClick={this.onClick} loading={this.state.loading} />
      </React.Fragment>
    );
  }
}

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<LoadingButton />, rootElement);
}
