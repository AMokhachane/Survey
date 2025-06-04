import React from "react";
import SurveyForm from "./Components/SurveyForm";

function App() {
  return (
    <div>
      <nav className="flex justify-between p-4 border-b">
        <span className="font-bold">_Surveys</span>
        <div>
          <a href="#" className="text-blue-500 mr-4">FILL OUT SURVEY</a>
          <a href="#">VIEW SURVEY RESULTS</a>
        </div>
      </nav>
      <SurveyForm />
    </div>
  );
}

export default App;
