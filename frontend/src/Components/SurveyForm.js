import React, { useState } from "react";
import SurveyCSS from "./SurveyForm.module.css";
import axios from "axios";

const SurveyForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    contact: "",
    food: [], // ✅ Added food array
  });

  const foodOptions = ["Pizza", "Pasta", "Pap and Wors", "Other"]; // ✅ Food options

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle food checkbox toggling
  const handleFoodChange = (selectedFood) => {
    setForm((prevForm) => {
      const currentFoods = new Set(prevForm.food);
      currentFoods.has(selectedFood)
        ? currentFoods.delete(selectedFood)
        : currentFoods.add(selectedFood);
      return { ...prevForm, food: Array.from(currentFoods) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Include favoriteFoods in DTO
    const userDto = {
      fullName: form.name,
      email: form.email,
      contactNumber: form.contact,
      dateOfBirth: form.dob,
      favoriteFoods: form.food,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/user', userDto);
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

        {/* ✅ Favorite Food Section */}
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

        <button type="submit" className={SurveyCSS.button}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
