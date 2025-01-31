import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import FirstComponent from "./Component/LandingPageComponents/one/FirstComponent.js";
import SecondComponent from "./Component/LandingPageComponents/two/SecondComponent.js";
import ThirdComponent from "./Component/LandingPageComponents/three/ThirdComponent.js";
import FourthComponent from "./Component/LandingPageComponents/four/FourthComponent.js";
import FifthComponent from "./Component/LandingPageComponents/five/FifthComponent.js";
import SixthComponent from "./Component/LandingPageComponents/six/SixthComponent.js";
import SeventhComponent from "./Component/LandingPageComponents/Seven/SeventhComponent.js";
import TermsAndConditions from "./Component/LandingPageComponents/Seven/TermsAndConditions.js";
import PrivacyPolicy from "./Component/LandingPageComponents/Seven/PrivacyPolicy.js";
import RefundPolicy from "./Component/LandingPageComponents/Seven/RefundPolicy.js";

/** Component to set dynamic canonical URL */
const CanonicalTag = () => {
  const location = useLocation();
  const canonicalUrl = `https://realscore.in${location.pathname}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

/** Component to add Schema.org structured data */
const SchemaMarkup = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RealScore",
    "url": "https://realscore.in",
    "logo": "https://realscore.in/logo.png",
    "description": "RealScore is a trusted credit repair service helping users fix credit report errors, improve credit scores, and enhance financial health.",
    "sameAs": [
      "https://www.facebook.com/realscore",
      "https://www.twitter.com/realscore",
      "https://www.linkedin.com/company/realscore"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer support"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <CanonicalTag />
        <SchemaMarkup />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
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
              }
            />
            {/* Nested routes */}
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
