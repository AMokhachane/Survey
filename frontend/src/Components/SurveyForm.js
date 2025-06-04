import React, { useState } from "react";
import SurveyCSS from "./SurveyForm.module.css";
import axios from "axios";

const SurveyForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    contact: "",
    food: [],
  });

  const [ratings, setRatings] = useState({});

  const foodOptions = ["Pizza", "Pasta", "Pap and Wors", "Other"];
  const ratingLabels = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];
  const ratingStatements = [
    "I like to watch movies",
    "I like to listen to radio",
    "I like to eat out",
    "I like to watch TV",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFoodChange = (selectedFood) => {
    setForm((prevForm) => {
      const currentFoods = new Set(prevForm.food);
      currentFoods.has(selectedFood)
        ? currentFoods.delete(selectedFood)
        : currentFoods.add(selectedFood);
      return { ...prevForm, food: Array.from(currentFoods) };
    });
  };

  const handleRatingChange = (statement, value) => {
    setRatings((prev) => ({
      ...prev,
      [statement]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDto = {
      fullName: form.name,
      email: form.email,
      contactNumber: form.contact,
      dateOfBirth: form.dob,
      favoriteFoods: form.food,
      preferences: Object.entries(ratings).map(
        ([statement, value]) => `${statement}:${value}`
      ),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/user", userDto);
      console.log("User created successfully:", response.data);
      alert("Survey submitted successfully!");
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Failed to submit survey. Please try again.");
    }
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

        <div className={SurveyCSS["food-options"]} style={{ marginTop: "1rem" }}>
          <p>What is your favorite food?</p>
          {foodOptions.map((food) => (
            <label key={food} style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                checked={form.food.includes(food)}
                onChange={() => handleFoodChange(food)}
              />
              {food}
            </label>
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <p>Rate the following statements (1 = Strongly Agree, 5 = Strongly Disagree):</p>
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Statement</th>
                {ratingLabels.map((label, index) => (
                  <th key={index}>
                    {index + 1}
                    <br />
                    <span style={{ fontSize: "0.75rem" }}>{label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ratingStatements.map((statement) => (
                <tr key={statement}>
                  <td style={{ textAlign: "left" }}>{statement}</td>
                  {ratingLabels.map((_, index) => (
                    <td key={index}>
                      <input
                        type="radio"
                        name={statement}
                        value={index + 1}
                        checked={ratings[statement] === String(index + 1)}
                        onChange={(e) => handleRatingChange(statement, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="submit" className={SurveyCSS.button} style={{ marginTop: "2rem" }}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
