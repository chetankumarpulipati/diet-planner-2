import React, { useState, useEffect } from 'react';
import '@fontsource/roboto'; 
import '@fontsource/merriweather';
import '@fontsource/lobster'; 
import '@fontsource/montserrat';
// import '../styles/inputs.css'

function Inputs() {
    const initialFormData = {
        age: '',
        height: '',
        weight: '',
        activity: '',
        gender: '',
        goal: 'weight gain',
        preference: 'vegetarian'
    };
    const [breakfast_menu, setBreakfastMenu] = useState( {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
    });

    const [formData, setFormData] = useState(initialFormData);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [fetchedData, setFetchedData] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [mealBreakdown, setMealBreakdown] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.height) newErrors.height = 'Height is required';
        if (!formData.weight) newErrors.weight = 'Weight is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setIsButtonDisabled(true);
        setLoading(true);
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                console.log('Data submitted successfully');
                setSubmitted(true);
                setFormData(initialFormData);
                setFetchedData([...fetchedData, formData]);
                const bmr = calculateBMR(formData.gender, formData.weight, formData.height, formData.age);
                const tdee = calculateTDEE(bmr, formData.activity);
                const calories = calculateCalories(formData.goal, tdee);
                setTotalCalories(calories);
                setMealBreakdown(calculateMealBreakdown(calories));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setTimeout(() => {
            setLoading(false);
            setShowTable(true);
            setIsButtonDisabled(false);
        }, 600);
    };

    useEffect(() => {
        fetch('http://localhost:3000/data')
            .then(response => response.json())
            .then(data => {
                setFetchedData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const fetchData = async (mealType, maxCalories) => {
            try {
                const response = await fetch(`http://localhost:3000/${mealType}`);
                const data = await response.json();
                console.log(`Data received from backend for ${mealType}:`, data);

                let totalCalories = 0;
                const selectedItems = [];

                for (const item of data) {
                    if (totalCalories + item.calories <= maxCalories) {
                        totalCalories += item.calories;
                        selectedItems.push(item.name);
                    } else {
                        break;
                    }
                }

                console.log(`Total calories of selected ${mealType} items:`, totalCalories);

                setBreakfastMenu(prevMenu => ({
                    ...prevMenu,
                    monday: {
                        ...prevMenu.monday,
                        [mealType]: selectedItems.join(', ')
                    }
                }));
            } catch (error) {
                console.error(`Error fetching ${mealType} data:`, error);
            }
        };

        if (mealBreakdown.breakfast) fetchData('breakfast', mealBreakdown.breakfast);
        if (mealBreakdown.lunch) fetchData('lunch', mealBreakdown.lunch);
        if (mealBreakdown.dinner) fetchData('dinner', mealBreakdown.dinner);
        if (mealBreakdown.snacks) fetchData('snacks', mealBreakdown.snacks);
    }, [mealBreakdown]);


    function calculateBMR(gender, weight, height, age) {
        if (gender === 'male') {
            return 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            return 10 * weight + 6.25 * height - 5 * age - 161;
        }
    }

    function calculateTDEE(bmr, activity) {
        const activityLevels = {
            'sedentary': 1.2,
            'lightly active': 1.375,
            'moderately active': 1.55,
            'very active': 1.725,
            'extra active': 1.9
        };
        return bmr * (activityLevels[activity] || 1.2);
    }

    function calculateCalories(goal, tdee) {
        if (goal === 'weight gain') {
            return tdee + 500;
        } else {
            return tdee - 500;
        }
    }

    function calculateMealBreakdown(calories) {
        return {
            breakfast: calories * 0.2,
            lunch: calories * 0.4,
            dinner: calories * 0.3,
            snacks: calories * 0.1
        };
    }

    return (
        <div>
        <div className="bg-gray-800 min-h-screen flex items-center justify-content-center">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-full max-w-5xl space-y-6 justify-content-center align-items-center">
                <h2 className="text-5xl font-bold text-center text-yellow-200 mb-5">Get Your Schedule!!</h2>

                <label className="ml-6 block mb-2 text-lg font-sans text-white">Age</label>
                <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}

                <label className="ml-6 block mb-2 text-lg font-sans text-white">Height (cm)</label>
                <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter your height"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                />
                {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}

                <label className="ml-6 block mb-2 text-lg font-sans text-white">Weight (kg)</label>
                <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter your weight"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                />
                {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}

                <label className="ml-6 block mb-2 text-lg font-sans text-white">Activity Level (Ex: active, moderate)</label>
                <select
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly active">Lightly Active</option>
                    <option value="moderately active">Moderately Active</option>
                    <option value="very active">Very Active</option>
                    <option value="extra active">Extra Active</option>
                </select>

                <label className="ml-6 block mb-2 text-lg font-sans text-white" >Gender (M / F)</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label className="ml-6 block mb-2 text-lg font-sans text-white">Goal (Ex: Gain / Loss)</label>
                <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="weight gain">Weight Gain</option>
                    <option value="weight loss">Weight Loss</option>
                </select>

                <label className="ml-6 block mb-2 text-lg font-sans text-white">I'm a</label>
                <select
                    name="preference"
                    value={formData.preference}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                </select>

                <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={`mt-4 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${loading ? 'loading' : ''}`}
                > Submit
                </button>

                {loading && (
                    <div className="circular-progress-container flex justify-center items-center mt-4">
                        <div className="circular-progress"></div>
                    </div>
                )}

                {showTable && (
                    <>
                    <h4 style={{color: '#fef08a', fontWeight: 'bold', alignItems: 'center', textAlign: 'center', marginTop: 20, fontFamily: 'merriweather'}}>Input Data</h4>
                       <table className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
                            <thead>
                            <tr className="bg-gray-800 text-white text-left">
                                <th>Age</th>
                                <th>Height</th>
                                <th>Weight</th>
                                <th>Goal</th>
                                <th>I'm a</th>
                            </tr>
                            </thead>
                            <tbody>
                            {fetchedData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.age}</td>
                                    <td>{data.height}</td>
                                    <td>{data.weight}</td>
                                    <td>{data.goal}</td>
                                    <td>{data.preference}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <h4 style={{color: '#fef08a', alignItems: 'center', textAlign: 'center', marginTop: 20, fontFamily: 'merriweather', fontWeight: 'bold'}}>Your's personalised schedule</h4>
                        <table className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
                                    <th className="p-4">Day</th>
                                    <th className="p-4">Breakfast</th>
                                    <th className="p-4">Lunch</th>
                                    <th className="p-4">Dinner</th>
                                    <th className="p-4">Snacks</th>
                                    <th className="p-4">Total Calories</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-red-100 border-b">
                                    <td className="p-4">Monday</td>
                                    <td className="p-4">{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                    <td className="p-4">{totalCalories.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-yellow-100 border-b">
                                    <td className="p-4">Tuesday</td>
                                    <td className="p-4">{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                    <td className="p-4">{totalCalories.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-green-100 border-b">
                                    <td className="p-4">Wednesday</td>
                                    <td className="p-4">{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                    <td className="p-4">{totalCalories.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-blue-100 border-b">
                                    <td className="p-4">Thursday</td>
                                    <td className="p-4">{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                    <td className="p-4">{totalCalories.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-indigo-100 border-b">
                                    <td className="p-4">Friday</td>
                                    <td className="p-4">{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                    <td className="p-4">{totalCalories.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-purple-100 border-b">
                                    <td className="p-4">Saturday</td>
                                    <td className="p-4">{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                    <td className="p-4">{totalCalories.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-pink-100 border-b">
                                    <td className="p-4">Sunday</td>
                                    <td className="p-4">{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                    <td className="p-4">{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                    <td className="p-4">{totalCalories.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                    <td className="p-4 font-bold">Total</td>
                                    <td className="p-4 font-bold">{(mealBreakdown.breakfast * 7).toFixed(2)}</td>
                                    <td className="p-4 font-bold">{(mealBreakdown.lunch * 7).toFixed(2)}</td>
                                    <td className="p-4 font-bold">{(mealBreakdown.dinner * 7).toFixed(2)}</td>
                                    <td className="p-4 font-bold">{(mealBreakdown.snacks * 7).toFixed(2)}</td>
                                    <td className="p-4 font-bold">{(totalCalories * 7).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                        </table>

                    </>
                )}
            </form>
        </div>
        <div>
        </div>
        </div>
    );
}

export default Inputs;

