import { Snackbar } from '@material-ui/core';
import React from 'react';
import { SnackbarConsumer } from './Snackbar.context';
import CustomizedSnackbar from './CustomizedSnackbar';

const SharedSnackbar = () => (
  <SnackbarConsumer>
    {({ snackbarIsOpen, message, variant, closeSnackbar }) => (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackbarIsOpen}
        autoHideDuration={4000}
        onClose={closeSnackbar}
      >
        <CustomizedSnackbar
          onClose={closeSnackbar}
          message={message}
          variant={variant || 'info'}
        />
      </Snackbar>
    )}
  </SnackbarConsumer>
);

export default SharedSnackbar;
