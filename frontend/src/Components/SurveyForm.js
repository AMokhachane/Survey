import React, { useState } from "react";
import SurveyCSS from "./SurveyForm.module.css";

const SurveyForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    contact: "",
    food: [],
    ratings: {},
  });

  const foodOptions = ["Pizza", "Pasta", "Pap and Wors", "Other"];
  const ratingQuestions = [
    "I like to watch movies",
    "I like to listen to radio",
    "I like to eat out",
    "I like to watch TV",
  ];
  const ratingScale = [
    "Strongly Agree",
    "Agree",
    "Neutral",
    "Disagree",
    "Strongly Disagree",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFoodChange = (food) => {
    setForm((prev) => {
      const foodSet = new Set(prev.food);
      foodSet.has(food) ? foodSet.delete(food) : foodSet.add(food);
      return { ...prev, food: Array.from(foodSet) };
    });
  };

  const handleRatingChange = (question, value) => {
    setForm((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [question]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
    // You can send this to your API endpoint
  };

 return (
    <div className={SurveyCSS.container}>
      <h2>Personal Details :</h2>
      <form onSubmit={handleSubmit}>
        <div className={SurveyCSS["grid-two-columns"]}>
          <input
            name="name"
            type="text"
            placeholder="Full Names"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="dob"
            type="date"
            placeholder="Date of Birth"
            value={form.dob}
            onChange={handleChange}
          />
          <input
            name="contact"
            type="text"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
          />
        </div>

        <div className={SurveyCSS["food-options"]}>
          <p>What is your favorite food?</p>
          {foodOptions.map((food) => (
            <label key={food}>
              <input
                type="checkbox"
                onChange={() => handleFoodChange(food)}
                checked={form.food.includes(food)}
              />
              {food}
            </label>
          ))}
        </div>

        <p className={SurveyCSS["rating-intro"]}>
          Please rate your level of agreement on a scale from 1 to 5:
        </p>

        <div className={SurveyCSS["table-wrapper"]}>
          <table>
            <thead>
              <tr>
                <th></th>
                {ratingScale.map((scale) => (
                  <th key={scale}>{scale}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ratingQuestions.map((question) => (
                <tr key={question}>
                  <td>{question}</td>
                  {ratingScale.map((scale) => (
                    <td key={scale}>
                      <input
                        type="radio"
                        name={question}
                        value={scale}
                        checked={form.ratings[question] === scale}
                        onChange={() => handleRatingChange(question, scale)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="submit" className={SurveyCSS.button}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
