import React, { useState, useEffect } from 'react';

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
            setIsButtonDisabled(false); // Enable the button after the schedule is displayed
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

    // useEffect(() => {
    //     const fetchData = async (mealType, maxCalories) => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/${mealType}`);
    //             const data = await response.json();
    //             console.log(`Data received from backend for ${mealType}:`, data);
    //
    //             let totalCalories = 0;
    //             const selectedItems = [];
    //
    //             for (const item of data) {
    //                 if (totalCalories + item.calories <= maxCalories) {
    //                     totalCalories += item.calories;
    //                     selectedItems.push(item.name);
    //                 } else {
    //                     break;
    //                 }
    //             }
    //
    //             console.log(`Total calories of selected ${mealType} items:`, totalCalories);
    //
    //             setBreakfastMenu(prevMenu => ({
    //                 ...prevMenu,
    //                 monday: {
    //                     ...prevMenu.monday,
    //                     [mealType]: selectedItems.join(', ')
    //                 }
    //             }));
    //         } catch (error) {
    //             console.error(`Error fetching ${mealType} data:`, error);
    //         }
    //     };
    //
    //     if (mealBreakdown.breakfast) fetchData('breakfast', mealBreakdown.breakfast);
    //     if (mealBreakdown.lunch) fetchData('lunch', mealBreakdown.lunch);
    //     if (mealBreakdown.dinner) fetchData('dinner', mealBreakdown.dinner);
    //     if (mealBreakdown.snacks) fetchData('snacks', mealBreakdown.snacks);
    // }, [mealBreakdown]);
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
        <div className="p-8 bg-gray-300 min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-5xl space-y-6">
                <h2 className="text-2xl font-bold text-center text-white">Details</h2>

                <label className="ml-6 block mb-2 text-lg font-sans text-gray-900 dark:text-white">Age</label>
                <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className={`bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}

                <label className="ml-6 block mb-2 text-lg font-sans text-gray-900 dark:text-white">Height (cm)</label>
                <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter your height"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                />
                {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}

                <label className="ml-6 block mb-2 text-lg font-sans text-gray-900 dark:text-white">Weight (kg)</label>
                <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter your weight"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                />
                {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}

                <label className="ml-6 block mb-2 text-lg font-sans text-gray-900 dark:text-white">Activity Level (Ex: active, moderate)</label>
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

                <label className="ml-6 block mb-2 text-lg font-sans text-gray-900 dark:text-white" >Gender (M / F)</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label className="ml-6 block mb-2 text-lg font-sans text-gray-900 dark:text-white">Goal (Ex: Gain / Loss)</label>
                <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="weight gain">Weight Gain</option>
                    <option value="weight loss">Weight Loss</option>
                </select>

                <label className="ml-6 block mb-2 text-lg font-sans text-gray-900 dark:text-white">I'm a</label>
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
                        {/*<h4 style={{color: 'white', alignItems: "center", textAlign: 'center', marginTop: 20}}>Input Data</h4>*/}
                        {/*<table className="bg-white">*/}
                        {/*    <thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>Age</th>*/}
                        {/*        <th>Height</th>*/}
                        {/*        <th>Weight</th>*/}
                        {/*        <th>Goal</th>*/}
                        {/*        <th>I'm a</th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*    {fetchedData.map((data, index) => (*/}
                        {/*        <tr key={index}>*/}
                        {/*            <td>{data.age}</td>*/}
                        {/*            <td>{data.height}</td>*/}
                        {/*            <td>{data.weight}</td>*/}
                        {/*            <td>{data.goal}</td>*/}
                        {/*            <td>{data.preference}</td>*/}
                        {/*        </tr>*/}
                        {/*    ))}*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
                        <h4 style={{color: 'white', alignItems: "center", textAlign: 'center', marginTop: 20}}>Schedule</h4>
                        <table className="bg-white">
                            <thead>
                            <tr className="p-5">
                                <th>Day</th>
                                <th>Breakfast</th>
                                <th>Lunch</th>
                                <th>Dinner</th>
                                <th>Snacks</th>
                                <th>Total Calories</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Monday</td>
                                <td>{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small>
                                </td>
                                <td>{totalCalories.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Tuesday</td>
                                <td>{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small>
                                </td>
                                <td>{totalCalories.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Wednesday</td>
                                <td>{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small>
                                </td>
                                <td>{totalCalories.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Thursday</td>
                                <td>{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small>
                                </td>
                                <td>{totalCalories.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Friday</td>
                                <td>{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small>
                                </td>
                                <td>{totalCalories.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Saturday</td>
                                <td>{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small>
                                </td>
                                <td>{totalCalories.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Sunday</td>
                                <td>{breakfast_menu.monday.breakfast}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.lunch}<br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.dinner}<br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small>
                                </td>
                                <td>{breakfast_menu.monday.snacks}<br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small>
                                </td>
                                <td>{totalCalories.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{(mealBreakdown.breakfast * 7).toFixed(2)}</td>
                                <td>{(mealBreakdown.lunch * 7).toFixed(2)}</td>
                                <td>{(mealBreakdown.dinner * 7).toFixed(2)}</td>
                                <td>{(mealBreakdown.snacks * 7).toFixed(2)}</td>
                                <td><b>{(totalCalories * 7).toFixed(2)} </b></td>
                            </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </form>

        </div>
    );
}

export default Inputs;

