//import modules
const fs = require("fs")
const util = require("util")
const dotenv = require("dotenv");
dotenv.config();
//test link for file system
const address = process.env.addr

//convert read directory method into one that will return a promise
const readdirPromise = util.promisify(fs.readdir)


//service function for getting the images out of file that they are in
//the result is then returned to the controller that called it
exports.collectImages = async() => {
    const absoluteLinks = await readdirPromise(address).then((results) => {
       const merged = results.map((relative) => {
            return `${address}/${relative}`
        } )
        return merged;
    } )
    console.log(absoluteLinks);
    return absoluteLinks
}