import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SurveyForm from "./Components/SurveyForm";
import SurveyResults from "./Components/SurveyResults";

function App() {
  return (
    <Router>
      <div>
        <nav className="flex justify-between p-4 border-b">
          <span className="font-bold">_Surveys</span>
          <div>
            <Link to="/" className="text-blue-500 mr-4">FILL OUT SURVEY</Link>
            <Link to="/results" className="text-blue-500">VIEW SURVEY RESULTS</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<SurveyForm />} />
          <Route path="/results" element={<SurveyResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
