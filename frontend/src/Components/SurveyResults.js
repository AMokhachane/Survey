// SurveyResults.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SurveyResults.module.css"; // optional, only if you plan to style

const SurveyResults = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user"); // adjust if needed
        setSurveys(response.data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className={styles.container || "p-4"}>
      <h2>Submitted Surveys</h2>
      {surveys.length === 0 ? (
        <p>No surveys found.</p>
      ) : (
        <table className={styles.table || "table"}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.contactNumber}</td>
                <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SurveyResults;
