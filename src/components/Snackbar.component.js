import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { SnackbarConsumer } from './Snackbar.context';
import CustomizedSnackbar from './CustomizedSnackbar';

const SharedSnackbar = () => (
  <SnackbarConsumer>
    {({ snackbarIsOpen, message, variant, closeSnackbar }) => (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbarIsOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <CustomizedSnackbar
          onClose={closeSnackbar}
          message={message}
          variant={variant}
        />
      </Snackbar>
    )}
  </SnackbarConsumer>
);

export default SharedSnackbar;
