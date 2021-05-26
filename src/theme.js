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
      color: 'primary.500'
    }
  }
});

export default theme
