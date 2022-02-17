"use strict";
//import modules
const fs = require("fs").promises;
const util = require("util");
const path = require("path");
const dotenv = require("dotenv");
const { resolve } = require("path");
const { stat } = require("fs");
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
          type: stat.isDirectory() ? "Folder" : `${path.extname(filepath)}`.slice(1)
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

  // const filesInDirectory = await fs.readdir(directoryPath);
  // const files = await Promise.all(
  //   filesInDirectory.map(async (file) => {
  //     const filePath = path.join(directoryPath, file);
  //     const stats = await fs.stat(filePath);

  //     if (stats.isDirectory()) {
  //       return getFileStats(filePath);
  //     } else {
  //       return filePath;
  //     }
  //   })
  // );
  // return files.filter((file) => file.length); // return with empty arrays removed
};

module.exports = { generateTree, getFiles, getFileStats };
