"use strict"
//import modules
const fs = require("fs").promises
const util = require("util")
const path = require("path")
const dotenv = require("dotenv");
dotenv.config();
//test link for file system
const address = process.env.addr

//convert read directory method into one that will return a promise
//this code will run asynchronously
const imageDates = (filepath) =>{
    return new Promise(async (resolve) => {
        resolve({
            name: path.basename(filepath),
            path: filepath,
            date_modified: await fs.stat(filepath).then((stat)=>{
                return stat.mtime;
            })
        })
    })
}


//service function for getting the images out of file that they are in
//the result is then returned to the controller that called it
exports.collectImages = async() => {

    //create an array to store all the promises
    const promiseArray = []

    //getting all the images from the folder
    const absoluteLinks = await fs.readdir(address).then((results) => {
       const merged = results.map((relative) => {
            return `${address}/${relative}`
        } )
        return merged;
    } )

    //fill the array with promises that will return info on that image
    for (link of absoluteLinks){
        promiseArray.push(imageDates(link))
    }

    //wait for all the images to have their modified time and name added
    const completed = Promise.all(promiseArray)
   
    //return the array of images to the front-end
    return completed;
}