# ai-call-center_0

For this assignment, I built a working prototype of an AI-powered call center using Twilio, Node.js (Express), and a dashboard UI via V0.dev. When a user calls the Twilio number, an automated voice assistant (powered by Twilio’s Voice API and Gather) asks the caller for their name, age, and purpose of the call using speech input. These responses are processed and (in a real scenario) would be stored. For demonstration purposes, I’ve used simulated/dummy data to populate a set of call logs

The second part of the prototype is the dashboard, built with modern UI components. 
It shows:
A table of recent call logs (caller name, age, Time, duration etc.)
A count of available, busy, and offline agents
Visual status badges and a refresh button to simulate real-time interaction

What’s Simulated: 
No actual calls are routed to agents
Call logs are pre-defined (not saved live)
Agent statuses are mock values

What’s Real: 
Working Twilio voice flow using gather and XML
Voice assistant that collects user input via speech


