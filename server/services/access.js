"use strict";
//import modules
const fs = require("fs").promises;
const util = require("util");
const path = require("path");
const dotenv = require("dotenv");
const { resolve } = require("path");
dotenv.config();
//test link for file system
//const address = process.env.addr;

//convert read directory method into one that will return a promise
const isFolder = (filepath) => {
  const isFolder = path.extname(filepath);
  return isFolder === "" ? "Folder" : isFolder;
};
//this code will run asynchronously
const fileInfo = async (filepath) => {
  return new Promise(async (resolve) => {
    resolve({
      name: path.basename(filepath),
      path: filepath,
      details: await fs.stat(filepath).then((stat) => {
        console.log();
        return {
          time: stat.mtime,
          size: stat.size,
        };
      }),
      type: isFolder(filepath),
    });
  });
};

const getFiles = async (address) => {
  //create an array to store all the promises
  const promiseArray = [];

  //getting all the images from the folder
  const absoluteLinks = await fs
    .readdir(address)
    .then((results) => {
      console.log(results);

      const merged = results.map((relative) => {
        return `${address}/${relative}`;
      });
      return merged;
    })
    .catch((e) => {
      console.log(`there was an error ${e}`);
    });

  console.log(absoluteLinks);

  //fill the array with promises that will return info on that image
  for (const link of absoluteLinks) {
    promiseArray.push(fileInfo(link));
  }

  //wait for all the images to have their modified time and name added
  const completed = Promise.all(promiseArray);

  //return the array of images to the front-end
  return completed;
};

//service function for getting the images out of file that they are in
//the result is then returned to the controller that called it

const generateTree = async (directoryString) => {
  //read the directory
  const arrayOfFileNameStrings = await fs.readdir(directoryString);

  const fileData = arrayOfFileNameStrings.map(async (fileNameString) => {
    const fullPath = `${directoryString}/${fileNameString}`;
    const fileData = await fs.stat(fullPath);
    let file = {};
    file.filePath = fullPath;
    file.isFolderBoolean = fileData.isDirectory();
    file.name = fullPath.split("/").slice(-1).join(" ");
    /* Here is where we'll do our recursive call */
    //if the file is a folder
    if (file.isFolderBoolean) {
      //call the folder again to get its contents
      file.files = await generateTree(file.filePath);
    }
    /* End recursive condition */
    return file;
  });
  return Promise.all(fileData);
};

module.exports = { generateTree, getFiles };
