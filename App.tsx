import { StatusBar } from "expo-status-bar";
import React from "react";
import ContextContainer from "./src/context/ContextContainer";
import Navigation from "./src/Navigation/Navigation";

const App = () => {
  return (
    <ContextContainer>
      <Navigation />
      <StatusBar style="auto" />
    </ContextContainer>
  );
};

export default App;
