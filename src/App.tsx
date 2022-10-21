/* "FC" siginifica "functional components" nesse caso estamos tipando pra dizer que esse componente é um componente funcional do react */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
