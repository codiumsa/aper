import React from 'react';
import { createMuiTheme, fade } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// Created in case we need to modify the default theme from material-ui
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8eb8e5',
      dark: '#7c99b4'
    },
    secondary: {
      main: '#ffc09f'
      // dark: '#508991'
    },
    error: {
      main: '#e1504d'
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiTextField: {
      InputProps: {
        disableUnderline: true
      }
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        minHeight: 48
      },
      contained: {
        boxShadow: 'none'
      }
    },
    MuiFab: {
      root: {
        textTransform: 'none',
        minHeight: 48,
        boxShadow: 'none'
      }
    },
    MuiInputLabel: {
      formControl: {
        left: 'unset'
      }
    },
    MuiFilledInput: {
      root: {
        backgroundColor: '#fcfcfb',
        '&$focused': {
          backgroundColor: '#fcfcfb'
        },
        '&:hover': {
          backgroundColor: '#fff'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Montserrat Alternates'
  }
});
theme.overrides.MuiInputBase = {
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff'
    },
    '&$focused': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  },
  focused: {}
};

const CustomThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const COLORS = {
  CONTRAST: '#164b77'
};

export { theme, CustomThemeProvider, COLORS };
