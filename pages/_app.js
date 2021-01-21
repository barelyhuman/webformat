import '../styles/globals.css'
import { GeistProvider, CssBaseline } from '@geist-ui/react'


function MyApp({ Component, pageProps }) {
  
  const myTheme = {
  "palette": {
    "background": "#121212",
    "foreground": "#ffffff"
  }
}


  return <GeistProvider theme={myTheme}>
  <CssBaseline /> 
  <Component {...pageProps} />
  </GeistProvider>
}

export default MyApp
