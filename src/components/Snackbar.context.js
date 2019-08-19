import React, { Component } from 'react';
import SharedSnackbar from './Snackbar.component';

const SnackbarContext = React.createContext();

export class SnackbarProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      message: ''
    };
  }

  openSnackbar = (message, variant) => {
    this.setState({
      message,
      variant,
      isOpen: true
    });
  };

  closeSnackbar = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { children } = this.props;

    return (
      <SnackbarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: this.state.isOpen,
          message: this.state.message,
          variant: this.state.variant
        }}
      >
        <SharedSnackbar />
        {children}
      </SnackbarContext.Provider>
    );
  }
}

const SnackbarConsumer = SnackbarContext.Consumer;
export { SnackbarConsumer, SnackbarContext };
