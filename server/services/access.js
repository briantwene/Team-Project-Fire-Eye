"use strict";
//import modules
const fs = require("fs").promises;
const util = require("util");
const path = require("path");
const dotenv = require("dotenv");
const { resolve } = require("path");
const { stat } = require("fs");
const mime = require("mime-types");
const bytes = require("bytes");
const { types } = require("../utils/mimeType");
const si = require("systeminformation");
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
          type: stat.isDirectory() ? "Folder" : `${path.extname(filepath)}`.slice(1),
        };
      }),
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

  //for each file in the list of files
  const fileData = arrayOfFileNameStrings.map(async (fileNameString) => {
    //get the full path and check of its a folder
    const fullPath = `${directoryString}/${fileNameString}`;
    const fileData = await fs.stat(fullPath);
    let file = {};
    file.filePath = fullPath;
    file.isFolderBoolean = fileData.isDirectory();
    file.name = fullPath.split("/").slice(-1).join(" ");

    //if the file is a folder
    if (file.isFolderBoolean) {
      //call the folder again to get its contents using recursion
      file.files = await generateTree(file.filePath);
    }
    //End recursive condition
    return file;
  });
  //return a list of promises waiting to be resolved
  return Promise.all(fileData);
};

//get file
const getFileStats = async (dir, filelist = []) => {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = await fs.stat(filepath);

    if (stat.isDirectory()) {
      filelist = await getFileStats(filepath, filelist);
    } else {
      filelist.push(file);
    }
  }

  return filelist;
};

const DiskStats = async (basePath) => {
  const fileTypes = {
    audio: [],
    video: [],
    image: [],
    document: [],
    other: [],
  };

  //read the directory
  const files = await getFileStats(basePath);

  for (const file of files) {
    fileTypes[types[mime.lookup(file)] || "other"].push(file);
  }

  console.log(mime.lookup(".docx"));
  si.fsSize().then(console.log);

  return fileTypes;
};

module.exports = { generateTree, getFiles, DiskStats };
