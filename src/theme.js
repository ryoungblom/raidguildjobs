import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: 'Uncial Antiqua',
    body: 'Mirza'
  },

  colors: {
    primary: {
      200: '#ff95ad',
      300: '#ff6788',
      400: '#ff577c',
      500: '#ff3864',
      600: '#ff194c',
      700: '#ff0940',
      800: '#da0030'
    }
  },

  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white'
      }
    }
  },

  components: {
    Heading: {
      baseStyle: {
        color: 'primary.500'
      }
    },

    Input: {
      parts: ['field'],
      variants: {
        rg: {
          field: {
            color: 'white',
            bg: 'black',
            border: '1px solid',
            borderColor: 'primary.500',
            margin: '5px'
          }
        }
      }
    },

    Textarea: {
      variants: {
        rg: {
          color: 'white',
          bg: 'black',
          border: '1px solid',
          borderColor: 'primary.500',
          margin: '5px'
        }
      }
    },

    Modal: {
      parts: ['dialog'],
      baseStyle: {
        dialog: {
          bg: 'black',
          color: 'primary.500',
          border: '1px solid',
          borderColor: 'primary.800'
        }
      }
    },

  }
});

export default theme
