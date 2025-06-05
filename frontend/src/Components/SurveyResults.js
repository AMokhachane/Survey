import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SurveyResults.module.css";

const SurveyResult = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        setSurveys(response.data);
      } catch (error) {
        console.error("Error fetching survey results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Helper to parse preferences array (["I like to watch movies:2", ...]) into object { key: rating }
  const parsePreferences = (prefsArray) => {
    if (!prefsArray) return {};
    return prefsArray.reduce((acc, curr) => {
      const [key, value] = curr.split(":");
      if (key && value) acc[key.trim()] = value.trim();
      return acc;
    }, {});
  };

  const getSummary = () => {
    if (surveys.length === 0) return null;

    const total = surveys.length;
    const ages = surveys.map((s) => calculateAge(s.dateOfBirth));
    const avgAge = (ages.reduce((a, b) => a + b, 0) / total).toFixed(1);
    const maxAge = Math.max(...ages);
    const minAge = Math.min(...ages);

    const pizzaFans = surveys.filter((s) => s.favoriteFoods?.includes("Pizza")).length;
    const pastaFans = surveys.filter((s) => s.favoriteFoods?.includes("Pasta")).length;
    const papAndWorsFans = surveys.filter((s) => s.favoriteFoods?.includes("Pap and Wors")).length;

    // Count people who like a preference (rating 1 or 2)
    const countLikes = (key) =>
      surveys.filter((s) => {
        const prefs = parsePreferences(s.preferences);
        return prefs[key] === "1" || prefs[key] === "2";
      }).length;

    const moviesLikes = countLikes("I like to watch movies");
    const musicLikes = countLikes("I like to listen to radio");
    const eatOutLikes = countLikes("I like to eat out");
    const tvLikes = countLikes("I like to watch TV");

    const toPercent = (num) => ((num / total) * 100).toFixed(1);

    return {
      total,
      avgAge,
      maxAge,
      minAge,
      pizzaPercent: toPercent(pizzaFans),
      pastaPercent: toPercent(pastaFans),
      papAndWorsPercent: toPercent(papAndWorsFans),
      moviesPercent: toPercent(moviesLikes),
      musicPercent: toPercent(musicLikes),
      eatOutPercent: toPercent(eatOutLikes),
      tvPercent: toPercent(tvLikes),
    };
  };

  const summary = getSummary();

  if (loading) return <p>Loading results...</p>;
  if (!summary) return <p>No survey data available.</p>;

  return (
  <div className={styles.container}>
    <h2>Survey Results</h2>

    <div className={styles.resultsGrid}>
      <div className={styles.label}>Total number of surveys:</div>
      <div className={styles.value}>{summary.total}</div>

      <div className={styles.label}>Average age:</div>
      <div className={styles.value}>{summary.avgAge}</div>

      <div className={styles.label}>Oldest person who participated in survey:</div>
      <div className={styles.value}>{summary.maxAge}</div>

      <div className={styles.label}>Youngest person who participated in survey:</div>
      <div className={styles.value}>{summary.minAge}</div>

      <div className={styles.spacer}></div>
      <div className={styles.spacer}></div>

      <div className={styles.label}>Percentage of people who like Pizza:</div>
      <div className={styles.value}>{summary.pizzaPercent}%</div>

      <div className={styles.label}>Percentage of people who like Pasta:</div>
      <div className={styles.value}>{summary.pastaPercent}%</div>

      <div className={styles.label}>Percentage of people who like Pap and Wors:</div>
      <div className={styles.value}>{summary.papAndWorsPercent}%</div>

      <div className={styles.spacer}></div>
      <div className={styles.spacer}></div>

      <div className={styles.label}>People who like to watch movies:</div>
      <div className={styles.value}>{summary.moviesPercent}%</div>

      <div className={styles.label}>People who like to listen to radio:</div>
      <div className={styles.value}>{summary.musicPercent}%</div>

      <div className={styles.label}>People who like to eat out:</div>
      <div className={styles.value}>{summary.eatOutPercent}%</div>

      <div className={styles.label}>People who like to watch TV:</div>
      <div className={styles.value}>{summary.tvPercent}%</div>
    </div>
  </div>
);
};

export default SurveyResult;