import { alpha, createTheme, darken, lighten } from "@mui/material";
import { Fenix, Lexend, Montaga, Playwrite_IN, Source_Sans_3, Zain } from "next/font/google";

export const source_sans_3 = Source_Sans_3({
subsets: ['latin'],
})

export const lexend = Lexend({
  subsets: ['latin']
})

const theme = createTheme({
  palette: {
    background: {
      paper: '#ffffff'
    },
    primary: {
      main: "#39ABE4",
    },
    secondary: {
      main: "#ffffff"
    }
  },
  components: {
    MuiChip: {
      styleOverrides: {
        sizeSmall: {
          height: '1.5rem',
        },
        root: {
          height: "2rem"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "outlined" },
              style: {

              }
            }
          ]
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          height: "2.25rem",
          fontSize: "0.75rem",
          lineHeight: "115%",
          borderRadius: "0.25rem",
          fontFamily: [
            lexend.style.fontFamily,
            'sans-serif',
          ].join(','),
          variants: [
            {
              props: { variant: 'contained'},
              style: {
                color: '#ffffff',
              }
            },
            {
              props: { variant: "flipped" },
              style: {
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.8),
                },
                backgroundColor: '#ffffff',
                color: '#46210A',
              }
            },
          ]
        }
      },
    },
    // MuiAlert: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiAlertTitle-root': {
    //         fontSize: "1.25rem",
    //         margin: "0.05rem 0 0.25rem 0"
    //       }
    //     }
    //   }
    // },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: [
            source_sans_3.style.fontFamily,
            'sans',
          ].join(','),
        }
      }
    }
  },
  typography: {

    h1: {
      fontSize: "2.5rem",
      fontFamily: [
        lexend.style.fontFamily,
        'sans-serif',
      ].join(','),
    },
    h2: {
      fontSize: "2.5rem",
      fontFamily: [
        source_sans_3.style.fontFamily,
        'sans-serif',
      ].join(','),
    },
    h4: {
      fontSize: "2rem",
      fontWeight: 800,
    },
    h5: {
      // fontWeight: 400,
      fontFamily: [
        source_sans_3.style.fontFamily,
        'sans-serif',
      ].join(','),
    },
    h6: {
      fontWeight: 500,
      fontFamily: [
        lexend.style.fontFamily,
        'sans-serif',
      ].join(','),
    },
    body1: {
      fontSize: "1rem",
      fontFamily: [
        source_sans_3.style.fontFamily,
        'sans-serif',
      ].join(','),
    },
    caption: {
      fontSize: "0.95rem",
      padding: "0.5rem 0.75rem",
      opacity: 0.6
    },
    fontFamily: [
      source_sans_3.style.fontFamily,
      'sans',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 425,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920
    },
  },
});


export default theme;