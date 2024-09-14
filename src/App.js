import React from "react";

import "./App.css";
import Navigation from "./navigation/Navigation";
import Modal from "react-modal";
import { AuthProvider } from "./AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <>
          <Navigation />
          <Modal />
        </>
      </AuthProvider>
    </>
  );
}

export default App;


/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/