import React, { useState } from 'react';
import BmiInfo from './BmiInfo';

function BmiCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const calculateBMI = () => {
    if (!weight || !height) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
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

  const getPointerPosition = () => {
    if (bmi < 18.5) return '10%';
    if (bmi < 25) return '35%';
    if (bmi < 30) return '60%';
    return '85%';
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4 overflow-x-hidden">
        {showAlert && (
            <div
                className="p-2 mb-2 text-xs text-blue-800 rounded-l-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 fixed bottom-8 right-4"
                role="alert">
              <span className="font-medium">Info alert!</span> Please enter both weight and height.
              <button onClick={() => setShowAlert(false)} className="ml-2 text-red-500">X</button>
            </div>
        )}
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full">
          <div className="bmi-calculator max-w-md w-full p-5 rounded-lg bg-gray-800 mt-5 lg:mt-0 lg:mr-5">
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
          </div>
          {bmi && bmiCategory && (
              <div className="bmi-calculator mt-5 max-w-sm w-full p-5 rounded-lg bg-gray-800 flex flex-col items-center justify-center lg:ml-5">
                <div className="relative mt-4 w-full">
                  <div className="h-4 w-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded">
                    <div
                        className="absolute top-0 h-4 w-1 bg-black"
                        style={{ left: getPointerPosition() }}
                    ></div>
                  </div>
                  <div className="flex mb-5 justify-between text-xs text-white mt-1">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </div>
                <p className="text-white text-xl font-bold text-center">Your BMI is: {bmi} kg/m<sup>2</sup></p>
                <p className="text-white text-xl font-bold text-center">Your BMI category is: {bmiCategory}</p>
              </div>
          )}
          <div className="flex items-center justify-center mt-16 lg:mt-0 lg:ml-5">
            <div className="bmi-ranges max-h-60 w-full overflow-none p-3 rounded-lg bg-gray-800">
              <h2 className="text-center text-xl font-bold text-blue-500 mb-4 sm:mt-24">BMI Ranges</h2>
              <ul className="text-white">
                <li>➡️Underweight: BMI &lt; 18.5</li>
                <li>➡️Normal weight: BMI 18.5 - 24.9</li>
                <li>➡️Overweight: BMI 25 - 29.9</li>
                <li>➡️Obese: BMI ≥ 30</li>
              </ul>
            </div>
          </div>
        </div>
        <BmiInfo />
      </div>
  );
}

export default BmiCalculator;