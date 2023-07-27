// Custom font
import '@fontsource/open-sans/500.css'
import React, { useEffect, useState } from 'react';

import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import Layout from '../components/layouts/Layout'

import theme from '../theme'

export default function MyApp({ Component, pageProps }) {

  const [code, setCode]  = useState()

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Layout setCode={setCode}>
          <Component {...pageProps} code={code}/>
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
