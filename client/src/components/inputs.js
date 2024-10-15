import React, { useState, useEffect } from 'react';
import '../App.css';

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
    const breakfast_menu = {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
    }
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
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
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
            headers: {
                'Content-Type': 'application/json'
            },
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
            <form onSubmit={handleSubmit}>
                <label>Age</label>
                <br/>
                <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    style={{borderColor: errors.age ? 'red' : '', fontSize: '12px'}}
                />
                {errors.age && <p style={{color: 'red', fontSize: '12px'}}>{errors.age}</p>}
                <br/>
                <label>Height (cm)</label>
                <br/>
                <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter your height"
                    style={{borderColor: errors.height ? 'red' : '', fontSize: '12px'}}
                />
                {errors.height && <p style={{color: 'red', fontSize: '12px'}}>{errors.height}</p>}
                <br/>
                <label>Weight (kg)</label>
                <br/>
                <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter your weight"
                    style={{borderColor: errors.weight ? 'red' : '', fontSize: '12px'}}
                />
                {errors.weight && <p style={{color: 'red', fontSize: '12px'}}>{errors.weight}</p>}
                <br/>
                <label>Activity Level</label>
                <br/>
                <select name="activity" value={formData.activity} onChange={handleChange}>
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly active">Lightly Active</option>
                    <option value="moderately active">Moderately Active</option>
                    <option value="very active">Very Active</option>
                    <option value="extra active">Extra Active</option>
                </select>
                <br/>
                <label>Gender</label>
                <br/>
                <select name="gender" value = {formData.gender} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label>Goal</label>
                <br/>
                <select name="goal" value={formData.goal} onChange={handleChange}>
                    <option value="weight gain">Weight Gain</option>
                    <option value="weight loss">Weight Loss</option>
                </select>
                <br/>
                <br/>
                <label>I'm a</label>
                <br/>
                <select name="preference" value={formData.preference} onChange={handleChange}>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
                <br/>
                <br/>
                <button type="submit" disabled={isButtonDisabled} className={loading ? 'loading' : ''}>
                    Submit
                </button>
                {loading && (
                    <div className="circular-progress-container">
                        <div className="circular-progress"></div>
                    </div>
                )}
                {showTable && (
                    <>
                        <h4 style={{alignItems: "center", textAlign: 'center', marginTop: 20}}>Input Data</h4>
                        <table>
                            <thead>
                            <tr>
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
                        <h4 style={{alignItems: "center", textAlign: 'center', marginTop: 20}}>Schedule</h4>
                        <table>
                            <thead>
                            <tr>
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
                                <td>{breakfast_menu.monday}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                <td>{totalCalories}</td>
                            </tr>
                            <tr>
                                <td>Tuesday</td>
                                <td>{breakfast_menu.tuesday}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                <td>{totalCalories}</td>
                            </tr>
                            <tr>
                            <td>Wednesday</td>
                                <td>{breakfast_menu.wednesday}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                <td>{totalCalories}</td>
                            </tr>
                            <tr>
                            <td>Thursday</td>
                                <td>{breakfast_menu.thursday}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                <td>{totalCalories}</td>
                            </tr>
                            <tr>
                            <td>Friday</td>
                                <td>{breakfast_menu.friday}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                <td>{totalCalories}</td>
                            </tr>
                            <tr>
                            <td>Saturday</td>
                                <td>{breakfast_menu.saturday}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                <td>{totalCalories}</td>
                            </tr>
                            <tr>
                            <td>Sunday</td>
                                <td>{breakfast_menu.sunday}<br/><small>calories: {mealBreakdown.breakfast.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.lunch.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.dinner.toFixed(2)}</small></td>
                                <td><br/><small>calories: {mealBreakdown.snacks.toFixed(2)}</small></td>
                                <td>{totalCalories}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{(mealBreakdown.breakfast*7).toFixed(2)}</td>
                                <td>{(mealBreakdown.lunch*7).toFixed(2)}</td>
                                <td>{(mealBreakdown.dinner*7).toFixed(2)}</td>
                                <td>{(mealBreakdown.snacks*7).toFixed(2)}</td>
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