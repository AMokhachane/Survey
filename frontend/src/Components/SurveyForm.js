import React, { useState } from "react";
import SurveyCSS from "./SurveyForm.module.css";
import axios from "axios";

const SurveyForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    contact: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to match your backend DTO
    const userDto = {
      fullName: form.name,
      email: form.email,
      contactNumber: form.contact,
      dateOfBirth: form.dob,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/user', userDto); // adjust URL if needed
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

        <button type="submit" className={SurveyCSS.button}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
