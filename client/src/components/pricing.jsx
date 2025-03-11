import React, { useState, useEffect } from "react";

const PricingTable = () => {
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#2d3748",
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
      color: "#ffffff",
      marginTop: "50px",

      marginBottom: "20px",
      zIndex: 1,
      position: "relative",
    },
    pricingTable: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      zIndex: 1,
      position: "relative",
      flexWrap: "wrap",
    },
    plan: {
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      width: "300px",
      padding: "20px",
      marginBottom: "20px",
      position: "relative",
      paddingBottom: "70px", // Add padding to avoid overlap with button
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
      textAlign: "left",
    },
    planDetailItem: {
      margin: "10px 0",
      display: "flex",
      alignItems: "center",
      padding: "5px 0",
    },
    symbolBox: {
      border: "1px solid #ccc",
      borderRadius: "3px",
      padding: "2px 10px",
      marginLeft: "10px",
      minWidth: "20px",
      textAlign: "center",
      fontWeight: "bold",
      marginRight: "10px",
    },
    selectPlan: {
      textDecoration: "none",
      padding: "10px 20px",
      borderRadius: "10px",
      backgroundColor: "#ff4081",
      color: "white",
      fontWeight: "bold",
      display: "block",
      margin: "0 auto",
      position: "absolute",
      bottom: "10px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    '@media (max-width: 768px)': {
      pricingTable: {
        flexDirection: "column",
        alignItems: "center",
      },
      plan: {
        width: "100%",
        maxWidth: "300px",
      },
    },
  };

  return (
      <div style={styles.body}>
        <p style={styles.paragraph} className="lavishly-yours-regular">Choose a plan that suits your needs</p>
        <div style={styles.pricingTable}>
          <div style={styles.plan}>
            <div style={{ ...styles.planHeader, ...styles.weekly }}>
              Weekly Plan
            </div>
            <div style={styles.price}>$11.80/week</div>
            <ul style={styles.planDetails}>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Customized Weekly Meal Plan
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Nutritional Breakdown
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> 1 Recipe per Meal
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Grocery List for the Week
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✗</span> Calorie and Macronutrient Tracker
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✗</span> Priority Customer Support
              </li>
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
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Customized Monthly Meal Plan
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Nutritional Breakdown for Each Meal
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> 3 Recipes per Meal
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Weekly Grocery List
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Calorie and Macronutrient Tracker
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Priority Customer Support
              </li>
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
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Customized Yearly Meal Plan
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Nutritional Breakdown & Progress Reports
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Unlimited Recipes per Meal
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Grocery List Auto-Sync with Apps
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Calorie, Macronutrient, and Micronutrient Tracker
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> Exclusive Access to New Recipes & Features
              </li>
              <li style={styles.planDetailItem}>
                <span style={styles.symbolBox}>✓</span> 24/7 VIP Customer Support
              </li>
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