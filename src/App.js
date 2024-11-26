// src/App.js
import React from 'react';
import FirstComponent from './Component/FirstComponent';
import SecondComponent from './Component/SecondComponent';
import ThirdComponent from './Component/ThirdComponent';
import FourthComponent from './Component/FourthComponent';
import FifthComponent from './Component/FifthComponent';

function App() {
  return (
    <div className="App">
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent/>
      <FourthComponent/>
      <FifthComponent/>
    </div>
  );
}

export default App;
