import { ChakraProvider } from "@chakra-ui/react"
import React from 'react'
import Navbar from "../components/Navbar"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
          <Navbar/>
          <Component {...pageProps} />
        </ChakraProvider>
}

export default MyApp
