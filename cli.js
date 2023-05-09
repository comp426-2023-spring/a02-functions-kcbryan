#!/usr/bin/env node


//import statements to run program
import moment from "moment"
import moment_timezone from "moment-timezone"
import minimist from "minimist";

//remove default arg content, and get timezone
const args = process.argv.slice(2)
let timezone = moment.tz.guess()

//initialize default flag input content values
let latitude = 100
let longitude = 100
let days = null
let output = null

//assign values and functionality to flags
for (let i = 0; i < args.length; i++) {
    if(args[i]=='-h') {
        getHelp()
    }
    if(args[i]=='-n') {
        let lat = Number(args[i + 1]);
        lat = lat.toFixed(2);
        if(lat < 0){
            lat = 0 - lat;
        }
        latitude = lat;
    }
    if(args[i]=='-s') {
        let lat = Number(args[i + 1]);
        lat = lat.toFixed(2);
        if(lat > 0){
            lat = 0 - lat;
        }
        latitude = lat;
    }
    if(args[i]=='-e') {
        let longi = Number(args[i + 1]);
        longi = longi.toFixed(2);
        if(longi < 0){
            longi = 0 - longi;
        }
        longitude = longi;
    }
    if(args[i]=='-w') {
        let longi = Number(args[i + 1]);
        longi = longi.toFixed(2);
        if(longi > 0){
            longi = 0 - longi;
        }
        longitude = longi;
    }
    if(args[i]=='-d') {
        days = Number(args[i+1]);

    }
    if(args[i]=='-z') {
        timezone = args[i + 1];
    }
    if(args[i]=='-j') {
        output=true
    }
    if(i==(args.length-1) && days==null) {
        days = 1;
    }
  }

//function called on -h to print out help message
function getHelp() {
        console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE")
        console.log("\t-h            Show this help message and exit.")    
        console.log("\t-n, -s        Latitude: N positive; S negative.")    
        console.log("\t-e, -w        Longitude: E positive; W negative.")    
        console.log("\t-z            Time zone: uses tz.guess() from moment-timezone by default.")    
        console.log("\t-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")    
        console.log("\t-j            Echo pretty JSON from open-meteo API and exit.")
        process.exit(0)   
}

//begin data collection and output process
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&timezone='+ timezone);
// Get the data from the request
const data = await response.json();

function areWeGaloshing(data, days) {
    if(data.daily.precipitation_hours[days]>0) {
        console.log("You might need your galoshes " + dayString(days))
    }
    else {
        console.log("You will not need your galoshes " + dayString(days))
    }
}

function dayString(days) {
    if(days==null || days == 1) {
        return "tomorrow."
    }
    else if(days == 0) {
        return "today."
    }
    else {
        return ("in " + days + " days.")
    }
}
  
if(output==true) {
    console.log(data);
    process.exit(0);
}

areWeGaloshing(data, days);




