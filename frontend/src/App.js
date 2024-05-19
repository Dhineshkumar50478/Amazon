import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import { Signup } from './Signup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/Signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
