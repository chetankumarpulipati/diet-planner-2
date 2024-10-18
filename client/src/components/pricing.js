import React, { useState, useEffect } from "react";

const PricingTable = () => {
  const backgroundImages = [
    "https://images.pexels.com/photos/1234651/pexels-photo-1234651.jpeg",
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    "https://images.pexels.com/photos/1966433/pexels-photo-1966433.jpeg",
    "https://images.pexels.com/photos/1234652/pexels-photo-1234652.jpeg",
    "https://images.pexels.com/photos/1234563/pexels-photo-1234563.jpeg",
    "https://images.pexels.com/photos/1435897/pexels-photo-1435897.jpeg",
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg", 
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    "https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg",
    "https://images.pexels.com/photos/1435898/pexels-photo-1435898.jpeg"
  ];

  const [backgroundImage, setBackgroundImage] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  }, []);

  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      textAlign: "center",
      margin: 0,
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    },
    heading: {
      color: "#333",
      marginBottom: "10px",
      zIndex: 1,
      position: "relative",
    },
    paragraph: {
      color: "#777",
      marginBottom: "40px",
      zIndex: 1,
      position: "relative",
    },
    pricingTable: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      zIndex: 1,
      position: "relative",
    },
    plan: {
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      width: "300px",
      padding: "20px",
    },
    planHeader: {
      padding: "20px",
      color: "white",
      borderRadius: "10px 10px 0 0",
      fontSize: "24px",
      fontWeight: "bold",
    },
    weekly: {
      background: "linear-gradient(to bottom, #76a6f5, #917bf6)",
    },
    monthly: {
      background: "linear-gradient(to bottom, #fc6d94, #fb4985)",
    },
    yearly: {
      background: "linear-gradient(to bottom, #5ba8f5, #77c5f7)",
    },
    price: {
      fontSize: "32px",
      margin: "20px 0",
    },
    planDetails: {
      listStyleType: "none",
      padding: 0,
      margin: "20px 0",
      color: "#555",
    },
    planDetailItem: {
      margin: "10px 0",
    },
    selectPlan: {
      textDecoration: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      backgroundColor: "#ff4081",
      color: "white",
      fontWeight: "bold",
      // display: "inline-block",
      marginTop: "10px",
    },
    animatedBackground: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: 0,
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.3,
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.animatedBackground}></div>
      <h1 style={styles.heading}>Our Pricing Table</h1>
      <p style={styles.paragraph}>Choose a plan that suits your needs</p>

      <div style={styles.pricingTable}>
        <div style={styles.plan}>
          <div style={{ ...styles.planHeader, ...styles.weekly }}>
            Weekly Plan
          </div>
          <div style={styles.price}>$11.80/week</div>
          <ul style={styles.planDetails}>
            <li style={styles.planDetailItem}>✓ Customized Weekly Meal Plan</li>
            <li style={styles.planDetailItem}>✓ Nutritional Breakdown</li>
            <li style={styles.planDetailItem}>✓ 1 Recipe per Meal</li>
            <li style={styles.planDetailItem}>✓ Grocery List for the Week</li>
            <li style={styles.planDetailItem}>✗ Calorie and Macronutrient Tracker</li>
            <li style={styles.planDetailItem}>✗ Priority Customer Support</li>
          </ul>
          <a
            href="#"
            style={styles.selectPlan}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff3068")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4081")}
          >
            Select Plan
          </a>
        </div>

        <div style={styles.plan}>
          <div style={{ ...styles.planHeader, ...styles.monthly }}>
            Monthly Plan
          </div>
          <div style={styles.price}>$75.80/month</div>
          <ul style={styles.planDetails}>
            <li style={styles.planDetailItem}>✓ Customized Monthly Meal Plan</li>
            <li style={styles.planDetailItem}>✓ Nutritional Breakdown for Each Meal</li>
            <li style={styles.planDetailItem}>✓ 3 Recipes per Meal</li>
            <li style={styles.planDetailItem}>✓ Weekly Grocery List</li>
            <li style={styles.planDetailItem}>✓ Calorie and Macronutrient Tracker</li>
            <li style={styles.planDetailItem}>✓ Priority Customer Support</li>
          </ul>
          <a
            href="#"
            style={styles.selectPlan}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff3068")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4081")}
          >
            Select Plan
          </a>
        </div>
        <div style={styles.plan}>
          <div style={{ ...styles.planHeader, ...styles.yearly }}>
            Yearly Plan
          </div>
          <div style={styles.price}>$125.80/year</div>
          <ul style={styles.planDetails}>
            <li style={styles.planDetailItem}>✓ Customized Yearly Meal Plan</li>
            <li style={styles.planDetailItem}>✓ Nutritional Breakdown & Progress Reports</li>
            <li style={styles.planDetailItem}>✓ Unlimited Recipes per Meal</li>
            <li style={styles.planDetailItem}>✓ Grocery List Auto-Sync with Apps</li>
            <li style={styles.planDetailItem}>✓ Calorie, Macronutrient, and Micronutrient Tracker</li>
            <li style={styles.planDetailItem}>✓ Exclusive Access to New Recipes & Features</li>
            <li style={styles.planDetailItem}>✓ 24/7 VIP Customer Support</li>
          </ul>
          <a
            href="#"
            style={styles.selectPlan}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff3068")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4081")}
          >
            Select Plan
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
