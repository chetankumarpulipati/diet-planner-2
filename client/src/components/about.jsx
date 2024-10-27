import React from 'react';

function About() {
    return (
        <div className="bg-gradient-to-b from-gray-900 to-blue-100 p-8 md:p-16 lg:p-24 text-white">
            <div className="max-w-4xl mx-auto space-y-12">

            <section className="border p-10 text-white border-white text-center rounded">
                    <h2 className="text-4xl font-bold text-white">About Us</h2>
                    <p className="mt-4 text-lg text-white">
                        Welcome to the Fitness App! Our mission is to help you track your fitness goals and monitor your
                        progress with ease.
                    </p>
                    <p className="mt-2 text-lg text-white">
                        Our app provides a variety of features to assist you in your fitness journey, including workout
                        tracking, diet planning, and progress monitoring.
                    </p>
                    <p className="mt-2 text-lg text-white">
                        We are dedicated to providing you with the best tools and resources to achieve your fitness
                        goals. Thank you for choosing our app!
                    </p>
                </section>

                <section className="team-section text-center">
                    <h3 className="text-3xl font-semibold text-white">Meet Our Team</h3>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="team-member flex flex-col items-center">
                            <img
                                className="w-32 h-32 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
                                src="../images/people.jpg"
                                alt="Chetan Kumar"/>
                            <h4 className="mt-4 text-xl font-semibold text-blue-800">Chetan Kumar Pulipati</h4>
                            <p className="text-gray-600">CEO & Founder</p>
                        </div>
                        <div className="team-member flex flex-col items-center">
                            <img
                                className="w-32 h-32 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
                                src="../images/people.jpg"
                                alt="Danunjaya Reddy"/>
                            <h4 className="mt-4 text-xl font-semibold text-blue-800">Danunjaya Reddy</h4>
                            <p className="text-gray-600">Investor</p>
                        </div>
                        <div className="team-member flex flex-col items-center">
                            <img
                                className="w-32 h-32 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
                                src="../images/people.jpg"
                                alt="durga Suresh"/>
                            <h4 className="mt-4 text-xl font-semibold text-blue-800">Durga Suresh</h4>
                            <p className="text-gray-600">Investor</p>
                        </div>
                    </div>
                </section>

                <section className="testimonials-section text-center bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h3 className="text-3xl font-semibold text-blue-400">What Our Users Say</h3>
                    <div className="mt-6 space-y-6">
                        <blockquote className="text-white italic">
                            <p className="text-white font-arial">"This app has transformed my fitness journey!"</p>
                            <footer className="mt-2 text-red-500">- Umesh Potha</footer>
                        </blockquote>
                        <blockquote className="text-white italic">
                            <p className="text-white">"I love the diet planning feature. It's so easy to use!"</p>
                            <footer className="mt-2 text-red-500">- Jaya Krishna</footer>
                        </blockquote>
                    </div>
                </section>

                <section className="contact-section text-center bg-gray-800 text-white p-8 rounded-lg">
                    <h3 className="text-3xl font-semibold">Contact Us</h3>
                    <form className="mt-6 space-y-4 max-w-lg mx-auto">
                        <label className="block text-left">
                            <span>Name:</span>
                            <input type="text" name="name"
                                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                        </label>
                        <label className="block text-left">
                            <span>Email:</span>
                            <input type="email" name="email"
                                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                        </label>
                        <label className="block text-left">
                            <span>Message:</span>
                            <textarea name="message"
                                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                      rows="4"></textarea>
                        </label>
                        <button type="submit"
                                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
                            Send
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default About;
