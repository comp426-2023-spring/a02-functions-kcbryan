#!/usr/bin/env node

const min = import('minimist');
const args = process.argv.slice(2)

//console.log(args)

for (let i = 0; i < args.length; i++) {
    if(args[i]=='-h') {
        getHelp()
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
}
  

// if(h==true) {
//     console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE")
//     console.log("\t-h            Show this help message and exit.")    
//     console.log("\t-n, -s        Latitude: N positive; S negative.")    
//     console.log("\t-e, -w        Longitude: E positive; W negative.")    
//     console.log("\t-z            Time zone: uses tz.guess() from moment-timezone by default.")    
//     console.log("\t-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")    
//     console.log("\t-j            Echo pretty JSON from open-meteo API and exit.")    
// }