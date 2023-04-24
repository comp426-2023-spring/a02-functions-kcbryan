#!/usr/bin/env node

//may have to remove "is_day" from apeometeor input
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&timezone=America%2FNew_York

//import statements to run program
import moment from "moment"
import moment_timezone from "moment-timezone"
import minimist from "minimist";

//remove default arg content, and get timezone
const args = process.argv.slice(2)
let timezone = moment.tz.guess()
console.log(timezone)

//initialize default flag input content values
let latitude = null
let longitude = null
let days = null
let output = null
// latitude = latitude.toFixed(2);
// console.log("rounded latitude: " + latitude);
// if(latitude>0) {
//     latitude = 0 -latitude
// }
// console.log("sign-verified latitude: " + latitude)

console.log(args);
//assign values and functionality to flags
for (let i = 0; i < args.length; i++) {
    if(args[i]=='-h') {
        getHelp()
    }
    if(args[i]=='-n') {
        //console.log("unmodified args value: " + args[i]);
        let lat = Number(args[i + 1]);
        //console.log(typeof lat);
        //console.log(lat);
        lat = lat.toFixed(2);
        if(lat < 0){
            lat = 0 - lat;
        }
        latitude = lat;
        //console.log("latitude: " + latitude)
    }
    if(args[i]=='-s') {
        let lat = Number(args[i + 1]);
        lat = lat.toFixed(2);
        if(lat > 0){
            lat = 0 - lat;
        }
        latitude = lat;
        //console.log("latitude: " + latitude);
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
        timezone = args[i];
    }
    if(args[i]=='-j') {
        output=true
    }
  }

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
  
//begin data collection and output process
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&timezone='+ timezone);
// Get the data from the request
const data = await response.json();

if(output==true) {
    //process.stdout.write(data.stringify());
    //this may get angry because it isnt using stdout, but we shall seeee
    console.log(data);
}

areWeGaloshing(data, days);
