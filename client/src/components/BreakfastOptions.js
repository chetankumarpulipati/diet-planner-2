import React, { useState, useEffect } from 'react';

function BreakfastOptions() {
    const [foodItems, setFoodItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/food-items')
            .then(response => response.json())
            .then(data => setFoodItems(data))
            .catch(error => console.error('Error fetching food items:', error));
    }, []);

    useEffect(() => {
        const filtered = foodItems.filter(item => item.calories <= 385.36);
        setFilteredItems(filtered);
    }, [foodItems]);

    return (
        <div>
            <h4>Breakfast Options for Monday (Calories ≤ 385.36)</h4>
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item.name} - {item.calories} calories</li>
                ))}
            </ul>
        </div>
    );
}

export default BreakfastOptions;