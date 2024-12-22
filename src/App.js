import React ,{ useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstComponent from './Component/LandingPageComponents/one/FirstComponent.js';
import SecondComponent from './Component/LandingPageComponents/two/SecondComponent.js';
import ThirdComponent from './Component/LandingPageComponents/three/ThirdComponent.js';
import FourthComponent from './Component/LandingPageComponents/four/FourthComponent.js';
import FifthComponent from './Component/LandingPageComponents/five/FifthComponent.js';
import SixthComponent from './Component/LandingPageComponents/six/SixthComponent.js';
import SeventhComponent from './Component/LandingPageComponents/Seven/SeventhComponent.js';
import TermsAndConditions from './Component/LandingPageComponents/Seven/TermsAndConditions.js';
import PrivacyPolicy from './Component/LandingPageComponents/Seven/PrivacyPolicy.js';
import RefundPolicy from './Component/LandingPageComponents/Seven/RefundPolicy.js';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
      // fetch('http://localhost:8080/api/razorpay/get-razorpay')
      //     .then((response) => response.json())
      //     .then((json) => setData(json))
      //     .catch((error) => console.error('Error:', error));
          // fetch('http://localhost:8080/api/razorpay/create-order')
          // .then((response) => response.json())
          // .then((json) => setData(json))
          // .catch((error) => console.error('Error:', error));
  }, []);
  return (
    <Router>
      <div className="App">
       
        <Routes>
          
          <Route path="/" element={
            <div>
            
              <FirstComponent />
              <SecondComponent />
              <ThirdComponent />
              <FourthComponent />
              <FifthComponent />
              <SixthComponent />
              {/* Footer component */}
              <SeventhComponent />
            </div>
          }>
          </Route>
            {/* Nested routes */}
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
