import React from 'react';
import { StoreProvider } from "./utils/GlobalState";
import './App.css';
import Routes from "./Routes";

function App() {
  return (
    <div>
      <StoreProvider>
        <Routes/>
      </StoreProvider>
    </div>
  );
}

export default App;
