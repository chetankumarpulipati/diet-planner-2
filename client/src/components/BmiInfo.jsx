import React from 'react';

function BmiInfo() {
    return (
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">BMI Introduction</h2>
            <p>BMI is a measurement of a person's leanness or corpulence based on their height and weight...</p>
            <h3 className="text-xl font-bold mt-4">BMI Table for Adults</h3>
            <table className="w-full mt-2 mb-4">
                <thead>
                <tr>
                    <th>Classification</th>
                    <th>BMI range - kg/m<sup>2</sup></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Severe Thinness</td>
                    <td>&lt; 16</td>
                </tr>
                <tr>
                    <td>Moderate Thinness</td>
                    <td>16 - 17</td>
                </tr>
                <tr>
                    <td>Mild Thinness</td>
                    <td>17 - 18.5</td>
                </tr>
                <tr>
                    <td>Normal</td>
                    <td>18.5 - 25</td>
                </tr>
                <tr>
                    <td>Overweight</td>
                    <td>25 - 30</td>
                </tr>
                <tr>
                    <td>Obese Class I</td>
                    <td>30 - 35</td>
                </tr>
                <tr>
                    <td>Obese Class II</td>
                    <td>35 - 40</td>
                </tr>
                <tr>
                    <td>Obese Class III</td>
                    <td>&gt; 40</td>
                </tr>
                </tbody>
            </table>
            <h3 className="text-xl font-bold mt-4">BMI Chart for Children and Teens, Age 2-20</h3>
            <p>The Centers for Disease Control and Prevention (CDC) recommends BMI categorization for children and teens...</p>
            <h3 className="text-xl font-bold mt-4">Risks Associated with Being Overweight</h3>
            <ul className="list-disc list-inside">
                <li>High blood pressure</li>
                <li>Higher levels of LDL cholesterol...</li>
                <li>Type II diabetes</li>
                <li>Coronary heart disease</li>
                <li>Stroke</li>
                <li>Gallbladder disease</li>
                <li>Osteoarthritis</li>
                <li>Sleep apnea and breathing problems</li>
                <li>Certain cancers</li>
                <li>Low quality of life</li>
                <li>Mental illnesses</li>
                <li>Body pains and difficulty with certain physical functions</li>
                <li>Generally, an increased risk of mortality</li>
            </ul>
            <h3 className="text-xl font-bold mt-4">Risks Associated with Being Underweight</h3>
            <ul className="list-disc list-inside">
                <li>Malnutrition, vitamin deficiencies, anemia</li>
                <li>Osteoporosis</li>
                <li>A decrease in immune function</li>
                <li>Growth and development issues</li>
                <li>Possible reproductive issues for women</li>
                <li>Potential complications as a result of surgery</li>
                <li>Generally, an increased risk of mortality</li>
            </ul>
        </div>
    );
}

export default BmiInfo;