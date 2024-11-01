import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    navigate("/inputs");
  };

  const handleSubmit = () => {
    const email = document.getElementById("email-address").value;
    console.log(email);
    fetch('http://localhost:3000/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
        .then((response) => response.text())
        .then((data) => {
          console.log('Success:', data);
          setAlertMessage("Subscribed successfully");
          setShowAlert(true);
          document.getElementById("email-address").value = "";
        })
        .catch((error) => {
          console.error('Error:', error);
          setAlertMessage("An error occurred. Please try again later");
          setShowAlert(true);
        });
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowAlert(false);
    };

    if (showAlert) {
      document.body.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [showAlert]);

  return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Welcome to Diet Schedule System</h1>
          <br></br>
          <p style={styles.subtitle}>
            Your personalized diet planning and tracking system
          </p>
          <button style={styles.button} onClick={handleButtonClick}>
            Get Started
          </button>
        </header>

        <section style={styles.imageSection}>
          <img
              src="https://www.olivaclinic.com/wp-content/uploads/2024/05/1000-Calorie-Diet-Plan.jpg"
              alt="Healthy Food"
              style={styles.image}
          />
        </section>

        <section style={styles.mainContent}>
          <h2 style={styles.heading}>Why Choose Us?</h2>
          <br></br>
          <p style={styles.paragraph}>
            We help you manage your diet schedule effectively by providing
            customized meal plans and diet recommendations that align with your
            health goals. Track your daily nutrition intake and improve your
            lifestyle today!
          </p>
          <br></br>
          <h2 style={styles.heading}>How It Works</h2>
          <br></br>
          <p style={styles.paragraph}>
            Our system analyzes your health data and lifestyle preferences to
            create the perfect diet plan tailored for you. Start today and take
            control of your health journey!
          </p>
        </section>

        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-3">
            {showAlert && (
                <div
                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed bottom-4 right-4"
                    role="alert"
                    onClick={(e) => e.stopPropagation()}
                >
                  <span className="font-medium"></span> {alertMessage}
                </div>
            )}
            <div className="relative overflow-hidden bg-gray-900 py-16 sm:py-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                  <div className="max-w-xl lg:max-w-lg">
                    <h2 className="text-4xl font-semibold tracking-tight text-white">Subscribe to our newsletter</h2>
                    <p className="mt-4 text-lg text-gray-300">Join our community for expert advice, health tips,
                      and exclusive updates—straight to your inbox.</p>
                    <label htmlFor="email-address" className="sr-only mb-2">Email address</label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required
                           className="mb-3 rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 w-full"
                           placeholder="Enter your email"/>
                    <button type="submit"
                            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            onClick={handleSubmit}
                    >Subscribe
                    </button>
                  </div>
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                    <div className="flex flex-col items-start align-items-center">
                      <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" aria-hidden="true" data-slot="icon">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                        </svg>
                      </div>
                      <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
                      <dd className="mt-1 leading-7 text-gray-400"> Mindful Monday Start your week with practical,
                        science-backed mindfulness techniques to keep you grounded and focused.
                      </dd>
                    </div>
                    <div className="flex flex-col items-start align-items-center">
                      <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" aria-hidden="true" data-slot="icon">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"/>
                        </svg>
                      </div>
                      <dt className="mt-4 font-semibold text-white">No spam</dt>
                      <dd className="mt-2 leading-7 text-gray-400">We promise: No spam. Only valuable insights and
                        updates straight to your inbox.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="border-t border-white mb-4"></div>

            <div className="flex flex-col sm:flex-row justify-between mb-4">
              <div className="flex flex-col space-y-2 mb-4 sm:mb-0">
                <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a>
                <a href="#" className="text-gray-400 hover:text-white">About</a>
              </div>
              <div className="flex flex-col space-y-2 mb-4 sm:mb-0">
                <a href="#" className="text-gray-400 hover:text-white">Careers</a>
                <a href="#" className="text-gray-400 hover:text-white">Advertise with us</a>
                <a href="#" className="text-gray-400 hover:text-white">Healthline</a>
              </div>
              <div className="flex flex-col space-y-2 text-center sm:text-right">
                <span>Contact</span>
                <a href="mailto:chetankumarpulipati4@gmail.com"
                   className="text-gray-400 hover:text-white">chetankumarpulipati4@gmail.com</a>
                <span>Phone: +91 9963813470</span>
              </div>
            </div>
            <div className="border-t border-white"></div>
            <div className="text-center mt-8">
              <p className="text-gray-500">&copy; 2024 Diet Schedule System. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
);
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
        textAlign
  :
    "center",
        color
  :
    "#333",
        margin
  :
    "0",
        padding
  :
    "0",
  }
,
  header: {
    backgroundColor: "#111827",
        color
  :
    "white",
        padding
  :
    "50px 20px",
  }
,
  title: {
    fontSize: "2.5em",
        margin
  :
    "0",
        color
  :
    "white",
        fontFamily
  :
    'sans'
  }
,
  subtitle: {
    fontFamily: 'Lucida',
        color
  :
    'white',
        fontSize
  :
    "1.2em",
        margin
  :
    "10px 0 30px",
  }
,
  button: {
    padding: "15px 30px",
        fontSize
  :
    "1.2em",
        color
  :
    "#4CAF50",
        backgroundColor
  :
    "white",
        border
  :
    "2px solid #4CAF50",
        borderRadius
  :
    "5px",
        cursor
  :
    "pointer",
        transition
  :
    "background-color 0.3s",
  }
,
  imageSection: {
    margin: "30px 0",
  }
,
  image: {
    maxWidth: "100%",
        height
  :
    "auto",
  }
,
  mainContent: {
    padding: "40px 20px",
        backgroundColor
  :
    '#fff',
  }
,
  heading: {
    fontSize: "2em",
        marginBottom
  :
    "10px",
        fontFamily
  :
    'sans',
  }
,
  paragraph: {
    fontSize: "1.2em",
        lineHeight
  :
    "1.6",
        marginBottom
  :
    "30px",
  }
,
  footer: {
    backgroundColor: "#333",
    color: "white",
    padding: "20px",
    marginTop: "30px",
  },
  footerText: {
    margin: "0",
  },
};

export default Home;