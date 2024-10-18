import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/inputs'); 
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Welcome to Diet Schedule System</h1>
                <p style={styles.subtitle}>Your personalized diet planning and tracking system</p>
                <button style={styles.button} onClick={handleButtonClick}>Get Started</button>
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
                <p style={styles.paragraph}>
                    We help you manage your diet schedule effectively by providing customized meal plans and diet recommendations 
                    that align with your health goals. Track your daily nutrition intake and improve your lifestyle today!
                </p>
                <h2 style={styles.heading}>How It Works</h2>
                <p style={styles.paragraph}>
                    Our system analyzes your health data and lifestyle preferences to create the perfect diet plan tailored for you. 
                    Start today and take control of your health journey!
                </p>
            </section>

            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 Diet Schedule System. All rights reserved.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "'Arial', sans-serif",
        textAlign: 'center',
        color: '#333',
        margin: '0',
        padding: '0'
    },
    header: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '50px 20px'
    },
    title: {
        fontSize: '2.5em',
        margin: '0'
    },
    subtitle: {
        fontSize: '1.5em',
        margin: '10px 0 30px'
    },
    button: {
        padding: '15px 30px',
        fontSize: '1.2em',
        color: '#4CAF50',
        backgroundColor: 'white',
        border: '2px solid #4CAF50',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },
    imageSection: {
        margin: '30px 0'
    },
    image: {
        maxWidth: '100%',
        height: 'auto'
    },
    mainContent: {
        padding: '40px 20px'
    },
    heading: {
        fontSize: '2em',
        marginBottom: '10px'
    },
    paragraph: {
        fontSize: '1.2em',
        lineHeight: '1.6',
        marginBottom: '30px'
    },
    footer: {
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        marginTop: '30px'
    },
    footerText: {
        margin: '0'
    }
};

export default Home;
