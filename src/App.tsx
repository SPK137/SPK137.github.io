import React from "react";
import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import SearchPage from "./pages/searchPage";

const breakpoints = ["87em", "90em"];

const theme = extendTheme({
  breakpoints,
});

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SearchPage />
    </ChakraProvider>
  );
}

export default App;
