import React from 'react';

function BmiChart() {
    return (
        <div className="w-full bg-gray-800 text-gray-800 rounded-lg">
            <table className="w-full mt-4 mb-4 bg-pink-200 rounded-sm border border-black">
                <thead>
                <tr>
                    <th>Age (years)</th>
                    <th>Underweight</th>
                    <th>Normal weight</th>
                    <th>Overweight</th>
                    <th>Obese</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2-5</td>
                    <td>&lt; 14</td>
                    <td>14 - 17</td>
                    <td>17 - 19</td>
                    <td>&gt; 19</td>
                </tr>
                <tr>
                    <td>6-10</td>
                    <td>&lt; 14.5</td>
                    <td>14.5 - 18</td>
                    <td>18 - 21</td>
                    <td>&gt; 21</td>
                </tr>
                <tr>
                    <td>11-15</td>
                    <td>&lt; 16</td>
                    <td>16 - 21</td>
                    <td>21 - 24</td>
                    <td>&gt; 24</td>
                </tr>
                <tr>
                    <td>16-20</td>
                    <td>&lt; 18</td>
                    <td>18 - 24</td>
                    <td>24 - 27</td>
                    <td>&gt; 27</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

function BmiInfo() {
    return (
        <div className="bg-gray-800 text-gray-800 p-6 mt-10">
            <hr style={{borderColor: 'white', borderWidth: 2}} />
            <h2 className="text-2xl font-bold mb-4 mt-10 text-center text-yellow-500">BMI Introduction</h2>
            <p className="text-white">BMI is a measurement of a person's leanness or corpulence based on their height and weight...</p>
            <h3 className="text-xl text-white bg-black p-4 rounded font-bold mt-4">BMI Table for Adults</h3>
            <table className="w-full mt-4 mb-4 rounded bg-blue-200">
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
            <h3 className="text-xl text-white bg-black p-4 rounded font-bold mt-4">BMI Chart for Children and Teens, Age 2-20</h3>
            <BmiChart />
            <p className="text-white">The Centers for Disease Control and Prevention (CDC) recommends BMI categorization for children and teens...</p>
            <div className="flex justify-between ml-14">
                <div className="w-1/2">
                    <h3 className="text-xl text-white font-bold mt-4 ml-10">Risks Associated with Being Overweight</h3>
                    <ul className="list-disc list-inside text-white ml-10">
                        <li>High blood pressure</li>
                        <li>Higher levels of LDL cholesterol...</li>
                        <li>Type II diabetes</li>
                        <li>Coronary heart disease</li>
                        <li>Stroke</li>
                        <li>Gallbladder disease</li>
                        <li>Osteoarthritis</li>
                        {/*<li>Sleep apnea and breathing problems</li>*/}
                        {/*<li>Certain cancers</li>*/}
                        {/*<li>Low quality of life</li>*/}
                        {/*<li>Mental illnesses</li>*/}
                        {/*<li>Body pains and difficulty with certain physical functions</li>*/}
                        {/*<li>Generally, an increased risk of mortality</li>*/}
                    </ul>
                </div>
                <div className="w-1/2">
                    <h3 className="text-xl font-bold mt-4 text-white ml-10">Risks Associated with Being Underweight</h3>
                    <ul className="list-disc list-inside text-white ml-10">
                        <li>Malnutrition, vitamin deficiencies, anemia</li>
                        <li>Osteoporosis</li>
                        <li>A decrease in immune function</li>
                        <li>Growth and development issues</li>
                        <li>Possible reproductive issues for women</li>
                        <li>Potential complications as a result of surgery</li>
                        <li>Generally, an increased risk of mortality</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BmiInfo;