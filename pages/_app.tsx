import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import "../styles/globals.css";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoints: ["1200px", "85em"],
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
