import { StatusBar } from "expo-status-bar";
import React from "react";
import ContextContainer from "./context/ContextContainer";
import Navigation from "./Navigation/Navigation";

const App = () => {
  return (
    <ContextContainer>
      <Navigation />
      <StatusBar style="auto" />
    </ContextContainer>
  );
};

export default App;
