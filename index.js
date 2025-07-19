const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
app.use(urlencoded({ extended: false }));

// Store responses
let callLogs = [];

app.post('/voice', (req, res) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    input: 'speech',
    action: '/handle-name',
    method: 'POST'
  });
  gather.say('Hello! What is your name?');

  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/handle-name', (req, res) => {
  const userName = req.body.SpeechResult || 'Unknown';

  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    input: 'speech',
    action: `/handle-age?name=${encodeURIComponent(userName)}`,
    method: 'POST'
  });
  gather.say(`Thanks, ${userName}. How old are you?`);

  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/handle-age', (req, res) => {
  const userAge = req.body.SpeechResult || 'Unknown';
  const userName = req.query.name;

  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    input: 'speech',
    action: `/handle-purpose?name=${encodeURIComponent(userName)}&age=${encodeURIComponent(userAge)}`,
    method: 'POST'
  });
  gather.say(`Thanks. What are you calling about?`);

  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/handle-purpose', (req, res) => {
  const purpose = req.body.SpeechResult || 'Unknown';
  const userName = req.query.name;
  const userAge = req.query.age;

  // Store in call logs
  callLogs.push({ name: userName, age: userAge, purpose });

  const twiml = new VoiceResponse();
  twiml.say(`Thanks ${userName}, we are routing your call to an agent now.`);
  twiml.pause({ length: 2 });
  twiml.say(`No agents are currently available. Goodbye!`);
  twiml.hangup();

  res.type('text/xml');
  res.send(twiml.toString());
});

app.get('/logs', (req, res) => {
  res.json(callLogs);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
