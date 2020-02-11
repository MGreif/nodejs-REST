import React,{Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import {MemoCard} from './components/MemoCard'
import {Header} from './components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  
  return (
    <Fragment>
      <Header title="HomePage"/>
    <div className="App">
      <MemoCard width="300" maxHeight="150" title="ABC" description="TExt"/>
    </div>
    </Fragment>
  );
}

export default App;
