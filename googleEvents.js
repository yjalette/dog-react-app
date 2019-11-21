const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const express = require('express');
const router = express.Router();

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


function getEvents() {
  return new Promise((resolve, reject) => {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), function(auth){
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.list({
          calendarId: 'primary',
          timeMin: (new Date()).toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
        }, (err, res) => {
          if (err) {
            console.log('The API returned an error: ' + err);
            reject(err);
            return;
          }
          const events = res.data.items;
          resolve(events);
        });
      });
    });
  });
}


function createEvent(event) {
  const googleEvent = constractGoogleEvent(event);

  return new Promise((resolve, reject) => {
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), function(auth){
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.insert({
          auth: auth,
          calendarId: 'primary',
          resource: googleEvent,
        }, function(err, event) {
          if (err) {
            reject(err);
            return;
          }
            resolve(event);
        });
      });
    });
  });
}


function deleteEvent(eventId) {
  return new Promise((resolve, reject) => {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), function(auth){
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.delete({
          auth: auth,
          calendarId: 'primary',
          eventId
        }, function(err, event) {
          if (err) {
            reject(err);
            return;
          }
            resolve(event.htmlLink);
        });
      });
    });
  });
}

function updateEvent(event, eventId) {
  const googleEvent = constractGoogleEvent(event);
  console.log(googleEvent)
  return new Promise((resolve, reject) => {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), function(auth){
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.update({
          auth: auth,
          calendarId: 'primary',
          eventId: eventId,
          resource: googleEvent
        }, function(err, event) {
          if (err) {
            reject(err);
            return;
          }
            resolve(event.htmlLink);
        });
      });
    });
  });
}

function constractGoogleEvent(event){
  const { appt_date, name, appt_time, size, breed} = event;
  const startDate = new Date(appt_date)
  startDate.setHours(appt_time);
  const endDate = new Date(appt_date);
  endDate.setHours(+appt_time + 3);
  return {
    'summary': name,
    'start': {
      'dateTime': startDate.toISOString(),
      'timeZone': 'America/New_York'
    },
    'end': {
      'dateTime': endDate.toISOString(),
      'timeZone': 'America/New_York'
    },
    'description': `size: ${size}, breed: ${breed}`,
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 13 * 60 },
      ],
    },
  }
}

module.exports = { getEvents, createEvent, deleteEvent, updateEvent};