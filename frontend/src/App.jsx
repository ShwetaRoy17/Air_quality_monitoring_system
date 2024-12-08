import React from 'react'
import ToggleButton from "./components/toggleButton";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './Login';


const App = () => {
  return (
    <div id="root">
      <ToggleButton/>
      <Routes>
        {/* <Route path ="/" element={<Login/>}></Route> */}
        <Route path="/" element = {<Home/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App


