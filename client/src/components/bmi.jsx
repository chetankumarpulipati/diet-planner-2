import React, { useState } from 'react';

function BmiCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('Please enter both weight and height.');
      return;
    }
    const bmiValue = weight / ((height / 100) * (height / 100));
    setBmi(bmiValue.toFixed(2));
    let category;
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue < 25) {
      category = 'Normal weight';
    } else if (bmiValue < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    setBmiCategory(category);
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
        <div className="bmi-calculator max-w-2xl w-full p-5 rounded-lg shadow-lg bg-gray-800">
          <h1 className="text-center text-2xl font-bold text-blue-500 mb-6">BMI Calculator</h1>
          <div className="input-group mb-4">
            <label htmlFor="weight" className="text-white block mb-3 font-bold ml-6 text-lg">Weight (kg):</label>
            <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-gray-500 w-full p-2.5 text-white border rounded border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="height" className="text-white block mb-3 font-bold ml-6 text-lg">Height (cm):</label>
            <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mb-3 bg-gray-500 w-full p-2.5 text-white border rounded border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
              onClick={calculateBMI}
              className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          >
            Calculate BMI
          </button>
          <div className="results mt-6 text-center">
            {bmi && <p className="text-white text-xl font-bold">Your BMI is: {bmi}</p>}
            {bmiCategory && <p className="text-white text-xl font-bold">Your BMI category is: {bmiCategory}</p>}
          </div>
        </div>
      </div>
  );
}

export default BmiCalculator;
