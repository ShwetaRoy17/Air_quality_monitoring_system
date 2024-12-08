import React, { useState, useEffect } from 'react';
import moon from '../assets/dark-mode.png'
import sun from '../assets/light-mode.png'


function ModeButton() {
  const [darkMode, setDarkMode] = useState(getInitialMode());

  useEffect(() => {
    // Update CSS variables based on darkMode state
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Function to toggle dark mode
  function toggleDarkMode() {
    setDarkMode(prevMode => !prevMode);
  }

  // Function to get initial mode based on user's preference
  function getInitialMode() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode;
  }

  return (
    <div className='fixed top-[4vh] right-[5vw] '>
       <div className='flex flex-row h-[2.5vh] w-[4vw]'>
        <div>
        <img src={darkMode?sun:moon} alt="mode" className='rounded-full h-[2vw] w-[2vw]'/>
        </div>
        <div>
        <button onClick={toggleDarkMode} className={`h-[2vh] w-[2vw] ${darkMode?'bg-white':'bg-gray-500'} rounded-md`}>
            <div className={`rounded-full w-[10px] h-[10px] ${darkMode?'bg-slate-400':'bg-slate-900'} ${darkMode?'ml-auto':''}`}>
            </div>
        </button>
        </div>
       </div>
    </div>
  );
}

export default ModeButton;
