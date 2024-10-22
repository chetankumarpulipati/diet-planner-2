// import React from 'react';
// import '../styles/about.css';
//
// function About() {
//     return (
//         <div className="about-container">
//             <h2>About Us</h2>
//             <p>Welcome to the Fitness App! Our mission is to help you track your fitness goals and monitor your progress with ease.</p>
//             <p>Our app provides a variety of features to assist you in your fitness journey, including workout tracking, diet planning, and progress monitoring.</p>
//             <p>We are dedicated to providing you with the best tools and resources to achieve your fitness goals. Thank you for choosing our app!</p>
//         </div>
//     );
// }
//
// export default About;

import React from 'react';
import '../styles/cult.css';

function About() {
    return (
        <div>
            <div className="h-24 w-full flex justify-between items-center">
                <img className="relative top-5 left-2 w-16 h-16" src="../images/cult.png" alt="Cult logo" />
                <div className="text-yellowgreen text-lg uppercase font-medium absolute top-10 left-12">
                    <a href="#" className="text-white no-underline">FITNESS</a>
                </div>
                <div className="text-yellowgreen text-lg uppercase font-medium absolute top-10 left-20">
                    <a href="#" className="text-white no-underline">CARE</a>
                </div>
                <div className="text-yellowgreen text-lg uppercase font-medium absolute top-12 right-60">
                    <a href="#" className="text-white no-underline">MIND</a>
                </div>
                <div className="text-yellowgreen text-lg uppercase font-medium absolute top-12 right-40">
                    <a href="#" className="text-white no-underline">STORE</a>
                </div>
            </div>
            <video
                className="w-1/2 inline-block mt-2 ml-8"
                playsInline
                loop
                autoPlay
                muted
                src="https://cdn-media.cure.fit/video/cflive_pack_page_mock_v2_revised.mp4"
                tabIndex="-1"
                height="500px"
            ></video>
            <img
                className=" h-50 object-cover absolute right-0 bottom-0 rounded-tl-lg"
                src="https://buyflow-web-assets.noom.com/bfc2/media/background-intl.0faeb2ee270b877644931aab53b05fc5.webp"
                alt="Background"
            />
            <img src="../images/Calorie.jpg" className="h-128 mt-52 ml-14" alt="Calorie chart" />
            <h1 className="text-center text-4xl font-bold mt-12">Use it on any device.</h1>
            <h4 className="text-center text-lg mt-4">Use the Diet Planner wherever you are.</h4>
            <img
                src="../images/Calorie.jpg"
                className="w-full mt-4"
                alt="Diet Planner app screenshot"
            />
            <h1 className="text-center text-4xl font-bold mt-12">Nutritional regimens</h1>
            <h4 className="text-center text-lg mt-4">
                In order to make work with the program easier and faster, we have prepared five exclusion-based nutrition schemes.
            </h4>
            <img src="../images/nutrients.png" className="ml-40 mt-4" alt="Nutrient breakdown" />
        </div>
    );
}

export default About;

