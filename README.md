# 🌦️IoT Weather Monitoring System with Custom Web Dashboard
A fully functional IoT-based Weather Monitoring System built using ESP32, DHT11, and MQ-135, integrated with a custom web dashboard for real-time environmental monitoring.

This system continuously collects temperature, humidity, and air quality (AQI) data and displays it on a modern, responsive web interface hosted on Netlify, making it accessible from anywhere in the world.

🚀 Project Overview
This project combines embedded systems, IoT networking, and web development to create a smart environmental monitoring solution.

The ESP32 reads sensor data and sends it over Wi-Fi to a web server. The web application (built with HTML, CSS, and JavaScript) fetches this data and visualizes it in real time, along with health-based air quality suggestions.

🧰 Hardware Used
Component	Purpose
ESP32	Main microcontroller with Wi-Fi
DHT11	Measures temperature and humidity
MQ-135	Measures air quality (CO₂, smoke, pollution)
Jumper Wires	Circuit connections
Breadboard	Prototyping

🌐 Software & Technologies
ESP32 Arduino Framework

HTML, CSS, JavaScript

Wi-Fi (HTTP / WebSocket)

Netlify (Hosting)

VS Code

# ✨ Features
🔴 Real-time environmental data
Displays live temperature, humidity, and air quality index (AQI)

🌐 Custom Web Dashboard
Clean and modern UI built from scratch using HTML, CSS & JS

📶 Wireless IoT communication
ESP32 sends sensor data over Wi-Fi

💡 Smart AQI-based suggestions
Provides health & environment suggestions based on pollution level

📱 Mobile-responsive design
Works perfectly on phones, tablets & desktops

🌍 Remote Access
Dashboard hosted on Netlify, accessible from anywhere

🖥️ Web Dashboard
The web dashboard provides:

Live sensor readings

Visual status of air quality

Color-coded AQI levels

Smart health suggestions

Smooth and responsive UI

Example use cases:

Indoor air quality monitoring

Weather & humidity tracking

Pollution awareness system

# 🔁 Working Flow
Sensors collect data (Temperature, Humidity, Air Quality)

ESP32 processes and sends data via Wi-Fi

Web app fetches data from ESP32

Data is displayed on the dashboard in real time

AQI is analyzed and smart suggestions are shown

# 📊 AQI Interpretation
AQI Range	Air Quality	Suggestion
0–50	Good	Safe for all activities
51–100	Moderate	Acceptable
101–200	Unhealthy	Limit outdoor exposure
201+	Hazardous	Wear mask & avoid outdoors

# 🎯 Applications
Smart homes

Smart classrooms

Environmental monitoring

College IoT projects

Air pollution tracking

📌 Why This Project Is Special
✔ Combines IoT + Web Development
✔ Uses real sensors & real data
✔ Fully cloud hosted
✔ Clean and professional UI
✔ Ready for hackathons, resumes, and exhibitions

🔮 Future Improvements
Add live graphs (Chart.js)

Store historical data (Firebase / Supabase)

Add mobile app

Add rain & pressure sensors

Email alerts for high AQI
