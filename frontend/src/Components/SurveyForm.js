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

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
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
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });

  let error = "";

  if (value.trim() === "") {
    error = `${e.target.placeholder} is required`;
  } else if (name === "dob") {
    const selectedYear = new Date(value).getFullYear();
    if (selectedYear > 2020) {
      error = "User must be at least 5 years old.";
    }
  }

  setErrors({ ...errors, [name]: error });
};
  
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    if (form[e.target.name].trim() === "") {
      setErrors({ ...errors, [e.target.name]: `${e.target.placeholder} is required` });
    }
  };

  const handleFoodChange = (selectedFood) => {
    setForm((prevForm) => {
      const currentFoods = new Set(prevForm.food);
      currentFoods.has(selectedFood)
        ? currentFoods.delete(selectedFood)
        : currentFoods.add(selectedFood);
      return { ...prevForm, food: Array.from(currentFoods) };
    });

    setTouched((prev) => ({ ...prev, food: true }));

    setErrors((prev) => ({
      ...prev,
      food: form.food.length > 0 ? "" : "Please select at least one favorite food",
    }));
  };

  const handleRatingChange = (statement, value) => {
    setRatings((prev) => ({
      ...prev,
      [statement]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full Names is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.dob.trim()) {
  newErrors.dob = "Date of Birth is required";
} else {
  const selectedYear = new Date(form.dob).getFullYear();
  if (selectedYear > 2020) {
    newErrors.dob = "User must be at least 5 years old.";
  }
}
    if (!form.contact.trim()) newErrors.contact = "Contact Number is required";
    if (form.food.length === 0) newErrors.food = "Please select at least one favorite food";
    

    const missingRatings = ratingStatements.filter((stmt) => !ratings[stmt]);
    if (missingRatings.length > 0) {
      newErrors.ratings = "Please rate all statements before submitting.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    setTouched({
      name: true,
      email: true,
      dob: true,
      contact: true,
      food: true,
      ratings: true,
    });

    if (!isValid) return;

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
      alert("Survey submitted successfully!");
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Failed to submit survey. Please try again.");
    }
  };

  const renderInput = (name, type, label) => (
    <div className={SurveyCSS.inputGroup}>
      <label htmlFor={name} className={SurveyCSS.inputLabel}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        id={name}
        value={form[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${SurveyCSS.inputField} ${errors[name] && touched[name] ? SurveyCSS.errorInput : ""}`}
      />
      {errors[name] && touched[name] && (
        <span className={SurveyCSS.error}>{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className={SurveyCSS.container}>
      <form onSubmit={handleSubmit}>
        <div className={SurveyCSS.personalDetailsSection}>
          <div className={SurveyCSS.labelColumn}>
            <p>Personal Details :</p>
          </div>
          <div className={SurveyCSS.inputColumn}>
            {renderInput("name", "text", "Full Names")}
            {renderInput("email", "email", "Email")}
            {renderInput("dob", "date", "Date of Birth")}
            {renderInput("contact", "text", "Contact Number")}
          </div>
        </div>

        <div className={SurveyCSS.foodOptions}>
  <p>What is your favorite food?</p>
  {foodOptions.map((food) => (
    <label key={food}>
      <input
        type="checkbox"
        checked={form.food.includes(food)}
        onChange={() => handleFoodChange(food)}
      />
      {food}
    </label>
  ))}
  {errors.food && touched.food && (
    <span className={SurveyCSS.error}>{errors.food}</span>
  )}
</div>


        <div className={SurveyCSS.ratingSection}>
  <p>
    Please rate your level of agreement on a scale from 1 to 5, with 1 being
    "strongly agree" and 5 being "strongly disagree."
  </p>
  <table className={SurveyCSS.ratingTable}>
    <thead>
      <tr className={SurveyCSS.ratingHeader}>
        <th></th>
        {ratingLabels.map((label, index) => (
          <th key={index}>
            {/* Remove the numbers */}
            <span>{label}</span>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {ratingStatements.map((statement) => (
        <tr key={statement}>
          <td className={SurveyCSS.statementCell}>{statement}</td>
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
  {errors.ratings && touched.ratings && (
    <span className={SurveyCSS.error}>{errors.ratings}</span>
  )}
</div>

        <button type="submit" className={SurveyCSS.button} style={{ marginTop: "2rem" }}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
